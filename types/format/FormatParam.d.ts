export namespace PARAM_REGEX {
    let entry: RegExp;
}
/**
 * @memberof PicoFormat
 * @extends {PicoFormat}
 */
export class PicoFormatParamStatic {
    /**
     * Cast object to params string
     *
     * @example Format.castParams({ a: 1 }) // => "a=1"
     *
     * @param {any} [params] Input params
     * @returns {string} Params string
     */
    static castParams(params?: any): string;
    /**
     * Cast single param to string
     *
     * @example Format.castParam("a", 1) // => "a=1"
     *
     * @param {string} key Param key
     * @param {any} value Param value
     * @param {string} [path] Key path
     * @returns {string} Param string
     */
    static castParam(key: string, value: any, path?: string): string;
    /**
     * Parse params string
     *
     * @example Format.parseParams("a=1") // => { a: 1 }
     *
     * @param {string} value Params string
     * @returns {any} Params object
     */
    static parseParams(value: string): any;
}
export function PicoFormatParamPlugin(self: any): typeof import("#src/utils/Format.js").PicoFormat;
