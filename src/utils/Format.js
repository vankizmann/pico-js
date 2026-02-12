import { PicoFormatParserPlugin } from "../format/FormatParser.js";
import { PicoFormatParamPlugin } from "../format/FormatParam.js";
import { PicoFormatOptionPlugin } from "../format/FormatOption.js";
import { PicoFormatUrlPlugin } from "../format/FormatUrl.js";
import { PicoFormatFilePlugin } from "../format/FormatFile.js";

export const PicoFormatPlugins = [
    PicoFormatParserPlugin,
    PicoFormatParamPlugin,
    PicoFormatOptionPlugin,
    PicoFormatUrlPlugin,
    PicoFormatFilePlugin,
];

/**
 * @class PicoFormat
 *
 * @typedef {import('../format/FormatParser.js').PicoFormatParserStatic} PicoFormatParserStatic
 * @typedef {import('../format/FormatParam.js').PicoFormatParamStatic} PicoFormatParamStatic
 * @typedef {import('../format/FormatOption.js').PicoFormatOptionStatic} PicoFormatOptionStatic
 * @typedef {import('../format/FormatUrl.js').PicoFormatUrlStatic} PicoFormatUrlStatic
 * @typedef {import('../format/FormatFile.js').PicoFormatFileStatic} PicoFormatFileStatic
 *
 * @mixes PicoFormatParserStatic
 * @mixes PicoFormatParamStatic
 * @mixes PicoFormatOptionStatic
 * @mixes PicoFormatUrlStatic
 * @mixes PicoFormatFileStatic
 */
export class PicoFormat
{

    /**
     * Extend format with a plugin
     *
     * @example For.extend(fn)
     *
     * @param {function} plugin Plugin function
     * @returns {void} No return value
     */
    static extend(plugin)
    {
        plugin.call({}, this);
    }

}

/**
 * @returns {typeof PicoFormat}
 */
export function PicoFormatBuilder() {

    let cls = PicoFormat;

    for ( const plugin of PicoFormatPlugins ) {
        cls = plugin.call(cls, cls);
    }

    return cls;
}

export default PicoFormatBuilder;