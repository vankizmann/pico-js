import { Arr, Mix, Obj, For } from "../index.esm.js";
import { PicoFormat } from "../utils/Format.js";

export const PARAM_REGEX = {
    entry: /(?<=^|&|\?)(\s*(?<key>.*?)\s*=\s*(?<val>".*?"|'.*?'|.*?)\s*)(?=&|$)/g
};

/**
 * @memberof PicoFormat
 * @extends {PicoFormat}
 */
export class PicoFormatParamStatic
{

    /**
     * Cast object to params string
     *
     * @example Format.castParams({ a: 1 }) // => "a=1"
     *
     * @param {any} [params] Input params
     * @returns {string} Params string
     */
    static castParams(params = {})
    {
        if ( Mix.isEmpty(params) ) {
            return '';
        }

        let result = Arr.each(params, (val, key) => {
            return this.castParam(key, val);
        });

        return result.join('&');
    }

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
    static castParam(key, value, path = null)
    {
        if ( path != null ) {
            key = path + '[' + key + ']';
        }

        if ( !Mix.isRef(value) ) {
            return Mix.str(key) + '=' + For.casted(value, true);
        }

        let result = Arr.each(value, (v, k) => {
            return this.castParam(Mix.isArr(value) ? '' : k, v, key);
        });

        return result.join('&');
    }

    /**
     * Parse params string
     *
     * @example Format.parseParams("a=1") // => { a: 1 }
     *
     * @param {string} value Params string
     * @returns {any} Params object
     */
    static parseParams(value)
    {
        if ( Mix.isEmpty(value) ) {
            return {};
        }

        value = decodeURIComponent(value);

        let matches = value.matchAll(...[
            PARAM_REGEX.entry
        ]);

        if ( matches == null ) {
            return {};
        }

        const [key, val] = [
            For.keyed, For.parsed
        ];

        return Arr.reduce(Array.from(matches), (result, { groups }) => {
            return Obj.set(result, key(groups.key), val(groups.val));
        }, {});
    }

}

/**
 * @param {typeof PicoFormat} self
 * @returns {typeof PicoFormat}
 */
export const PicoFormatParamPlugin = function (self) {

    Obj.each(Mix.class(PicoFormatParamStatic), (fn, id) => {
        self[id] = fn;
    });

    return self;
}