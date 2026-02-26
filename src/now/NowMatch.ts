import { Mix, Now, Obj } from "../index.esm.ts";
import { PicoNow, PicoNowInterface } from "../utils/Now.ts";
import PicoNowFormat from "./NowFormat.js";

export interface PicoNowMatch extends PicoNowInterface,
    PicoNowFormat
{
    //
}

/**
 * @memberof PicoNow
 */
export class PicoNowMatch
{
    /**
     * Check if date is before value
     *
     * @example Now.make("2026-01-01").before("2026-02-12") // => true
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if before
     */
    before(value : any = null, format : string = 'x') : boolean
    {
        return this.code(format) < Now.make(value).code(format);
    }

    /**
     * Check if date is before value date
     *
     * @example Now.make("2026-01-01").beforeDate("2026-02-12")
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if before
     */
    beforeDate(value : any = null, format : string = 'YYYYMMDD') : boolean
    {
        return this.before(value, format);
    }

    /**
     * Check if date is before value time
     *
     * @example Now.make("10:00:00").beforeTime("12:00:00")
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if before
     */
    beforeTime(value : any = null, format : string = 'HHmmss') : boolean
    {
        return this.before(value, format);
    }

    /**
     * Check if date is after value
     *
     * @example Now.make("2026-02-12").after("2026-01-01") // => true
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if after
     */
    after(value : any = null, format : string = 'x') : boolean
    {
        return this.code(format) > Now.make(value).code(format);
    }

    /**
     * Check if date is after value date
     *
     * @example Now.make("2026-02-12").afterDate("2026-01-01")
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if after
     */
    afterDate(value : any = null, format : string = 'YYYYMMDD') : boolean
    {
        return this.after(value, format);
    }

    /**
     * Check if date is after value time
     *
     * @example Now.make("12:00:00").afterTime("10:00:00")
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if after
     */
    afterTime(value : any = null, format : string = 'HHmmss') : boolean
    {
        return this.after(value, format);
    }

    /**
     * Check if date equals value
     *
     * @example Now.make("2026-01-01").equal("2026-01-01") // => true
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if equal
     */
    equal(value : any = null, format : string = 'x') : boolean
    {
        if ( !(value instanceof Now) ) {
            value = Now.make(value);
        }

        return this.code(format) === value.clone().code(format);
    }

    /**
     * Check if date equals value date
     *
     * @example Now.make("2026-01-01").equalDate("2026-01-01")
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if equal
     */
    equalDate(value : any = null, format : string = 'YYYYMMDD') : boolean
    {
        return this.equal(value, format);
    }

    /**
     * Check if date equals value time
     *
     * @example Now.make("12:00:00").equalTime("12:00:00")
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if equal
     */
    equalTime(value : any = null, format : string = 'HHmmss') : boolean
    {
        return this.equal(value, format);
    }

    /**
     * Check if date is between values
     *
     * @example Now.make("2026-01-15").between("2026-01-01", "2026-01-31")
     *
     * @param {any} [start] Start value
     * @param {any} [end] End value
     * @param {string} [format] Compare format
     * @returns {boolean} True if between
     */
    between(start : any = null, end : any = null, format : string = 'YYYYMMDD') : boolean
    {
        let dates = [
            Now.make(start), Now.make(end)
        ];

        if ( dates[0].after(dates[1], format) ) {
            dates = dates.reverse();
        }

        return this.after(dates[0], format) && this.before(dates[1], format);
    }

}

export default PicoNowMatch;