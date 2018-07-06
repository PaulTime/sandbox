const path = require('path');
const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  name: 'client',
  target: 'web',

  entry: [
    './src/client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:4004/',
    filename: 'client.js',
  },

  watch: true,
  devtool: 'source-map',
  mode: 'development',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:4004/',
    port: 9000,
    host: 'localhost',
    inline: true,
    hot: true
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
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /(\/fonts)/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          context: 'src',
        }
      },
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: 'page.html',
    //   template: 'src/server/template.html',
    //   inject: false,
    // }),
    new ExtractTextPlugin({
      filename: 'client.css',
      allChunks: true,
    }),
    // new CopyWebpackPlugin([{ from: 'src/static', to: 'static' }]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
