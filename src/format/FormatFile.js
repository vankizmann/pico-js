import { Mix, Obj, Num } from "#src/index.esm.js";

export const FILE_UNITS = [
    'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'
];

/**
 * @memberof PicoFormat
 * @extends {PicoFormat}
 */
export class PicoFormatFileStatic
{

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

export const PicoFormatFilePlugin = function () {

    Obj.each(Mix.class(PicoFormatFileStatic), (fn, id) => {
        this[id] = fn;
    });

    return this;
}