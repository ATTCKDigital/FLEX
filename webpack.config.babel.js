import CopyPlugin from 'copy-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
// import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import SpritePlugin from 'extract-svg-sprite-webpack-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import { sync } from 'glob';
import path from 'path';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const smp = new SpeedMeasurePlugin({
	disable: !process.env.MEASURE
});

const isDevEnv = 'production' !== process.env.NODE_ENV;
console.log('webpack.config.babel.js › process.env.NODE_ENV: ' + process.env.NODE_ENV);

const devPlugins = [];

const productionPlugins = [
	// Minify Images
	// Include after plugins that add images, eg. copy-webpack-plugin
	// TODO: this should likely be configured more highly
	new ImageminPlugin({
		test: /\.(jpe?g|png|gif|svg)$/i
	}),
]

const plugins = isDevEnv ? devPlugins : productionPlugins;

const isDevOptimized = isDevEnv ? { minimize: false } : {
		minimizer: [
			new TerserPlugin(),
			new CssMinimizerPlugin()
			// new OptimizeCSSAssetsPlugin({
			// 	cssProcessorPluginOptions: {
			// 		preset: ['default', {
			// 			discardComments: {
			// 				removeAll: true
			// 			}
			// 		}],
			// 	},
			// }),
		],
	};

/*
JS:
- Load boilerplate scripts..
- Load child theme scripts...
- Load flexlayout plugin scripts...
- How the hell are we handling component scripts?
- ES5 transpile from ESNext
- Lint
- (PROD) Uglify / minify

SCSS:
- Load from boilerplate
- Load from child theme...
- Load from flexlayout plugin??
- Autoprefixer
- Compile to CSS
- PostCSS support??
- (PROD) Minify

STATIC ASSETS:
- copy assets folder to dist (all individual folders)
- compress images
*/

module.exports = smp.wrap({
	entry: {
		jquery: 'jquery',
		'main.js': path.resolve(__dirname, './js/app.js'),
		'admin.js': path.resolve(__dirname, './js/admin.js'),
		'style': path.resolve(__dirname, './scss/style.scss'),
		'print': path.resolve(__dirname, './scss/print.scss'),
		'admin': path.resolve(__dirname, './scss/admin.scss'),
		'admin-colors': path.resolve(__dirname, './scss/admin-color-scheme.scss'),
		'wysiwyg': path.resolve(__dirname, './scss/wysiwyg.scss'),
	},

	// More options here: https://webpack.js.org/configuration/devtool/
	// - (none) = fastest
	// devtool: isDevEnv ? 'cheap-module-source-map' : false,
	// devtool: isDevEnv ? 'eval' : false,
	devtool: isDevEnv ? 'source-map' : false,

	mode: process.env.NODE_ENV,
	target: 'web',
	watch: isDevEnv,

	// https://webpack.js.org/configuration/stats/
	stats: 'normal',
	// stats: 'detailed',
	// stats: 'verbose',
	// stats: 'summary',

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name]',
	},

	resolve: {
		alias: {
			'FLEX': path.resolve(__dirname, '../FLEX'),
		},
		modules: [
		path.resolve(__dirname, './js'),
			'node_modules'
		],
		// NOTE: (DP) React profiling is always disabled so was trying to find a solution to enable it.
		// https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977
		// 'react-dom$': 'react-dom/profiling',
		// 'scheduler/tracing': 'scheduler/tracing-profiling',
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						// TODO: these should not be necessary
						// should be included via .bablerc
						// but for some crazy reason admin.js won't compile without these
						presets: [
							'@wordpress/default',
							'@babel/env',
							'@babel/react',
						],
					}
				},
			},
			{
				test: /\.(woff2?|ttf|otf|eot|svg|png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},
					},
				],
			},
			{
				test: /\.svg$/,
				loader: SpritePlugin.loader
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'style-loader',
					{
						loader: 'style-loader'
					},
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: isDevEnv,
							url: false
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: path.resolve(__dirname, './postcss.config.js')
							},
							sourceMap: isDevEnv
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDevEnv
						}
					},
				],
			}
		]
	},

	optimization: isDevOptimized,

	plugins: [
		...plugins,

		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),

		new WebpackNotifierPlugin(),

		// new SpritePlugin(),

		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].[hash].css',
		}),

		// Copy contents of ./assets -> ./dist
		new CopyPlugin([
			{
				context: path.resolve(__dirname, './assets/server-side-assets'),
				from: './',
				to: path.resolve(__dirname, './dist/assets/server-side-assets'),
			},
			{
				context: path.resolve(__dirname, './assets/images'),
				from: './',
				to: path.resolve(__dirname, './dist/assets/images'),
			},
			{
				from: path.resolve(__dirname, './node_modules/@fortawesome/fontawesome-free/webfonts'),
				to: path.resolve(__dirname, './dist/assets/fonts/fontawesome')
			}
		]),

		new BundleAnalyzerPlugin(),
	],

	externals: {
		jquery: 'jQuery'
	}
});
