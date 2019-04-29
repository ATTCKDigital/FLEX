import CopyPlugin from 'copy-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { sync } from 'glob';

import path from 'path';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const isDevEnv = 'production' !== process.env.NODE_ENV;

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

module.exports = {
  entry: {
    '/js/main.js': path.resolve(__dirname, './js/app.js'),
    '/js/admin.js': path.resolve(__dirname, './js/admin.js'),
    'css/style': path.resolve(__dirname, './scss/style.scss'),
    'css/print': path.resolve(__dirname, './scss/print.scss'),
    'css/admin': path.resolve(__dirname, './scss/admin.scss'),
    'css/wysiwyg': path.resolve(__dirname, './scss/wysiwyg.scss'),

  },

  devtool: 'cheap-eval-source-map',
  mode: process.env.NODE_ENV,
  target: 'web',
  watch: isDevEnv,

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]',
  },

  resolve: {
    alias: {
      'flexlayout': path.resolve(__dirname, '../flexlayout'),
      // 'flexlayout':'clientNamespace.js',
    },
    modules: [
      path.resolve(__dirname, './js'),
      // path.resolve(__dirname, './scss'),
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          // 'production' !== process.env.NODE_ENV ? 'style-loader' : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevEnv
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, './postcss.config.js'),
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

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].[hash].css',
      path: path.resolve(__dirname, './dist/css'),
    }),

    // Copy contents of ./assets -> ./dist
    new CopyPlugin([
      {
        context: path.resolve(__dirname, './assets/server-side-assets'),
        from: './',
        to: path.resolve(__dirname, './dist/assets/server-side-assets'),
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
