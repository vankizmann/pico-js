import { Arr, Mix, Obj, For } from "#src/index.esm.js";

export const PARAM_REGEX = {
    entry: /(?<=^|&|\?)(\s*(?<key>.*?)\s*=\s*(?<val>".*?"|'.*?'|.*?)\s*)(?=&|$)/g
};

/**
 * @memberof PicoFormat
 * @extends {PicoFormat}
 */
export class PicoFormatParamStatic
{

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

export const PicoFormatParamPlugin = function () {

    Obj.each(Mix.class(PicoFormatParamStatic), (fn, id) => {
        this[id] = fn;
    });

    return this;
}