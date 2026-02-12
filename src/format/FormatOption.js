import { Arr, For, Mix, Obj } from "#src/index.esm.js";

export const OPTION_REGEX = {
    entry: /(^|;)(\s*(?<key>.*?)\s*:\s*(?<val>".*?"|'.*?'|.*?)\s*)(?=;|$)/g
};

/**
 * @memberof PicoFormat
 */
export class PicoFormatOptionStatic
{

    static castOptions(options = {}, space = true)
    {
        if ( Mix.isEmpty(options) ) {
            return '';
        }

        let result = Arr.each(options, (val, key) => {
            return this.castOption(key, val, null, space);
        });

        return result.join(';') + ';';
    }

    static castOption(key, value, path = null, space = true)
    {
        if ( path != null ) {
            key = path + '.' + key;
        }

        let div = space ? ': ' : ':';

        if ( !Mix.isObj(value) ) {
            return Mix.str(key) + div + For.casted(value, false);
        }

        let result = Arr.map(value, (v, k) => {
            return this.castOption(k, v, key);
        });

        return result.join(';');
    }

    static parseOptions(value)
    {
        if ( Mix.isEmpty(value) ) {
            return {};
        }

        let matches = value.matchAll(...[
            OPTION_REGEX.entry
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

export const PicoFormatOptionPlugin = function () {

    Obj.each(Mix.class(PicoFormatOptionStatic), (fn, id) => {
        this[id] = fn;
    });

    return this;
}