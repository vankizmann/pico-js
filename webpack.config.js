const path = require('path');
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let jsExtensionExport = {
    mode: "development",
    entry: ["./src/index.js"],
    output: {
        filename: "index.esm.js",
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
        },
        'velocity-animate': {
            root: 'Velocity', commonjs: 'velocity-animate', commonjs2: 'velocity-animate', amd: 'velocity-animate'
        }
    },
};

let jsWindowExport = {
    mode: "development",
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        filename: "index.js",
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
        },
        'velocity-animate': {
            root: 'Velocity', commonjs: 'velocity-animate', commonjs2: 'velocity-animate', amd: 'velocity-animate'
        }
    },
};


module.exports = [
    jsWindowExport, jsExtensionExport
];