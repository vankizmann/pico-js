import { Mix, Now, Obj, Arr } from "#src/index.esm.js";

/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowRangeInstance
{

    range(value = null, scope = 'date')
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

PicoNowRangeInstance.prototype.getDatesRange = function (...args) {
    console.warn('NowRange.getDatesRange() is deprecated, use NowRange.range() instead.');
    return this.range(...args);
}

export const PicoNowRangePlugin = function () {

    Obj.each(Mix.proto(PicoNowRangeInstance), (fn, id) => {
        this.prototype[id] = fn;
    });

    return this;
}