export namespace OPTION_REGEX {
    let entry: RegExp;
}
/**
 * @memberof PicoFormat
 */
export class PicoFormatOptionStatic {
    /**
     * Cast object to options string
     *
     * @example Format.castOptions({ a: 1 }) // => "a: 1;"
     *
     * @param {any} [options] Input options
     * @param {boolean} [space] Add space
     * @returns {string} Options string
     */
    static castOptions(options?: any, space?: boolean): string;
    /**
     * Cast single option to string
     *
     * @example Format.castOption("a", 1) // => "a: 1"
     *
     * @param {string} key Option key
     * @param {any} value Option value
     * @param {string} [path] Key path
     * @param {boolean} [space] Add space
     * @returns {string} Option string
     */
    static castOption(key: string, value: any, path?: string, space?: boolean): string;
    /**
     * Parse options string
     *
     * @example Format.parseOptions("a: 1;") // => { a: 1 }
     *
     * @param {string} value Options string
     * @returns {any} Options object
     */
    static parseOptions(value: string): any;
}
export function PicoFormatOptionPlugin(self: any): typeof import("#src/utils/Format.js").PicoFormat;
