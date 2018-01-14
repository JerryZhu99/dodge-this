const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var nodeExternals = require('webpack-node-externals');
const webpack = require("webpack");
const path = require('path');

module.exports = [{
    entry: {
        'app': 'app.tsx',
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "client"),
            path.resolve(__dirname, "client/src"),
            path.resolve(__dirname, "shared"),
            "node_modules"
        ],
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "var",
        library: "app"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html',
        }),
        new ExtractTextPlugin("styles.css"),
    ],
    devtool: 'inline-source-map'

},{
    entry: {
        'app': 'server.ts',
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
            "node_modules"
        ],
        extensions: [ '.ts', '.js']
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist-server'),
        libraryTarget: "var",
        library: "app"
    },
    externals: [nodeExternals()],
    devtool: 'inline-source-map'

}];