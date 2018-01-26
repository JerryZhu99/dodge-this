const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: {
        'app': 'tests/tests.ts',
    },
    target: "node",
    node: {
        console: true,
    },
    module: {
        rules: [{
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "server"),
            path.resolve(__dirname, "shared"),
            path.resolve(__dirname, "client"),
            path.resolve(__dirname, "client/src"),
            path.resolve(__dirname),
            path.resolve("node_modules")
        ],
        extensions: [ '.ts', '.js']
    },
    output: {
        filename: 'tests.js',
        path: path.resolve(__dirname, 'dist-tests'),
    },
    externals: [nodeExternals()],
    plugins: [
        new WebpackShellPlugin({
            onBuildExit: "mocha dist-tests/tests.js || exit 0"
        })
    ]
};