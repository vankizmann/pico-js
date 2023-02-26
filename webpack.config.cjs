const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

let config = {
    entry: ["./src/index.js"],
    module: {
        rules: [
            {
                test: /.js$/,
                include: [
                    path.resolve(__dirname, './src')
                ],
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve('./babel.config.cjs')
                },
            }
        ]
    },
    externals: {
        'moment': {
            root: 'moment', commonjs2: 'moment', commonjs: 'moment', amd: 'moment'
        },
    },
    plugins: []
};

module.exports = function (env, argv) {

    config.mode = argv.mode;

    if ( argv.mode === 'development' ) {
        config.devtool = 'eval-source-map';
    }

    if ( argv.mode === 'production' ) {
        config.devtool = 'source-map';
    }

    /**
     * @const __dirname
     */

    let bundlerPackage = Object.assign({

        output:{
            filename: "pico-js.js",
            path: path.resolve(__dirname, "dist"),
            library: 'Pico',
            libraryTarget: "umd",
        },

    }, config);

    if ( argv.mode === 'development' ) {
        return [bundlerPackage];
    }

    let loaderOptions = new webpack.LoaderOptionsPlugin({
        minimize: true
    });

    bundlerPackage.plugins.push(loaderOptions);

    let terserOptions = {
        mangle: true
    }

    let terser = new TerserPlugin({
        terserOptions, extractComments: false,
    });

    let optimization = {
        minimize: true, minimizer: []
    };

    optimization.minimizer.push(terser);

    bundlerPackage.optimization = optimization;

    return [bundlerPackage];
}