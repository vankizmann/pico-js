export class PicoString {
    /**
     * Get character at index
     *
     * @example Str.get("abc", 1) // => "b"
     *
     * @param {any} value Input string
     * @param {any} index Char index
     * @returns {string} Single char
     */
    static get(value: any, index: any): string;
    /**
     * Replace substring at index
     *
     * @example Str.set("abc", 1, "X") // => "aXc"
     *
     * @param {any} value Input string
     * @param {any} index Start index
     * @param {string} [replace] Replace value
     * @returns {string} Updated string
     */
    static set(value: any, index: any, replace?: string): string;
    static replace(value: any, replace: any, search?: any): any;
    static extract(value: any, replace: any, search?: any): string;
    /**
     *
     * @param {any} value
     * @param {RegExp|string} pattern
     * @param {function} [cb]
     * @returns {any}
     */
    static match(value: any, pattern: RegExp | string, cb?: Function): any;
    static regex(val: any): string;
    static uc(value: any): string;
    /**
     * @see PicoString.uc
     */
    static upper: typeof PicoString.uc;
    static ucfirst(value: any): any;
    static lc(value: any): string;
    /**
     * @see PicoString.lc
     */
    static lower: typeof PicoString.lc;
    static lcfirst(value: any): any;
    static cc(value: any): any;
    /**
     * @see PicoString.cc
     */
    static camelcase: typeof PicoString.cc;
    static kc(value: any): any;
    /**
     * @see PicoString.kc
     */
    static kebabcase: typeof PicoString.kc;
    static sc(value: any): any;
    /**
     * @see PicoString.sc
     */
    static snakecase: typeof PicoString.sc;
    static pc(value: any): any;
    /**
     * @see PicoString.pc
     */
    static pascalcase: typeof PicoString.pc;
    static has(value: any, search: any): boolean;
    static range(value: any, search: any, fallback?: any): any;
    static slice(value: any, start: any, limit: any): string;
    static string(value: any, empty?: string, html?: boolean): any;
    static boolean(value: any, yes?: string, no?: string, empty?: string): string;
    static number(value: any, fixed?: any, locale?: any, config?: {}): any;
    /**
     *
     * @param value
     * @param leading
     * @param padding
     * @returns {string|any}
     */
    static integer(value: any, leading?: number, padding?: string): string | any;
    static datetime(value: any, format?: string, empty?: string): any;
    static date(value: any, format?: string, empty?: string): any;
    static time(value: any, format?: string, empty?: string): any;
    static objectify(value: any, mode?: string, toarray?: boolean): any;
    static stringify(value: any, mode?: string): any;
}
export namespace PicoString {
    /**
     * @see PicoStr.regex
     */
    function regexEscape(...args: any[]): string;
    /**
     * @see PicoStr.pascalcase
     */
    function humancase(...args: any[]): any;
    /**
     * @see PicoFormat.slugify
     */
    function slugify(...args: any[]): any;
    /**
     * @see PicoFormat.castOptions
     */
    function options(...args: any[]): any;
    /**
     * @see PicoFormat.parseOptions
     */
    function fromOptions(...args: any[]): any;
    /**
     * @see PicoFormat.castParams
     */
    function params(...args: any[]): any;
    /**
     * @see PicoFormat.parseParams
     */
    function fromParams(...args: any[]): any;
    /**
     * @see PicoFormat.filesize
     */
    function filesize(...args: any[]): any;
    function real(): void;
    function array(): void;
}
export default PicoString;
