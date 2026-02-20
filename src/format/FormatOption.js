import { Arr, For, Mix, Obj } from "../index.esm.js";
import { PicoFormat } from "../utils/Format.js";

export const OPTION_REGEX = {
    entry: /(^|;)(\s*(?<key>.*?)\s*:\s*(?<val>".*?"|'.*?'|.*?)\s*)(?=;|$)/g
};

/**
 * @memberof PicoFormat
 */
export class PicoFormatOptionStatic
{

    /**
     * Cast object to options string
     *
     * @example Format.castOptions({ a: 1 }) // => "a: 1;"
     *
     * @param {any} [options] Input options
     * @param {boolean} [space] Add space
     * @returns {string} Options string
     */
    static castOptions(options = {}, space = true)
    {
        if ( Mix.isEmpty(options) ) {
            return '';
        }

        let result = Arr.each(options, (val, key) => {
            return this.castOption(key, val, null, space);
        });

        return result.join(space ? '; ' : ';') + ';';
    }

    /**
     * Cast single option to string
     *
     * @example Format.castOption("a", 1) // => "a: 1"
     *
     * @param {string} key Option key
     * @param {any} value Option value
     * @param {string} [path] Key path
     * @param {boolean} [space] Add space
     * @returns {string} Option string
     */
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
            return this.castOption(k, v, key, space);
        });

        return result.join(space ? '; ' : ';');
    }

    /**
     * Parse options string
     *
     * @example Format.parseOptions("a: 1;") // => { a: 1 }
     *
     * @param {string} value Options string
     * @returns {any} Options object
     */
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

/**
 * @param {typeof PicoFormat} self
 * @returns {typeof PicoFormat}
 */
export const PicoFormatOptionPlugin = function (self) {

    Obj.each(Mix.class(PicoFormatOptionStatic), (fn, id) => {
        self[id] = fn;
    });

    return self;
}