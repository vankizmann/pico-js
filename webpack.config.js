const path = require('path');

let jsExtensionExport = {
    mode: "development",
    entry: ["./src/index.js"],
    output: {
        filename: "pico-js.esm.js",
        path: path.resolve(__dirname, "dist"),
        library: "pico-js",
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
        moment: 'moment'
    },
};

let jsWindowExport = {
    mode: "development",
    entry: ["./src/index.js"],
    output: {
        filename: "pico-js.js",
        path: path.resolve(__dirname, "dist"),
        library: "pico-js",
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
        moment: 'moment'
    },
};


module.exports = [
    jsWindowExport, jsExtensionExport
];