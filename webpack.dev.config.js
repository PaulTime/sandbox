const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
    {
        entry: "./src/client/index.js",
        output: {
            path: path.resolve(__dirname, 'dist', 'public'),
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
                }
            ]
        }
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
                }
            ]
        }
    }
];
