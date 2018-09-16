const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = [
  {
    name: 'client',
    target: 'web',

    entry: [
      'babel-polyfill',
      './src/client/index.js',
    ],
    output: {
      path: path.resolve(__dirname, 'dist', 'public'),
      filename: 'client.js',
    },

    mode: 'production',

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
      ]
    },

    plugins: [
      new ExtractTextPlugin('client.css'),
      new OptimizeCssAssetsPlugin()
    ]
  },

  {
    name: 'server',
    entry: [
      'babel-polyfill',
      './src/server/index.js',
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'server.js',
    },

    target: 'node',
    node: {
      __dirname: false
    },
    externals: [nodeExternals({
      whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
    })],

    mode: 'production',

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
      ]
    }
  }
];
