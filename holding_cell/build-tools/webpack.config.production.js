import path from 'path';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

module.exports = {
  entry: './js/app.js',
  target: 'web',
  watch: false,
  output: {
    path: __dirname + '/dist/js',
    filename: 'main.js'
  },
  resolve: {
    // Create aliases to import or require certain modules more easily.
    alias: {
      'flexls': path.resolve(__dirname, './js/clientNamespace.js'),
      'jquery': 'jquery/dist/jquery/jquery.min.js'
    },

    //   Tell webpack what directories should be searched when resolving modules.
    //
    //     Absolute and relative paths can both be used, but be aware that they will behave a bit differently.
    //
    //     A relative path will be scanned similarly to how Node scans for node_modules, by looking through the current directory as well as it's ancestors (i.e. ./node_modules, ../node_modules, and on).
    //
    //     With an absolute path, it will only search in the given directory.
    //
    modules: [
      path.resolve(__dirname, "js"),
      'node_modules'
    ]
  },
  plugins: [
    // Automatically loads modules.
    //
    // Whenever the identifier is encountered as free variable in a module,
    //  the module is loaded automatically and the identifier is filled with
    //  the exports of the loaded module (of property in order to support named exports).
    new webpack.ProvidePlugin({
      '$': "jquery",
      'jQuery': "jquery",
      "window.jQuery": "jquery",
      'FLEXLS': 'flexls',
      'window.FLEXLS': 'flexls',
      'FLEXLS.Utils': 'utils',
      'FLEXLS.Config': 'config',
      'Masonry': 'masonry-layout/masonry',
      'window.Masonry': 'masonry-layout/masonry',
      'ImagesLoaded': 'imagesloaded/imagesloaded'
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new UglifyJSPlugin()
  ],
  externals: {
    jquery: 'jQuery'
  },
  module: {
        rules: [
            {test: [
                /clientNamespace\.js/,
                /main\.js/
            ], use: 'imports-loader?define=>false'},
            {
                test: /\.js$/,
                include: path.join(__dirname, 'js'),
                use: ['babel-loader']
            },

            {
                test: require.resolve('jquery'),
                use: [{
                      loader: 'expose-loader',
                      options: 'jQuery'
                  },{
                      loader: 'expose-loader',
                      options: '$'
                  }]
            }
        ],
        //See https://github.com/mapbox/mapbox-gl-js/issues/4359
        noParse: /(mapbox-gl)\.js$/,
    },
};