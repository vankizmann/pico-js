import { Arr, Mix, Str } from "#src/index.esm.js";
import { PicoFormatParserStatic, PicoFormatParserPlugin } from "#src/format/FormatParser.js";
import { PicoFormatParamStatic, PicoFormatParamPlugin } from "#src/format/FormatParam.js";
import { PicoFormatOptionStatic, PicoFormatOptionPlugin } from "#src/format/FormatOption.js";
import { PicoFormatUrlStatic, PicoFormatUrlPlugin } from "#src/format/FormatUrl.js";
import { PicoFormatFileStatic, PicoFormatFilePlugin } from "#src/format/FormatFile.js";

export const PicoFormatPlugins = [
    PicoFormatParserPlugin,
    PicoFormatParamPlugin,
    PicoFormatOptionPlugin,
    PicoFormatUrlPlugin,
    PicoFormatFilePlugin,
];

/**
 * @class PicoFormat
 * @mixes PicoFormatParserStatic
 * @mixes PicoFormatParamStatic
 * @mixes PicoFormatOptionStatic
 * @mixes PicoFormatUrlStatic
 * @mixes PicoFormatFileStatic
 */
export class PicoFormat
{

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