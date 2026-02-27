import { Arr, For, Mix, Obj } from "../index.esm.ts";

export const OPTION_REGEX = {
    entry: /(^|;)(\s*(?<key>.*?)\s*:\s*(?<val>".*?"|'.*?'|.*?)\s*)(?=;|$)/g
};

export interface PicoFormatOption
{
    //
}

export class PicoFormatOption
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
    static castOptions(options : any = {}, space : boolean = true) : string
    {
        if ( Mix.isEmpty(options) ) {
            return '';
        }

        let result = Arr.each(options, (val : any, key : any) => {
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
    static castOption(key : string, value : any, path : string = null, space : boolean = true) : string
    {
        if ( path != null ) {
            key = path + '.' + key;
        }

        let div = space ? ': ' : ':';

        if ( !Mix.isObj(value) ) {
            return Mix.str(key) + div + For.casted(value, false);
        }

        let result = Arr.map(value, (v : any, k : any) => {
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
    static parseOptions(value : string) : any
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

        return Arr.reduce(Array.from(matches), (result : any, { groups }) => {
            return Obj.set(result, key(groups.key), val(groups.val));
        }, {});
    }

}

export default PicoFormatOption;