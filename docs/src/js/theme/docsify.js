import PagetitlePlugin from "../plugin/title-plugin.js";

let search = {
    namespace: 'pico-js-docs', maxAge: 86400000, depth: 6
};

let options = {
    name: 'pico-js', loadSidebar: true,  depth: 1, subMaxLevel: 3, search
};

options.plugins = [
    PagetitlePlugin
];

window.$docsify = options;