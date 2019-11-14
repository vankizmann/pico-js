const path = require('path');
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let jsExtensionExport = {
    mode: "development",
    entry: ["./src/index.js"],
    output: {
        filename: "nano-js.esm.js",
        path: path.resolve(__dirname, "dist"),
        library: "nano-js",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /.js$/,
                include: [
                    path.resolve(__dirname, './src')
                ],
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve('./babel.config.js')
                },
            }
        ]
    },
    externals: {
        'vue': {
            root: 'Vue', commonjs: 'vue', commonjs2: 'vue', amd: 'vue'
        }
    },
};

let jsWindowExport = {
    mode: "development",
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        filename: "nano-js.js",
        path: path.resolve(__dirname, "dist"),
        library: "nano-js",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /.js$/,
                include: [
                    path.resolve(__dirname, './src')
                ],
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve('./babel.config.js')
                },
            }
        ]
    },
    externals: {
        'vue': {
            root: 'Vue', commonjs: 'vue', commonjs2: 'vue', amd: 'vue'
        }
    },
};


module.exports = [
    jsWindowExport, jsExtensionExport
];