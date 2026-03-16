import { Arr, Mix, Now, Obj, Str } from "../index.esm.ts";
import { PicoNow, PicoNowInterface } from "../utils/Now.ts";
import PicoNowDefault from "./NowDefault.ts";
import PicoNowFormat from "./NowFormat.ts";

export interface PicoNowDuration extends PicoNowInterface,
    PicoNowDefault,
    PicoNowFormat
{
    //
}

/**
 * @memberof PicoNow
 */
export class PicoNowDuration
{

    /**
     * Calculate duration between two dates
     *
     * @example Now.make("2026-01-01").duration("2026-02-01") // => { years: 0, months: 1, ... }
     *
     * @param {any} value End date
     * @returns {any} Duration object
     */
    duration(value : any) : any
    {
        if ( Mix.isNum(value) ) {
            value = this.clone().add(value, 'seconds');
        }

        const date = Now.make(value);

        const keys = [
            'years', 'months', 'dates', 'hours', 'minutes', 'seconds'
        ];

        let result : any = {};

        Arr.each(keys, (key : string) => {
            result[key] = date.get(key) - this.get(key);
        });

        const last = date.clone().sub(1, 'month')
            .last('date').date();

        if ( result.minutes && result.seconds < 0 ) {
            result.minutes -= 1, result.seconds += 60;
        }

        if ( result.hours && result.minutes < 0 ) {
            result.hours -= 1, result.minutes += 60;
        }

        if ( result.dates && result.hours < 0 ) {
            result.dates -= 1, result.hours += 24;
        }

        if ( result.months && result.dates < 0 ) {
            result.months -= 1, result.dates += last;
        }

        if ( result.years && result.months < 0 ) {
            result.years -= 1, result.months += 12;
        }

        return result;
    }

    /**
     * Normalize seconds into duration parts
     *
     * @example Now.make().safeDuration(3661) // => { dates: 0, hours: 1, minutes: 1, seconds: 1 }
     *
     * @param {number} value Seconds value
     * @returns {any} Duration object
     */
    safeDuration(value : number) : any
    {
        let result : any = {
            dates: 0,
            hours: 0,
            minutes: 0,
            seconds: Mix.int(value)
        };

        if ( result.seconds >= 60 ) {
            result.minutes = Math.floor(result.seconds / 60);
            result.seconds %= 60;
        }

        if ( result.minutes >= 60 ) {
            result.hours = Math.floor(result.minutes / 60);
            result.minutes %= 60;
        }

        if ( result.hours >= 24 ) {
            result.dates = Math.floor(result.hours / 24);
            result.hours %= 24;
        }

        return result;
    }

    /**
     * Get difference between two dates in seconds
     *
     * @example Now.make("2026-01-02").diffrence("2026-01-01") // => 86400
     *
     * @param {any} [value=null] Compare date
     * @returns {number} Seconds difference
     */
    diffrence(value : any = null) : number
    {
        return this.code('x') - Now.make(value).code('x');
    }

}


export default PicoNowDuration;