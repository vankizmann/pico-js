import { Str, Arr, Obj, Num, Any, Event } from "../index";

export class Cookie
{
    /**
     * Pattern to get the cookie desired
     *
     * @type {string}
     */
    static pattern = '(^|;)\\s*{key}\\s*=\\s*([^;]+)';

    /**
     * Get cookie from current session
     *
     * @param {string} key
     * @param {*} fallback
     * @param {'string','boolean','float','integer','object','array'} decode
     * @returns {*}
     */
    static get(key, fallback = null, decode = 'string')
    {
        let pattern = this.pattern
            .replace('{key}', key);

        let result = document.cookie
            .match(pattern);

        if ( ! result ) {
            return fallback;
        }

        let plain = result[2].replace(/\{:\}/g, ';');

        if ( decode === 'boolean' ) {
            return Any.boolean(plain);
        }

        if ( decode === 'float' ) {
            return Any.float(plain);
        }

        if ( decode === 'integer' ) {
            return Any.integer(plain);
        }

        if ( decode === 'object' ) {
            return Str.objectify(plain, 'params', false);
        }

        if ( decode === 'array' ) {
            return Str.objectify(plain, 'params', true);
        }

        return plain;
    }

    /**
     * Set cookie in current session
     *
     * @param {string} key
     * @param {*} value
     * @param {integer} expire
     * @param {object} options
     */
    static set(key, value, expire = null, options = {})
    {
        let date = new Date;

        if ( expire !== null ) {
            date.setTime(Date.now() + (expire || 0));
        }

        if ( Date.now() !== date.getTime() ) {
            options.expires = date.toUTCString();
        }

        if ( ! options.path ) {
            options.path = '/';
        }

        if ( Any.isObject(value) ) {
            value = Str.stringify(value, 'params');
        }

        if ( Any.isString(value) ) {
            value = value.replace(/;/g, '{:}');
        }

        let plain = `${key}=${value};`;

        Obj.each(options, (value, key) => {
            plain += `${key}=${value};`;
        });

        document.cookie = plain;
    }

    /**
     * Forget cookie from current session
     *
     * @param {string} key
     * @param {object} options
     */
    static forget(key, options = {})
    {
        if ( ! options.path ) {
            options.path = '/';
        }

        options.expires = 'Thu, 01 Jan 1970 00:00:01 GMT';

        let plain = `${key}=null;`;

        Obj.each(options, (value, key) => {
            plain += `${key}=${value};`;
        });

        document.cookie = plain;
    }

}

export default Cookie;
