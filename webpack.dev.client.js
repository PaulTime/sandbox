const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'client',
  target: 'web',

  entry: [
    'babel-polyfill',
    './src/client/index.js',
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
    hotOnly: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    proxy: {
      '/static/**': {
        target: path.resolve(__dirname, 'static'),
        changeOrigin: true,
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
        use: [
          'style-loader',
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
      },
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
