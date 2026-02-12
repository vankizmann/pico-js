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
    /**
     * Replace first occurrence
     *
     * @example Str.replace("abc", "X", "b") // => "aXc"
     *
     * @param {any} value Input string
     * @param {string} replace Replace value
     * @param {any} [search] Search value
     * @returns {string} Updated string
     */
    static replace(value: any, replace: string, search?: any): string;
    /**
     * Extract substring by range
     *
     * @example Str.extract("abc", "b") // => "b"
     *
     * @param {any} value Input string
     * @param {string} replace Search value
     * @param {any} [search] Match source
     * @returns {string|null} Extracted string
     */
    static extract(value: any, replace: string, search?: any): string | null;
    /**
     * Match pattern in string
     *
     * @example Str.match("abc", /b/) // => ["b"]
     *
     * @param {any} value Input string
     * @param {RegExp|string} pattern Match pattern
     * @param {any} [cb] Callback fn
     * @returns {any} Match result
     */
    static match(value: any, pattern: RegExp | string, cb?: any): any;
    /**
     * Escape regex characters
     *
     * @example Str.regex("a.b") // => "a\\.b"
     *
     * @param {any} val Input string
     * @returns {string} Escaped string
     */
    static regex(val: any): string;
    /**
     * Convert to uppercase
     *
     * @example Str.uc("abc") // => "ABC"
     *
     * @param {any} value Input string
     * @returns {string} Uppercase string
     */
    static uc(value: any): string;
    /**
     * @see PicoString.uc
     */
    static upper: typeof PicoString.uc;
    /**
     * Uppercase first character
     *
     * @example Str.ucfirst("abc") // => "Abc"
     *
     * @param {string} value Input string
     * @returns {string} Updated string
     */
    static ucfirst(value: string): string;
    /**
     * Convert to lowercase
     *
     * @example Str.lc("ABC") // => "abc"
     *
     * @param {any} value Input string
     * @returns {string} Lowercase string
     */
    static lc(value: any): string;
    /**
     * @see PicoString.lc
     */
    static lower: typeof PicoString.lc;
    /**
     * Lowercase first character
     *
     * @example Str.lcfirst("ABC") // => "aBC"
     *
     * @param {string} value Input string
     * @returns {string} Updated string
     */
    static lcfirst(value: string): string;
    /**
     * Convert to camelCase
     *
     * @example Str.cc("hello-world") // => "helloWorld"
     *
     * @param {string} value Input string
     * @returns {string} camelCase string
     */
    static cc(value: string): string;
    /**
     * @see PicoString.cc
     */
    static camelcase: typeof PicoString.cc;
    /**
     * Convert to kebab-case
     *
     * @example Str.kc("helloWorld") // => "hello-world"
     *
     * @param {string} value Input string
     * @returns {string} kebab-case string
     */
    static kc(value: string): string;
    /**
     * @see PicoString.kc
     */
    static kebabcase: typeof PicoString.kc;
    /**
     * Convert to snake_case
     *
     * @example Str.sc("helloWorld") // => "hello_world"
     *
     * @param {string} value Input string
     * @returns {string} snake_case string
     */
    static sc(value: string): string;
    /**
     * @see PicoString.sc
     */
    static snakecase: typeof PicoString.sc;
    /**
     * Convert to PascalCase
     *
     * @example Str.pc("hello-world") // => "HelloWorld"
     *
     * @param {string} value Input string
     * @returns {string} PascalCase string
     */
    static pc(value: string): string;
    /**
     * @see PicoString.pc
     */
    static pascalcase: typeof PicoString.pc;
    /**
     * Check if string contains value
     *
     * @example Str.has("abc", "b") // => true
     *
     * @param {string} value Input string
     * @param {string} search Search string
     * @returns {boolean} True if found
     */
    static has(value: string, search: string): boolean;
    /**
     * Get index range of search
     *
     * @example Str.range("abc", "b") // => [1, 2]
     *
     * @param {any} value Input string
     * @param {string} search Search string
     * @param {any} [fallback] Fallback value
     * @returns {Array<number>|any} Index range
     */
    static range(value: any, search: string, fallback?: any): Array<number> | any;
    /**
     * Extract substring by range
     *
     * @example Str.slice("abc", 1, 2) // => "b"
     *
     * @param {any} value Input string
     * @param {number} start Start index
     * @param {number} limit End index
     * @returns {string} Sliced string
     */
    static slice(value: any, start: number, limit: number): string;
    /**
     * Get string representation
     *
     * @example Str.string("<b>a</b>") // => "a"
     *
     * @param {any} value Input value
     * @param {any} [empty] Empty fallback
     * @param {boolean} [html] Keep HTML
     * @returns {string} String value
     */
    static string(value: any, empty?: any, html?: boolean): string;
    /**
     * Get boolean representation
     *
     * @example Str.boolean(true) // => "Yes"
     *
     * @param {any} value Input value
     * @param {string} [yes] True string
     * @param {string} [no] False string
     * @param {any} [empty] Empty fallback
     * @returns {string|any} Boolean string
     */
    static boolean(value: any, yes?: string, no?: string, empty?: any): string | any;
    /**
     * Get formatted number
     *
     * @example Str.number(1234.56, 1) // => "1,234.6"
     *
     * @param {any} value Input value
     * @param {number} [fixed] Decimal points
     * @param {string} [locale] Locale code
     * @param {any} [config] Format config
     * @returns {string|any} Formatted string
     */
    static number(value: any, fixed?: number, locale?: string, config?: any): string | any;
    /**
     * Get formatted integer
     *
     * @example Str.integer(1, 2) // => "01"
     *
     * @param {any} value Input value
     * @param {number} [leading] Leading zeros
     * @param {string} [padding] Padding char
     * @returns {string|any} Formatted string
     */
    static integer(value: any, leading?: number, padding?: string): string | any;
    /**
     * Get formatted datetime
     *
     * @example Str.datetime("2026-01-01", "DD.MM.YYYY")
     *
     * @param {any} value Input value
     * @param {string} [format] Output format
     * @param {any} [empty] Empty fallback
     * @returns {string} Formatted string
     */
    static datetime(value: any, format?: string, empty?: any): string;
    /**
     * Get formatted date
     *
     * @example Str.date("2026-01-01", "DD.MM.YYYY")
     *
     * @param {any} value Input value
     * @param {string} [format] Output format
     * @param {any} [empty] Empty fallback
     * @returns {string} Formatted string
     */
    static date(value: any, format?: string, empty?: any): string;
    /**
     * Get formatted time
     *
     * @example Str.time("12:00:00", "HH:mm")
     *
     * @param {any} value Input value
     * @param {string} [format] Output format
     * @param {any} [empty] Empty fallback
     * @returns {string} Formatted string
     */
    static time(value: any, format?: string, empty?: any): string;
    /**
     * Parse string to object
     *
     * @example Str.objectify("a: 1;") // => { a: 1 }
     *
     * @param {any} value Input string
     * @param {string} [mode] Parse mode
     * @param {boolean} [toarray] Return array
     * @returns {any} Parsed value
     */
    static objectify(value: any, mode?: string, toarray?: boolean): any;
    /**
     * Cast object to string
     *
     * @example Str.stringify({ a: 1 }) // => "a: 1;"
     *
     * @param {any} value Input value
     * @param {string} [mode] Cast mode
     * @returns {string} Casted string
     */
    static stringify(value: any, mode?: string): string;
}
export namespace PicoString {
    /**
     * @see PicoStr.regex
     */
    function regexEscape(...args: any[]): string;
    /**
     * @see PicoStr.pascalcase
     */
    function humancase(...args: any[]): string;
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
