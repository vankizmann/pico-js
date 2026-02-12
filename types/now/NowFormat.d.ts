export namespace NOW_FORMAT {
    let L: string;
    let LL: string;
    let LLL: string;
    let LLLL: string;
}
export namespace NOW_PARSE {
    let second: string;
    let minute: string;
    let hour: string;
    let date: string;
    let month: string;
    let year: string;
}
/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowFormatInstance {
    /**
     * Check if value matches format
     *
     * @example Now.isParsable("2026-01-01") // => true
     *
     * @param {string} value Test value
     * @param {string} [format] Date format
     * @returns {boolean} Is parsable
     */
    isParsable(value: string, format?: string): boolean;
    /**
     * Parse date from string
     *
     * @example Now.parse("2026-01-01") // => Now
     *
     * @param {any} value Input value
     * @param {string} [format] Input format
     * @returns {PicoNow} Current instance
     */
    parse(value: any, format?: string): PicoNow;
    value: Date;
    /**
     * Parse date using format
     *
     * @example Now.parseFormat("01/01/2026", "DD/MM/YYYY")
     *
     * @param {string} value Input value
     * @param {string} format Input format
     * @returns {PicoNow} Current instance
     */
    parseFormat(value: string, format: string): PicoNow;
    /**
     * Format date to string
     *
     * @example Now.format("YYYY-MM-DD") // => "2026-02-12"
     *
     * @param {string} [format] Output format
     * @returns {string} Formatted string
     */
    format(format?: string): string;
    /**
     * Format date as integer
     *
     * @example Now.code("YYYYMMDD") // => 20260212
     *
     * @param {string} [format] Output format
     * @returns {number} Formatted integer
     */
    code(format?: string): number;
}
export function PicoNowFormatPlugin(self: any): typeof import("#src/utils/Now.js").PicoNow;
