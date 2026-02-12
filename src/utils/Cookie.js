import { For, Arr, Now, Mix } from "../index.esm.js";

export const COOKIE_REGEX = {
    entry: /(?<=^|;)\s*(?<key>.*?)\s*=\s*(?<value>[^;$]+)/g
};

export class PicoCookie
{
    static $cookie = null;

    /**
     * Read raw document.cookie
     *
     * @example Cookie.global() // => "a=b; c=d"
     *
     * @returns {string} Cookie string
     */
    static global()
    {
        if ( globalThis.document == null ) {
            return '';
        }

        return globalThis.document.cookie || '';
    }

    /**
     * Parse cookies into object
     *
     * @example Cookie.parse() // => {a:"b"}
     * @example Cookie.parse(true) // force parse
     *
     * @param {boolean} [fresh] Force refresh
     * @returns {Record<string, any>} Cookie map
     */
    static parse(fresh = false)
    {
        if ( !fresh && this.$cookie ) {
            return this.$cookie;
        }

        this.$cookie = {};

        let matches = this.global().matchAll(...[
            COOKIE_REGEX.entry
        ]);

        if ( matches == null ) {
            return this.$cookie;
        }

        let fn = (value) => {
            return value.replaceAll('{:}', ';');
        }

        Arr.each(Array.from(matches), ({ groups }) => {
            this.$cookie[groups.key] = fn(groups.value);
        });

        return this.$cookie;
    }

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
    static get(key, fallback = null, decode = 'string')
    {
        if ( !this.$cookie ) {
            this.parse();
        }

        if ( this.$cookie[key] == null ) {
            return fallback;
        }

        if ( /^bool(ean)?$/.test(decode) ) {
            return Mix.bool(this.$cookie[key]);
        }

        if ( /^num(ber)?$/.test(decode) ) {
            return Mix.bool(this.$cookie[key]);
        }

        if ( /^int(eger)?$/.test(decode) ) {
            return Mix.bool(this.$cookie[key]);
        }

        if ( /^obj(ext)?$/.test(decode) ) {
            return For.parseOptions(this.$cookie[key]);
        }

        return Mix.str(this.$cookie[key]);
    }

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
    static set(key, value, expire = null, options = {})
    {
        if ( !this.$cookie ) {
            this.parse();
        }

        if ( !(expire instanceof Now) ) {
            expire = Now.make(expire || '+7 days');
        }

        options = {
            expires: expire.toUTC(), path: '/', ...options
        };

        if ( Mix.isRef(value) ) {
            value = For.castOptions(value, false);
        }

        if ( value != null ) {
            this.$cookie[key] = value;
        }

        let plain = key + '=' + value.replaceAll(...[
            ';', '{:}'
        ]);

        Arr.each(options, (value, key) => {
            plain += `;${key}=${value}`;
        });

        globalThis.document.cookie = plain;

        return this;
    }

    /**
     * Remove cookie by key
     *
     * @example Cookie.forget("a") // => Cookie
     *
     * @param {string} key Cookie key
     * @param {any} [options] Cookie options
     * @returns {typeof PicoCookie} Cookie class
     */
    static forget(key, options = {})
    {
        let expires = 'Thu, 01 Jan 1970 00:00:01 GMT';

        options = {
            expires, path: '/', ...options
        };

        if ( this.$cookie[key] ) {
            delete this.$cookie[key];
        }

        let plain = `${key}=null`;

        Arr.each(options, (value, key) => {
            plain += `;${key}=${value}`;
        });

        globalThis.document.cookie = plain;

        return this;
    }

}

export default PicoCookie;