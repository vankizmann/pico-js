export namespace COOKIE_REGEX {
    let entry: RegExp;
}
export class PicoCookie {
    static $cookie: any;
    /**
     * Read raw document.cookie
     *
     * @example Cookie.global() // => "a=b; c=d"
     *
     * @returns {string} Cookie string
     */
    static global(): string;
    /**
     * Parse cookies into object
     *
     * @example Cookie.parse() // => {a:"b"}
     * @example Cookie.parse(true) // force parse
     *
     * @param {boolean} [fresh] Force refresh
     * @returns {Record<string, any>} Cookie map
     */
    static parse(fresh?: boolean): Record<string, any>;
    /**
     * Get cookie value by key
     *
     * @example Cookie.get("foo") // => "bar"
     * @example Cookie.get("x", null, "bool") // => true
     *
     * @param {string} key Cookie key
     * @param {any} [fallback] Fallback value
     * @param {string} [decode] Decode mode
     * @returns {any} Cookie value
     */
    static get(key: string, fallback?: any, decode?: string): any;
    /**
     * Set cookie value with options
     *
     * @example Cookie.set("a", "b") // => Cookie
     * @example Cookie.set("a", {x:1}) // => Cookie
     *
     * @param {string} key Cookie key
     * @param {any} value Cookie value
     * @param {any} [expire] Expire date spec
     * @param {any} [options] Cookie options
     * @returns {typeof PicoCookie} Cookie class
     */
    static set(key: string, value: any, expire?: any, options?: any): typeof PicoCookie;
    /**
     * Remove cookie by key
     *
     * @example Cookie.forget("a") // => Cookie
     *
     * @param {string} key Cookie key
     * @param {any} [options] Cookie options
     * @returns {typeof PicoCookie} Cookie class
     */
    static forget(key: string, options?: any): typeof PicoCookie;
}
export default PicoCookie;
