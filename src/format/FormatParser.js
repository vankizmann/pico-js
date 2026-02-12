import { Mix, Obj } from "#src/index.esm.js";

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

export const PicoFormatParserPlugin = function () {

    Obj.each(Mix.class(PicoFormatParserStatic), (fn, id) => {
        this[id] = fn;
    });

    return this;
}