const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require( 'nodemon-webpack-plugin' );

module.exports = {
  entry: {
    server: [
      './src/server/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals({
    // load non-javascript files with extensions, presumably via loaders
    whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
  }),],

  watch: true,
  devtool: 'source-map',
  mode: 'development',

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
        use: 'null-loader'
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   exclude: /(\/fonts)/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[path][name].[ext]',
      //     context: 'src',
      //     emitFile: false,
      //   }
      // },
    ]
  },
  plugins: [
    new NodemonPlugin({
      watch: path.resolve(__dirname, 'dist', 'server.js'),
      verbose: false
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
};
