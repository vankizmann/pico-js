import { Arr } from "../index.esm.ts";

export const SLUG_CONVERT : any[] = [
    ['à', 'a'],
    ['á', 'a'],
    ['â', 'a'],
    ['è', 'e'],
    ['é', 'e'],
    ['ê', 'e'],
    ['ì', 'i'],
    ['í', 'i'],
    ['ï', 'i'],
    ['î', 'i'],
    ['ò', 'o'],
    ['ó', 'o'],
    ['ô', 'o'],
    ['ù', 'u'],
    ['ú', 'u'],
    ['û', 'u'],
    ['ñ', 'n'],
    ['ç', 'c'],
    ['.', '-'],
    ['·', '-'],
    ['/', '-'],
    ['_', '-'],
    [',', '-'],
    [':', '-'],
    [';', '-'],
    ['ä', 'ae'],
    ['ö', 'oe'],
    ['ü', 'ue'],
    ['ß', 'ss'],
];

export interface PicoFormatUrl
{
    //
}

export class PicoFormatUrl
{
    /**
     * Create slug from string
     *
     * @example Format.slugify("Hello World") // => "hello-world"
     *
     * @param {any} value Input string
     * @returns {string} Slug string
     */
    static slugify(value : any) : string
    {
        value = String(value).replace(/(^\s+|\s+$)/g, '')
            .toLowerCase();

        Arr.each(SLUG_CONVERT, (v) => {
            value = value.replaceAll(v[0], v[1]);
        });

        return value.replace(/[^a-z0-9-\s]+/g, '')
            .replace(/\s+/g, '-').replace(/-+/g, '-');
    }

}

export default PicoFormatUrl;