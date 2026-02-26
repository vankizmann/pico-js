import { Mix, Obj, Num } from "../index.esm.ts";
import { PicoFormat } from "../utils/Format.ts";

export const FILE_UNITS = [
    'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'
];

export interface PicoFormatFile
{
    //
}

export class PicoFormatFile
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
    static filesize(value : any, decimals : number = 1) : string
    {
        if ( !Mix.isNum(value) ) {
            value = Mix.num(value, 0);
        }

        let fn = (i : any) => {
            return Num.fixed(value / Math.pow(1000, i), decimals);
        }

        for ( let i = 0; i < FILE_UNITS.length; i++ ) {
            if ( value <= Math.pow(1000, i + 1) ) {
                return fn(i) + ' ' + FILE_UNITS[i]
            }
        }

        return fn(FILE_UNITS.length);
    }

}

export default PicoFormatFile;