const webpack            = require('webpack');
const AssetsPlugin       = require('assets-webpack-plugin');
const path               = require('path');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const CompressionPlugin  = require('compression-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const devServer = require('webpack-dev-server')


var webpackConfig = {
  entry   : { app : './src/index.js'},

  output : {
    filename   : '[name].[hash].js',
    path       : path.resolve(__dirname,'dist/')
  },

  //watch: true,

  plugins : [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: path.resolve(__dirname,'src/index.html'),
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor', 'manifest'],
      minChunks: Infinity
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new AssetsPlugin(),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.UglifyJsPlugin({
      mangle  : true,
      compress: {
        sequences   : true,
        dead_code   : true,
        conditionals: true,
        booleans    : true,
        unused      : true,
        if_return   : true,
        join_vars   : true,
        drop_console: true,
        warnings: false
      }
    }),
    new CompressionPlugin({
      asset: 'app.gz',
      algorithm: 'gzip',
      regExp: /\.js$|\.html$|\.css$/,
      threshold: 1024,
      minRatio: 0.9
    })
  ],

  module : {
    loaders : [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            "presets": [["es2015", {"modules": false}], "react"]
          }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader!css-loader!postcss-loader!sass-loader")
      }
    ]
  },

  devServer: {
    contentBase: 'dist',
    port: 3000
  }
};

module.exports = webpackConfig;