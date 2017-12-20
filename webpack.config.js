var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var config = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    // main: 'js/app',
    vendors: ['jquery', 'underscore', 'backbone']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[hash].[id].js'
  },

  module: {
    rules: [
      {
        test: /[.-]min\.js$/,
        use: 'source-map-loader',
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        // inline base64 URLs for <=10kb images, direct URLs for the rest
        use: 'url?limit=10000&name=img/[name].[ext]'
      },
      {
        test: /\.(woff2?|eot|ttf|svg)(\?v=[\d.]+)?$/,
        use: 'url?limit=10000&name=fonts/[hash].[ext]'
      }
    ]
  },

  resolve: {
    alias: {
      jquery: 'jquery/dist/jquery.min',
      underscore: 'underscore/underscore-min',
      backbone: 'backbone/backbone-min'
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'js/vendors.js'
    }),

    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),

    new HtmlWebpackPlugin({
      
    })
  ]
};

module.exports = config;
