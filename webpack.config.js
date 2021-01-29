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
                    configFile: path.resolve('./babel.config.js')
                },
            }
        ]
    },
    externals: {
        moment: {
            root: 'moment', commonjs: 'moment', commonjs2: 'moment', amd: 'moment',
        }
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
            filename: "pico-js.esm.js",
            path: path.resolve(__dirname, "dist"),
            libraryTarget: "umd",
        },

    }, config);

    let globalPackage = Object.assign({

        output: {
            filename: "pico-js.js",
            path: path.resolve(__dirname, "dist"),
            libraryTarget: "global",
        }

    }, config);

    if ( argv.mode === 'development' ) {
        return [bundlerPackage, globalPackage];
    }

    let loaderOptions = new webpack.LoaderOptionsPlugin({
        minimize: true
    });

    bundlerPackage.plugins.push(loaderOptions);
    globalPackage.plugins.push(loaderOptions);

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
    globalPackage.optimization = optimization;

    return [bundlerPackage, globalPackage];
}