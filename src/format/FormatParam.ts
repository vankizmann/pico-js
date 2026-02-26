import { Arr, Mix, Obj, For } from "../index.esm.ts";
import { PicoFormat } from "../utils/Format.ts";

export const PARAM_REGEX = {
    entry: /(?<=^|&|\?)(\s*(?<key>.*?)\s*=\s*(?<val>".*?"|'.*?'|.*?)\s*)(?=&|$)/g
};

export interface PicoFormatParam
{
    //
}

export class PicoFormatParam
{
    /**
     * Cast object to params string
     *
     * @example Format.castParams({ a: 1 }) // => "a=1"
     *
     * @param {any} [params] Input params
     * @returns {string} Params string
     */
    static castParams(params : any = {}) : string
    {
        if ( Mix.isEmpty(params) ) {
            return '';
        }

        let result = Arr.each(params, (val : any, key : any) => {
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
    static castParam(key : string, value : any, path : string = null) : string
    {
        if ( path != null ) {
            key = path + '[' + key + ']';
        }

        if ( !Mix.isRef(value) ) {
            return Mix.str(key) + '=' + For.casted(value, true);
        }

        let result = Arr.each(value, (v : any, k : any) => {
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
    static parseParams(value : string) : any
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

        return Arr.reduce(Array.from(matches), (result : any, { groups }) => {
            return Obj.set(result, key(groups.key), val(groups.val));
        }, {});
    }

}

export default PicoFormatParam;