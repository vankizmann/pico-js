import { Arr, Locale, Mix, Num, Obj, Str } from "../index.esm.js";
import { PicoNow } from "../utils/Now.js";

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
    /**
     * Get human readable value
     *
     * @example Now.human("day") // => "Monday"
     *
     * @param {string} [scope] Value scope
     * @param {number} [substr] Substring length
     * @returns {string|number} Human value
     */
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

    /**
     * Get human readable day
     *
     * @example Now.getHumanDay(3) // => "Mon"
     *
     * @param {number} [substr] Substring length
     * @returns {string} Day name
     */
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

    /**
     * Get human readable month
     *
     * @example Now.getHumanMonth(3) // => "Jan"
     *
     * @param {number} [substr] Substring length
     * @returns {string} Month name
     */
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

/**
 * @param {typeof PicoNow} self
 * @returns {typeof PicoNow}
 */
export const PicoNowHumanPlugin = function (self) {

    Obj.each(Mix.proto(PicoNowHumanInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    return self;
}