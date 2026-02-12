export const TYPE_PARSERS: {
    match: (val: any) => boolean;
    parse: (val: any) => any;
}[];
export const TYPE_CASTERS: {
    match: (val: any) => boolean;
    parse: (val: any) => string;
}[];
/**
 * @memberof PicoFormat
 */
export class PicoFormatParserStatic {
    /**
     * Convert key path format
     *
     * @example Format.keyed("a[b]") // => "a.b"
     *
     * @param {any} value Input key
     * @param {any} [fallback] Fallback value
     * @returns {string} Keyed string
     */
    static keyed(value: any, fallback?: any): string;
    /**
     * Parse value by type
     *
     * @example Format.parsed("true") // => true
     *
     * @param {any} value Input value
     * @param {any} [fallback] Fallback value
     * @param {Array<any>} [parsers] Custom parsers
     * @returns {any} Parsed value
     */
    static parsed(value: any, fallback?: any, parsers?: Array<any>): any;
    /**
     * Cast value to string
     *
     * @example Format.casted(true) // => "true"
     *
     * @param {any} value Input value
     * @param {boolean} [encode] Encode value
     * @param {Array<any>} [casters] Custom casters
     * @returns {string} Casted string
     */
    static casted(value: any, encode?: boolean, casters?: Array<any>): string;
}
export function PicoFormatParserPlugin(self: any): typeof import("#src/utils/Format.js").PicoFormat;
