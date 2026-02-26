import { trait } from "../tool/scope.ts";
import { PicoFormatParser } from "../format/FormatParser.ts";
import { PicoFormatParam } from "../format/FormatParam.ts";
import { PicoFormatOption } from "../format/FormatOption.ts";
import { PicoFormatUrl } from "../format/FormatUrl.ts";
import { PicoFormatFile } from "../format/FormatFile.ts";

export const PicoFormatPlugins = [
    PicoFormatParser,
    PicoFormatParam,
    PicoFormatOption,
    PicoFormatUrl,
    PicoFormatFile,
];

export interface PicoFormatInterface
{
    extend(plugin : Function) : void;
}

export interface PicoFormat extends PicoFormatParser,
    PicoFormatParam,
    PicoFormatOption,
    PicoFormatUrl,
    PicoFormatFile
{
    //
}

export class PicoFormat extends trait(PicoFormatPlugins)
{

    /**
     * Extend format with a plugin
     *
     * @example For.extend(fn)
     *
     * @param {Function} plugin Plugin function
     * @returns {void} No return value
     */
    static extend(plugin : Function) : void
    {
        plugin.call({}, this);
    }

}

export default PicoFormat;