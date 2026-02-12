declare function _exports(env: any, argv: any): ({
    entry: string[];
    output: {
        filename: string;
        path: string;
        libraryTarget: string;
    };
} & {
    optimization: {
        splitChunks: boolean;
    };
    module: {
        parser: {
            javascript: {
                dynamicImportMode: string;
            };
        };
        rules: {
            test: RegExp;
            include: string[];
            loader: string;
            options: {
                configFile: string;
            };
        }[];
    };
    externals: {};
    plugins: any[];
})[];
export = _exports;
