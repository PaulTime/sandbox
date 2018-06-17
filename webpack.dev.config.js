const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
    {
        entry: "./src/client/index.js",
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "client.js",
        },
        watch: true,
        devtool: 'eval',
        resolve: {
            modules: [
                "src",
                "node_modules"
            ],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            // {
                            //     loader: 'postcss-loader',
                            //     options: {
                            //         config: {
                            //             path: path.resolve(__dirname, './postcss.config.js'),
                            //         },
                            //     }
                            // }
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
            new CopyWebpackPlugin([{ from: 'src/static', to: 'static' }]),
            new ExtractTextPlugin({
                filename: 'client.css',
                allChunks: true,
            }),
        ]
    },
    {
        entry: {
            server: "./src/server/index.js"
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "[name].js",
        },
        target: "node",
        externals: [nodeExternals()],
        watch: true,
        devtool: 'eval',
        node: {
            __dirname: false
        },
        resolve: {
            modules: [
                "src",
                "node_modules"
            ],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    loader: 'ignore-loader',
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    exclude: /(\/fonts)/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        context: 'src',
                        emitFile: false,
                    }
                },
            ]
        }
    }
];
