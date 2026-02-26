import { Locale } from "../index.esm.ts";
import { PicoNowInterface } from "../utils/Now.ts";
import PicoNowDefault from "./NowDefault.js";

export const NOW_HUMAN_DAYS : string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export const NOW_HUMAN_MONTHS : string[] = [
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

export interface PicoNowHuman extends PicoNowInterface, PicoNowDefault
{
    //
}

export class PicoNowHuman
{
    /**
     * Get human readable value
     *
     * @example Now.human("day") // => "Monday"
     *
     * @param {string} [scope] Value scope
     * @param {number} [substr] Substring length
     * @returns {any} Human value
     */
    human(scope : string = 'day', substr : number = null) : any
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
    getHumanDay(substr : number = null) : string
    {
        let day = this.day() - 1;

        if ( !NOW_HUMAN_DAYS[day] ) {
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
    getHumanMonth(substr : number = null) : string
    {
        let month = this.day() - 1;

        if ( !NOW_HUMAN_MONTHS[month] ) {
            throw new Error(`Invalid month number "${month}".`);
        }

        let value = Locale.trans(NOW_HUMAN_MONTHS[month]);

        if ( substr != null ) {
            value = value.substring(0, substr);
        }

        return value;
    }

}

export default PicoNowHuman;