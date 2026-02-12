import { Mix, Obj, Num } from "../index.esm.js";
import { PicoFormat } from "../utils/Format.js";

export const FILE_UNITS = [
    'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'
];

/**
 * @memberof PicoFormat
 * @extends {PicoFormat}
 */
export class PicoFormatFileStatic
{

    /**
     * Format file size
     *
     * @example Format.filesize(1000) // => "1.0 KB"
     *
     * @param {any} value Bytes value
     * @param {number} [decimals] Decimal points
     * @returns {string} Formatted size
     */
    static filesize(value, decimals = 1)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value, 0);
        }

        let fn = (i) => {
            return Num.fixed(value / Math.pow(1000, i), decimals);
        }

        for ( let i = 0; i < FILE_UNITS.length; i++ ) {
            if ( value <= Math.pow(1000, i+1) ) {
                return fn(i) + ' ' + FILE_UNITS[i]
            }
        }

        return fn(FILE_UNITS.length);
    }

}

/**
 * @param {typeof PicoFormat} self
 * @returns {typeof PicoFormat}
 */
export const PicoFormatFilePlugin = function (self) {

    Obj.each(Mix.class(PicoFormatFileStatic), (fn, id) => {
        self[id] = fn;
    });

    return self;
}