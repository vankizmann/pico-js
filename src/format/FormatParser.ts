import { Mix } from "../index.esm.ts";

export const TYPE_PARSERS : any[] = [
    { // null
        match: (val : any) => {
            return /^(null|undefined)$/i.test(val);
        },
        parse: (val : any) => {
            return Mix.null(val);
        }
    },
    { // boolean
        match: (val : any) => {
            return /^(true|false|yes|no)$/i.test(val);
        },
        parse: (val : any) => {
            return Mix.bool(val);
        }
    },
    { // integer
        match: (val : any) => {
            return /^-?[0-9]+$/.test(val);
        },
        parse: (val : any) => {
            return Mix.int(val);
        }
    },
    { // number
        match: (val : any) => {
            return /^-?[0-9]+\.[0-9]+$/.test(val);
        },
        parse: (val : any) => {
            return Mix.num(val);
        }
    },
    { // array
        match: (val : any) => {
            return /^[{\[].*?[}\]]$/.test(val);
        },
        parse: (val : any) => {
            return JSON.parse(val);
        }
    },
];

export const TYPE_CASTERS : any[] = [
    { // array
        match: (val : any) => {
            return Mix.isArr(val);
        },
        parse: (val : any) => {
            return JSON.stringify(val);
        }
    }
];

export interface PicoFormatParser
{
    //
}

export class PicoFormatParser
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
    static keyed(value : any, fallback : any = null) : string
    {
        if ( !Mix.isStr(value) ) {
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
     * @param {any[]} [parsers] Custom parsers
     * @returns {any} Parsed value
     */
    static parsed(value : any, fallback : any = null, parsers : any[] = []) : any
    {
        if ( !Mix.isStr(value) ) {
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
     * @param {any[]} [casters] Custom casters
     * @returns {string} Casted string
     */
    static casted(value : any, encode : boolean = false, casters : any[] = []) : string
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

export default PicoFormatParser;