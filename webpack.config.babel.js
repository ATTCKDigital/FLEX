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

module.exports = {
	entry: path.resolve(__dirname, './js/app.js'),
	// devtool: 'source-map',
	// target: 'web',
	// watch: true,

	output: {
		path: path.resolve(__dirname, './dist/js'),
		filename: 'main.js',
	},

	// resolve: {
	// 	alias: {
	// 		'flexls':'clientNamespace.js',
	// 	},
	// 	modules: [
	// 		path.resolve(__dirname, './js'),
	// 	]
	// },

	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					{
						loader: "sass-loader",
						options: {
							includePaths: [
								path.resolve(__dirname, './scss/')
							]
						},
					},
				],
			},
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),

		// Copy contents of ./assets -> ./dist
		new CopyPlugin([
			{
				context: path.resolve(__dirname, './assets'),
				from: '**/*',
				to: path.resolve(__dirname, './dist'),
			},
		]),

		// Minify Images
		// Include after plugins that add images, eg. copy-webpack-plugin
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i
		}),

	],

};
