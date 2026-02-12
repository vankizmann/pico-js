import { Mix, Now, Obj } from "#src/index.esm.js";

/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowWalkerInstance
{

    /**
     * Get previous date by scope
     *
     * @example Now.prev("day") // => Now
     *
     * @param {string} [scope] Target scope
     * @returns {PicoNow} New instance
     */
    prev(scope = 'date')
    {
        if ( /^days?$/i.test(scope) ) {
            scope = 'date';
        }

        if ( /^decades?$/i.test(scope) ) {
            return this.clone().sub(10, 'year');
        }

        return this.clone().sub(1, scope);
    }

    /**
     * Get next date by scope
     *
     * @example Now.next("day") // => Now
     *
     * @param {string} [scope] Target scope
     * @returns {PicoNow} New instance
     */
    next(scope = 'day')
    {
        if ( /^days?$/i.test(scope) ) {
            scope = 'date';
        }

        if ( /^decades?$/i.test(scope) ) {
            return this.clone().add(10, 'year');
        }

        return this.clone().add(1, scope);
    }

    /**
     * Get previous second
     *
     * @example Now.prevSecond()
     *
     * @returns {PicoNow} New instance
     */
    prevSecond()
    {
        return this.prev('second');
    }

    /**
     * Get next second
     *
     * @example Now.nextSecond()
     *
     * @returns {PicoNow} New instance
     */
    nextSecond()
    {
        return this.next('second');
    }

    /**
     * Get previous minute
     *
     * @example Now.prevMinute()
     *
     * @returns {PicoNow} New instance
     */
    prevMinute()
    {
        return this.prev('minute');
    }

    /**
     * Get next minute
     *
     * @example Now.nextMinute()
     *
     * @returns {PicoNow} New instance
     */
    nextMinute()
    {
        return this.next('minute');
    }

    /**
     * Get previous hour
     *
     * @example Now.prevHour()
     *
     * @returns {PicoNow} New instance
     */
    prevHour()
    {
        return this.prev('hour');
    }

    /**
     * Get next hour
     *
     * @example Now.nextHour()
     *
     * @returns {PicoNow} New instance
     */
    nextHour()
    {
        return this.next('hour');
    }

    /**
     * Get previous date
     *
     * @example Now.prevDate()
     *
     * @returns {PicoNow} New instance
     */
    prevDate()
    {
        return this.prev('date');
    }

    /**
     * Get next date
     *
     * @example Now.nextDate()
     *
     * @returns {PicoNow} New instance
     */
    nextDate()
    {
        return this.next('date');
    }

    /**
     * Get previous month
     *
     * @example Now.prevMonth()
     *
     * @returns {PicoNow} New instance
     */
    prevMonth()
    {
        return this.prev('month');
    }

    /**
     * Get next month
     *
     * @example Now.nextMonth()
     *
     * @returns {PicoNow} New instance
     */
    nextMonth()
    {
        return this.next('month');
    }

    /**
     * Get previous year
     *
     * @example Now.prevYear()
     *
     * @returns {PicoNow} New instance
     */
    prevYear()
    {
        return this.prev('year');
    }

    /**
     * Get next year
     *
     * @example Now.nextYear()
     *
     * @returns {PicoNow} New instance
     */
    nextYear()
    {
        return this.next('year');
    }

    /**
     * Get previous decade
     *
     * @example Now.prevDecade()
     *
     * @returns {PicoNow} New instance
     */
    prevDecade()
    {
        return this.prev('decade');
    }

    /**
     * Get next decade
     *
     * @example Now.nextDecade()
     *
     * @returns {PicoNow} New instance
     */
    nextDecade()
    {
        return this.next('decade');
    }

    /**
     * Get start of scope
     *
     * @example Now.first("month")
     *
     * @param {string} [scope] Target scope
     * @returns {PicoNow} New instance
     */
    first(scope = 'date')
    {
        if ( /^seconds?$/i.test(scope) ) {
            return this.firstSecond();
        }

        if ( /^minutes?$/i.test(scope) ) {
            return this.firstMinute();
        }

        if ( /^hours?$/i.test(scope) ) {
            return this.firstHour();
        }

        if ( /^days?$/i.test(scope) ) {
            return this.firstDay();
        }

        if ( /^dates?$/i.test(scope) ) {
            return this.firstDate();
        }

        if ( /^months?$/i.test(scope) ) {
            return this.firstMonth();
        }

        if ( /^years?$/i.test(scope) ) {
            return this.firstYear();
        }

        if ( /^decades?$/i.test(scope) ) {
            return this.firstDecade();
        }

        throw new Error(`Invalid first scope type "${scope}".`);
    }

    /**
     * Get end of scope
     *
     * @example Now.last("month")
     *
     * @param {string} [scope] Target scope
     * @returns {PicoNow} New instance
     */
    last(scope = 'date')
    {
        if ( /^seconds?$/i.test(scope) ) {
            return this.lastSecond();
        }

        if ( /^minutes?$/i.test(scope) ) {
            return this.lastMinute();
        }

        if ( /^hours?$/i.test(scope) ) {
            return this.lastHour();
        }

        if ( /^days?$/i.test(scope) ) {
            return this.lastDay();
        }

        if ( /^dates?$/i.test(scope) ) {
            return this.lastDate();
        }

        if ( /^months?$/i.test(scope) ) {
            return this.lastMonth();
        }

        if ( /^years?$/i.test(scope) ) {
            return this.lastYear();
        }

        if ( /^decades?$/i.test(scope) ) {
            return this.lastDecade();
        }

        throw new Error(`Invalid last scope type "${scope}".`);
    }

    /**
     * Get start of second
     *
     * @example Now.firstSecond()
     *
     * @returns {PicoNow} New instance
     */
    firstSecond()
    {
        return this.clone().set(0, 'second');
    }

    /**
     * Get end of second
     *
     * @example Now.lastSecond()
     *
     * @returns {PicoNow} New instance
     */
    lastSecond()
    {
        return this.clone().set(59, 'second');
    }

    /**
     * Get start of minute
     *
     * @example Now.firstMinute()
     *
     * @returns {PicoNow} New instance
     */
    firstMinute()
    {
        return this.clone().set(0, 'minute');
    }

    /**
     * Get end of minute
     *
     * @example Now.lastMinute()
     *
     * @returns {PicoNow} New instance
     */
    lastMinute()
    {
        return this.clone().set(59, 'minute');
    }

    /**
     * Get start of hour
     *
     * @example Now.firstHour()
     *
     * @returns {PicoNow} New instance
     */
    firstHour()
    {
        return this.clone().set(0, 'hour');
    }

    /**
     * Get end of hour
     *
     * @example Now.lastHour()
     *
     * @returns {PicoNow} New instance
     */
    lastHour()
    {
        return this.clone().set(23, 'hour');
    }

    /**
     * Get start of day
     *
     * @example Now.firstDay()
     *
     * @returns {PicoNow} New instance
     */
    firstDay()
    {
        return this.clone().set(0, 'day');
    }

    /**
     * Get end of day
     *
     * @example Now.lastDay()
     *
     * @returns {PicoNow} New instance
     */
    lastDay()
    {
        return this.clone().set(6, 'day');
    }

    /**
     * Get start of month date
     *
     * @example Now.firstDate()
     *
     * @returns {PicoNow} New instance
     */
    firstDate()
    {
        return this.clone().set(1, 'date');
    }

    /**
     * Get end of month date
     *
     * @example Now.lastDate()
     *
     * @returns {PicoNow} New instance
     */
    lastDate()
    {
        return this.clone().next('month').set(0, 'date');
    }

    /**
     * Get start of year month
     *
     * @example Now.firstMonth()
     *
     * @returns {PicoNow} New instance
     */
    firstMonth()
    {
        return this.clone().set(1, 'month');
    }

    /**
     * Get end of year month
     *
     * @example Now.lastMonth()
     *
     * @returns {PicoNow} New instance
     */
    lastMonth()
    {
        return this.clone().set(12, 'month');
    }

    /**
     * Get nth year of decade
     *
     * @example Now.nthYear(5)
     *
     * @param {number} [n] Year index
     * @returns {PicoNow} New instance
     */
    nthYear(n = 0)
    {
        let year = Math.floor(this.year() / 10) * 10;

        return this.clone().set(year + n, 'year');
    }

    /**
     * Get first year of decade
     *
     * @example Now.firstYear()
     *
     * @returns {PicoNow} New instance
     */
    firstYear()
    {
        return this.nthYear(0);
    }

    /**
     * Get last year of decade
     *
     * @example Now.lastYear()
     *
     * @returns {PicoNow} New instance
     */
    lastYear()
    {
        return this.nthYear(9);
    }

    /**
     * Get nth decade of century
     *
     * @example Now.nthDecade(5)
     *
     * @param {number} [n] Decade index
     * @returns {PicoNow} New instance
     */
    nthDecade(n = 0)
    {
        let year = Math.floor(this.year() / 100) * 100;

        return this.clone().set(year + (n * 10), 'year');
    }

    /**
     * Get first decade of century
     *
     * @example Now.firstDecade()
     *
     * @returns {PicoNow} New instance
     */
    firstDecade()
    {
        return this.nthDecade(0);
    }

    /**
     * Get last decade of century
     *
     * @example Now.lastDecade()
     *
     * @returns {PicoNow} New instance
     */
    lastDecade()
    {
        return this.nthDecade(9);
    }

}

/**
 * @returns {typeof import('#src/utils/Now.js').PicoNow}
 */
export const PicoNowWalkerPlugin = function (self) {

    Obj.each(Mix.proto(PicoNowWalkerInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    return self;
}