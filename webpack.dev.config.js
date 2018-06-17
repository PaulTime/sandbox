const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
    {
        entry: "./src/client/index.js",
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "client.js",
        },
        watch: true,
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
                // {
                //     test: /\.css$/,
                //     include: /node_modules/,
                //     use: [
                //         { loader: "isomorphic-style-loader" },
                //         {
                //             loader: "css-loader",
                //             // options: {
                //             //     importLoaders: 1
                //             // }
                //         },
                //     ]
                // },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    exclude: /(\/fonts)/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        context: 'src',
                    }
                },
                { test: /\.css$/, loader: "isomorphic-style-loader!css-loader" }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([{ from: 'src/static', to: 'static' }]),
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
                // {
                //     test: /\.css$/,
                //     include: /node_modules/,
                //     use: [
                //         { loader: "isomorphic-style-loader" },
                //         {
                //             loader: "css-loader",
                //             // options: {
                //             //     importLoaders: 1
                //             // }
                //         },
                //     ]
                // },
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
                { test: /\.css$/, loader: "isomorphic-style-loader!css-loader" }
            ]
        }
    }
];
