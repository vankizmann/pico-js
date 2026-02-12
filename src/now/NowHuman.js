import { Arr, Locale, Mix, Num, Obj, Str } from "#src/index.esm.js";

export const NOW_HUMAN_DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export const NOW_HUMAN_MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowHumanInstance
{
    human(scope = 'day', substr = null)
    {
        if ( /^days?$/i.test(scope) ) {
            return this.getHumanDay(substr);
        }

        if ( /^months?$/i.test(scope) ) {
            return this.getHumanMonth(substr);
        }

        return this.get(scope);
    }

    getHumanDay(substr = null)
    {
        let day = this.day() - 1;

        if ( ! NOW_HUMAN_DAYS[day] ) {
            throw new Error(`Invalid day number "${day}".`);
        }

        let value = Locale.trans(NOW_HUMAN_DAYS[day]);

        if ( substr != null ) {
            value = value.substring(0, substr);
        }

        return value;
    }

    getHumanMonth(substr = null)
    {
        let month = this.day() - 1;

        if ( ! NOW_HUMAN_MONTHS[month] ) {
            throw new Error(`Invalid month number "${month}".`);
        }

        let value = Locale.trans(NOW_HUMAN_MONTHS[month]);

        if ( substr != null ) {
            value = value.substring(0, substr);
        }

        return value;
    }

}


export const PicoNowHumanPlugin = function () {

    Obj.each(Mix.proto(PicoNowHumanInstance), (fn, id) => {
        this.prototype[id] = fn;
    });

    return this;
}