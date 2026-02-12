import { Arr, Mix, Obj } from "#src/index.esm.js";

export const SLUG_CONVERT = [
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

/**
 * @memberof PicoFormat
 * @extends {PicoFormat}
 */
export class PicoFormatUrlStatic
{

    static slugify(value)
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

export const PicoFormatUrlPlugin = function () {

    Obj.each(Mix.class(PicoFormatUrlStatic), (fn, id) => {
        this[id] = fn;
    });

    return this;
}