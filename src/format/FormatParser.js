import { Mix, Obj } from "../index.esm.js";
import { PicoFormat } from "../utils/Format.js";

export const TYPE_PARSERS = [
    { // null
        match: (val) => {
            return /^(null|undefined)$/i.test(val);
        },
        parse: (val) => {
            return Mix.null(val);
        }
    },
    { // boolean
        match: (val) => {
            return /^(true|false|yes|no)$/i.test(val);
        },
        parse: (val) => {
            return Mix.bool(val);
        }
    },
    { // integer
        match: (val) => {
            return /^-?[0-9]+$/.test(val);
        },
        parse: (val) => {
            return Mix.int(val);
        }
    },
    { // number
        match: (val) => {
            return /^-?[0-9]+\.[0-9]+$/.test(val);
        },
        parse: (val) => {
            return Mix.num(val);
        }
    },
    { // array
        match: (val) => {
            return /^[{\[].*?[}\]]$/.test(val);
        },
        parse: (val) => {
            return JSON.parse(val);
        }
    },
];

export const TYPE_CASTERS = [
    { // array
        match: (val) => {
            return Mix.isArr(val);
        },
        parse: (val) => {
            return JSON.stringify(val);
        }
    }
];

/**
 * @memberof PicoFormat
 */
export class PicoFormatParserStatic
{

    /**
     * Convert key path format
     *
     * @example Format.keyed("a[b]") // => "a.b"
     *
     * @param {any} value Input key
     * @param {any} [fallback] Fallback value
     * @returns {string} Keyed string
     */
    static keyed(value, fallback = null)
    {
        if ( ! Mix.isStr(value) ) {
            return fallback;
        }

        if ( value.indexOf('[') === -1 ) {
            return value;
        }

        return value.replace(/\[([^\]]+)\]/g, '.$1');
    }

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
    static parsed(value, fallback = null, parsers = [])
    {
        if ( ! Mix.isStr(value) ) {
            return fallback;
        }

        value = value.replace(/(^"|^'|'$|"$)/g, '');

        for ( let type of parsers ) {
            if ( type.match(value) ) return type.parse(value);
        }

        for ( let type of TYPE_PARSERS ) {
            if ( type.match(value) ) return type.parse(value);
        }

        return value;
    }

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
    static casted(value, encode = false, casters = [])
    {
        if ( encode ) {
            value = encodeURI(value);
        }

        if ( Mix.isStr(value) ) {
            return value;
        }

        for ( let type of casters ) {
            if ( type.match(value) ) return type.parse(value);
        }

        for ( let type of TYPE_CASTERS ) {
            if ( type.match(value) ) return type.parse(value);
        }

        return Mix.str(value);
    }
}

/**
 * @param {typeof PicoFormat} self
 * @returns {typeof PicoFormat}
 */
export const PicoFormatParserPlugin = function (self) {

    Obj.each(Mix.class(PicoFormatParserStatic), (fn, id) => {
        self[id] = fn;
    });

    return self;
}