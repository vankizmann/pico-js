module.exports = function (api) {

    api.cache(true);

    const presets = [
        ['@babel/preset-env', {
            targets: "defaults, not ie 11" // Fast, modern output
        }]
    ];

    const plugins= [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-export-default-from",
        // "@babel/plugin-transform-runtime"
    ];

    return { presets,  plugins };
};
