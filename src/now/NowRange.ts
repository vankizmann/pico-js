import { Now, Arr } from "../index.esm.ts";
import { PicoNow, PicoNowInterface } from "../utils/Now.ts";

export interface PicoNowRange extends PicoNowInterface
{
    //
}

/**
 * @memberof PicoNow
 */
export class PicoNowRange
{

    /**
     * Get range of dates
     *
     * @example Now.range("2026-01-31", "day") // => [Now, Now, ...]
     *
     * @param {any} [value] End date
     * @param {string} [scope] Range scope
     * @returns {Array<PicoNow>} Array of dates
     */
    range(value:any = null, scope:string = 'date'):Array<PicoNow>
    {
        let format = 'YYYYMMDD';

        if ( /^months?$/.test(scope) ) {
            format = 'YYYYMM';
        }

        if ( /^years?$/.test(scope) ) {
            format = 'YYYY';
        }

        let range = [];

        let dates = [
            this.clone(), Now.make(value)
        ];

        if ( dates[0].afterDate(dates[1]) ) {
            dates = dates.reverse();
        }

        dates[1].add(1, scope);

        for ( let day = dates[0]; ! day.equal(dates[1], format); day = day.next(scope) ) {
            Arr.append(range, day);
        }

        return range;
    }

}

// @ts-ignore
PicoNowRange.prototype.getDatesRange = function (...args:Parameters<typeof PicoNowRange.range>) {
    console.warn('Now.getDatesRange() is deprecated, use Now.range() instead.');
    return this.range(...args);
}

export default PicoNowRange;