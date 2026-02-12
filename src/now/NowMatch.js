import { Mix, Now, Obj } from "../index.esm.js";
import { PicoNow } from "../utils/Now.js";

/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowMatchInstance
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
    before(value = null, format = 'x')
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
    beforeDate(value = null, format = 'YYYYMMDD')
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
    beforeTime(value = null, format = 'HHmmss')
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
    after(value = null, format = 'x')
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
    afterDate(value = null, format = 'YYYYMMDD')
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
    afterTime(value = null, format = 'HHmmss')
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
    equal(value = null, format = 'x')
    {
        if ( ! (value instanceof Now) ) {
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
    equalDate(value = null, format = 'YYYYMMDD')
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
    equalTime(value = null, format = 'HHmmss')
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
    between(start = null, end = null, format = 'YYYYMMDD')
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

/**
 * @param {typeof PicoNow} self
 * @returns {typeof PicoNow}
 */
export const PicoNowMatchPlugin = function (self) {

    Obj.each(Mix.proto(PicoNowMatchInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    return self;
}