import CopyPlugin from 'copy-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import path from 'path';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

/*
JS:
- Load boilerplate scripts..
- Load child theme scripts...
- Load flexls plugin scripts...
- How the hell are we handling component scripts?
- ES5 transpile from ESNext
- Lint
- (PROD) Uglify / minify

SCSS:
- Load from boilerplate
- Load from child theme...
- Load from flexls plugin??
- Autoprefixer
- Compile to CSS
- PostCSS support??
- (PROD) Minify

STATIC ASSETS:
- copy assets folder to dist (all individual folders)
- compress images
*/

// Configuration for the ExtractTextPlugin.
const extractConfig = {
	use: [
		{
			loader: 'raw-loader'
		},
		{
			loader: 'postcss-loader',
			options: {
				plugins: [ require( 'autoprefixer' ) ],
			},
		},
		{
			loader: 'sass-loader',
			query: {
				outputStyle: 'production' === process.env.NODE_ENV ? 'compressed' : 'nested',
			},
		},
	],
};

module.exports = {
	entry: {
		'/js/main.js': path.resolve(__dirname, './js/app.js'),
		'/js/admin.js': path.resolve(__dirname, './js/admin.js'),
		'/css/style.css': path.resolve(__dirname, './scss/style.scss'),
		'/css/print.css': path.resolve(__dirname, './scss/print.scss'),
		'/css/admin.css': path.resolve(__dirname, './scss/admin.scss'),
	},

	devtool: 'cheap-eval-source-map',
	// target: 'web',
	watch: 'production' !== process.env.NODE_ENV,

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name]',
	},

	resolve: {
		alias: {
			'flexls':'clientNamespace.js',
		},
		modules: [
			path.resolve(__dirname, './js'),
			path.resolve(__dirname, './scss'),
			'node_modules'
		]
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
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
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: path.resolve(__dirname, './postcss.config.js'),
							}
						}
					},
					'sass-loader',
				],
			}
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),

		// Copy contents of ./assets -> ./dist
		new CopyPlugin([
			{
				context: path.resolve(__dirname, './assets/images'),
				from: './',
				to: path.resolve(__dirname, './dist/images'),
			},
		]),

		// Minify Images
		// Include after plugins that add images, eg. copy-webpack-plugin
		// TODO: this should likely be configured more highly
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i
		}),

	],

};
