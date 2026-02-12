import { PicoFormatParserPlugin } from "#src/format/FormatParser.js";
import { PicoFormatParamPlugin } from "#src/format/FormatParam.js";
import { PicoFormatOptionPlugin } from "#src/format/FormatOption.js";
import { PicoFormatUrlPlugin } from "#src/format/FormatUrl.js";
import { PicoFormatFilePlugin } from "#src/format/FormatFile.js";

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
 * @typedef {import('#src/format/FormatParser.js').PicoFormatParserStatic} PicoFormatParserStatic
 * @typedef {import('#src/format/FormatParam.js').PicoFormatParamStatic} PicoFormatParamStatic
 * @typedef {import('#src/format/FormatOption.js').PicoFormatOptionStatic} PicoFormatOptionStatic
 * @typedef {import('#src/format/FormatUrl.js').PicoFormatUrlStatic} PicoFormatUrlStatic
 * @typedef {import('#src/format/FormatFile.js').PicoFormatFileStatic} PicoFormatFileStatic
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