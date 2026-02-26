import { Mix, Now, Obj } from "../index.esm.ts";
import { PicoNow, PicoNowInterface } from "../utils/Now.ts";
import PicoNowDefault from "./NowDefault.js";

export interface PicoNowWalker extends PicoNowInterface,
    PicoNowDefault
{
    //
}

/**
 * @memberof PicoNow
 */
export class PicoNowWalker
{
    /**
     * Get previous date by scope
     *
     * @example Now.prev("day") // => Now
     *
     * @param {string} [scope] Target scope
     * @returns {PicoNow} New instance
     */
    prev(scope:string = 'date'): PicoNow
    {
        if ( /^days?$/i.test(scope) ) {
            scope = 'date';
        }

        if ( /^decades?$/i.test(scope) ) {
            return <PicoNow> <unknown> this.clone().sub(10, 'year');
        }

        return <PicoNow> <unknown> this.clone().sub(1, scope);
    }

    /**
     * Get next date by scope
     *
     * @example Now.next("day") // => Now
     *
     * @param {string} [scope] Target scope
     * @returns {PicoNow} New instance
     */
    next(scope:string = 'day'): PicoNow
    {
        if ( /^days?$/i.test(scope) ) {
            scope = 'date';
        }

        if ( /^decades?$/i.test(scope) ) {
            return <PicoNow> <unknown> this.clone().add(10, 'year');
        }

        return <PicoNow> <unknown> this.clone().add(1, scope);
    }

    /**
     * Get previous second
     *
     * @example Now.prevSecond()
     *
     * @returns {PicoNow} New instance
     */
    prevSecond(): PicoNow
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
    nextSecond(): PicoNow
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
    prevMinute(): PicoNow
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
    nextMinute(): PicoNow
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
    prevHour(): PicoNow
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
    nextHour(): PicoNow
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
    prevDate(): PicoNow
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
    nextDate(): PicoNow
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
    prevMonth(): PicoNow
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
    nextMonth(): PicoNow
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
    prevYear(): PicoNow
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
    nextYear(): PicoNow
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
    prevDecade(): PicoNow
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
    nextDecade(): PicoNow
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
    first(scope:string = 'date'): PicoNow
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
    last(scope:string = 'date'): PicoNow
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
    firstSecond(): PicoNow
    {
        return <PicoNow> <unknown> this.clone().set(0, 'second');
    }

    /**
     * Get end of second
     *
     * @example Now.lastSecond()
     *
     * @returns {PicoNow} New instance
     */
    lastSecond(): PicoNow
    {
        return <PicoNow> <unknown> this.clone().set(59, 'second');
    }

    /**
     * Get start of minute
     *
     * @example Now.firstMinute()
     *
     * @returns {PicoNow} New instance
     */
    firstMinute(): PicoNow
    {
        return <PicoNow> <unknown> this.clone().set(0, 'minute');
    }

    /**
     * Get end of minute
     *
     * @example Now.lastMinute()
     *
     * @returns {PicoNow} New instance
     */
    lastMinute(): PicoNow
    {
        return <PicoNow> <unknown> this.clone().set(59, 'minute');
    }

    /**
     * Get start of hour
     *
     * @example Now.firstHour()
     *
     * @returns {PicoNow} New instance
     */
    firstHour(): PicoNow
    {
        return <PicoNow> <unknown> this.clone().set(0, 'hour');
    }

    /**
     * Get end of hour
     *
     * @example Now.lastHour()
     *
     * @returns {PicoNow} New instance
     */
    lastHour(): PicoNow
    {
        return <PicoNow> <unknown> this.clone().set(23, 'hour');
    }

    /**
     * Get start of day
     *
     * @example Now.firstDay()
     *
     * @returns {PicoNow} New instance
     */
    firstDay(): PicoNow
    {
        return <PicoNow> <unknown> this.clone().set(0, 'day');
    }

    /**
     * Get end of day
     *
     * @example Now.lastDay()
     *
     * @returns {PicoNow} New instance
     */
    lastDay(): PicoNow
    {
        return <PicoNow> <unknown> this.clone().set(6, 'day');
    }

    /**
     * Get start of month date
     *
     * @example Now.firstDate()
     *
     * @returns {PicoNow} New instance
     */
    firstDate(): PicoNow
    {
        return <PicoNow> <unknown> this.clone().set(1, 'date');
    }

    /**
     * Get end of month date
     *
     * @example Now.lastDate()
     *
     * @returns {PicoNow} New instance
     */
    lastDate(): PicoNow
    {
        return <PicoNow> <unknown> this.clone().next('month').set(0, 'date');
    }

    /**
     * Get start of year month
     *
     * @example Now.firstMonth()
     *
     * @returns {PicoNow} New instance
     */
    firstMonth(): PicoNow
    {
        return <PicoNow> <unknown> this.clone().set(1, 'month');
    }

    /**
     * Get end of year month
     *
     * @example Now.lastMonth()
     *
     * @returns {PicoNow} New instance
     */
    lastMonth(): PicoNow
    {
        return <PicoNow> <unknown> this.clone().set(12, 'month');
    }

    /**
     * Get nth year of decade
     *
     * @example Now.nthYear(5)
     *
     * @param {number} [n] Year index
     * @returns {PicoNow} New instance
     */
    nthYear(n:number = 0): PicoNow
    {
        let year = Math.floor(this.year() / 10) * 10;

        return <PicoNow> <unknown> this.clone().set(year + n, 'year');
    }

    /**
     * Get first year of decade
     *
     * @example Now.firstYear()
     *
     * @returns {PicoNow} New instance
     */
    firstYear(): PicoNow
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
    lastYear(): PicoNow
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
    nthDecade(n:number = 0): PicoNow
    {
        let year = Math.floor(this.year() / 100) * 100;

        return <PicoNow> <unknown> this.clone().set(year + (n * 10), 'year');
    }

    /**
     * Get first decade of century
     *
     * @example Now.firstDecade()
     *
     * @returns {PicoNow} New instance
     */
    firstDecade(): PicoNow
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
    lastDecade(): PicoNow
    {
        return this.nthDecade(9);
    }

}

export default PicoNowWalker;