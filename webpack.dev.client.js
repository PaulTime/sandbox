const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  name: 'client',
  target: 'web',

  entry: [
    './src/client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:9000/',
    filename: 'client.js',
  },

  watch: true,
  devtool: 'source-map',
  mode: 'development',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:9000/',
    port: 9000,
    host: 'localhost',
    inline: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    proxy: {
      '/static': {
        target: 'http://localhost:4004/',
        changeOrigin: true
      }
    }
  },

  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(__dirname, 'postcss.config.js'),
                },
              }
            }
          ]
        })
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   exclude: /(\/fonts)/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[path][name].[ext]',
      //   }
      // },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'client.css',
      allChunks: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
