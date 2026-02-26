const fs = require('fs');
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let themes = {
    // './docs/src/scss/index-light.scss': '../docs/dist/light.css',
    // './docs/src/scss/index-dark.scss': '../docs/dist/dark.css',
};

let scripts = {
    './src/speedcheck.js': './dist/speedcheck.js',
    './src/index.js': './dist/pico-js.js'
};

let libJs = {
    optimization: {
        splitChunks: false,
    },
    module: {
        parser: {
            javascript: {
                dynamicImportMode: 'eager'
            }
        },
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
            },
            {
                test: /.ts$/,
                include: [
                    path.resolve('src'),
                    path.resolve('node_modules/@kizmann/pico-js'),
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
            },
            {
                test: /.ts$/,
                include: [
                    path.resolve('src'),
                    path.resolve('node_modules/@kizmann/pico-js'),
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

    let browserJsBundle = Object.assign({

        entry: ["./src/index.browser.ts"],

        output: {
            filename: "pico-js.browser.js",
            path: path.resolve(__dirname, "dist"),
            libraryTarget: 'window'
        },

    }, libJs);

    let moduleJsBundle = Object.assign({

        entry: ["./src/index.esm.ts"],

        output: {
            filename: "pico-js.esm.js",
            path: path.resolve(__dirname, "dist"),
            library: 'pi',
            libraryTarget: "umd",
        },

    }, libJs);

    let docJsBundle = Object.assign({

        output: {
            filename: "dist/docs.js",
            path: path.resolve(__dirname, "docs"),
        },

        plugins: [
            new HtmlWebpackPlugin(Object.assign({
                template: path.resolve('./docs/index.template.html'),
            }, docConfig))
        ]

    }, docJs);

    let themeList = [];

    Object.keys(themes).forEach((key, index) => {
        themeList[index] = themeFn(key, themes[key]);
    });

    let loaderOptions = new webpack.LoaderOptionsPlugin({
        minimize: true
    });

    if ( argv.mode === 'development' ) {
        return [
            browserJsBundle, moduleJsBundle, //docJsBundle, ...themeList
        ];
    }

    browserJsBundle.plugins.push(loaderOptions);
    moduleJsBundle.plugins.push(loaderOptions);
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

    browserJsBundle.optimization = optimization;
    moduleJsBundle.optimization = optimization;
    docJsBundle.optimization = optimization;

    themeList.forEach((cfg) => {
        cfg.optimization = optimization;
    });

    return [
        browserJsBundle, moduleJsBundle, //docJsBundle, ...themeList
    ];
}