const fs = require('fs');
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let themes = {
    './docs/src/scss/index-light.scss': '../docs/dist/light.css',
    './docs/src/scss/index-dark.scss': '../docs/dist/dark.css',
};

let libJs = {
    entry: ["./src/index.js"],
    module: {
        rules: [
            {
                test: /.c?js$/,
                include: [
                    path.resolve('src'),
                ],
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve('babel.config.js')
                },
            }
        ],
    },
    externals: {
        //
    },
    plugins: []
};

let docJs = {
    entry: ["./docs/src/js/index.cjs"],
    module: {
        rules: [
            {
                test: /.c?js$/,
                include: [
                    path.resolve('src'),
                ],
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve('babel.config.cjs')
                },
            }
        ],
    },
    externals: {
        //
    },
    resolve: {
        alias: {
            '@kizmann/pico-js': path.resolve('src/index.js')
        }
    }
};

let themeFn = (entry, target) => ({
    entry: [entry],
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: [
                    path.resolve(entry.replace(/\/[^\/]+\.scss$/, ''))
                ],
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'
                ]
            }
        ],

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: target
        })
    ],
    output: {
        filename: ".ignore.js",
        path: path.resolve(__dirname, "dist"),
    }
});

module.exports = function (env, argv) {

    let docConfig = {
        inject: false, base: 'https://pico-js.local', logoSvg: '', loaderCss: ''
    }

    if ( fs.existsSync('./assets/pico-js-dark.svg') ) {
        docConfig.logoSvg = fs.readFileSync('./assets/pico-js-dark.svg', 'utf8');
    }

    if ( fs.existsSync('./docs/src/scss/theme/loader.scss') ) {
        docConfig.loaderCss = fs.readFileSync('./docs/src/scss/theme/loader.scss', 'utf8');
    }

    if ( argv.mode === 'production' ) {
        docConfig.base = 'https://vankizmann.github.io/pico-js';
    }

    libJs.mode = argv.mode;

    if ( argv.mode === 'development' ) {
        libJs.devtool = 'eval-source-map';
    }

    if ( argv.mode === 'production' ) {
        libJs.devtool = 'source-map';
    }

    /**
     * @const __dirname
     */

    let libJsBundle = Object.assign({

        output: {
            filename: "pico-js.js",
            path: path.resolve(__dirname, "dist"),
            library: 'Pico',
            libraryTarget: "umd",
        }

    }, libJs);

    let docJsBundle = Object.assign({

        output: {
            filename: "dist/docs.js",
            path: path.resolve(__dirname, "docs"),
        },

        plugins: [
            new webpack.ProvidePlugin({
                global: 'global'
            }),
            new HtmlWebpackPlugin(Object.assign({
                template: path.resolve('./docs/index.template.html'),
            }, docConfig))
        ],

        resolve: {
            fallback: {
                "global": require.resolve("global")
            }
        }

    }, docJs);

    let themeList = [];

    Object.keys(themes).forEach((key, index) => {
        themeList[index] = themeFn(key, themes[key]);
    });

    if ( argv.mode === 'development' ) {
        return [
            libJsBundle, docJsBundle, ...themeList
        ];
    }

    let loaderOptions = new webpack.LoaderOptionsPlugin({
        minimize: true
    });

    libJsBundle.plugins.push(loaderOptions);
    docJsBundle.plugins.push(loaderOptions);

    themeList.forEach((cfg) => {
        cfg.plugins.push(loaderOptions);
    });

    let terserOptions = {
        mangle: true
    };

    let terser = new TerserPlugin({
        terserOptions, extractComments: false,
    });

    let optimization = {
        minimize: true, minimizer: []
    };

    optimization.minimizer.push(terser);

    libJsBundle.optimization = optimization;
    docJsBundle.optimization = optimization;

    themeList.forEach((cfg) => {
        cfg.optimization = optimization;
    });

    return [
        libJsBundle, docJsBundle, ...themeList
    ];
}