/**
 * @returns {typeof PicoFormat}
 */
export function PicoFormatBuilder(): typeof PicoFormat;
export const PicoFormatPlugins: ((self: any) => typeof import("./Format.js").PicoFormat)[];
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
export class PicoFormat {
    /**
     * Extend format with a plugin
     *
     * @example For.extend(fn)
     *
     * @param {function} plugin Plugin function
     * @returns {void} No return value
     */
    static extend(plugin: Function): void;
}
export default PicoFormatBuilder;
export type PicoFormatParserStatic = import("#src/format/FormatParser.js").PicoFormatParserStatic;
export type PicoFormatParamStatic = import("#src/format/FormatParam.js").PicoFormatParamStatic;
export type PicoFormatOptionStatic = import("#src/format/FormatOption.js").PicoFormatOptionStatic;
export type PicoFormatUrlStatic = import("#src/format/FormatUrl.js").PicoFormatUrlStatic;
export type PicoFormatFileStatic = import("#src/format/FormatFile.js").PicoFormatFileStatic;
