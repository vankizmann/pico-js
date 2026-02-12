/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowWalkerInstance {
    /**
     * Get previous date by scope
     *
     * @example Now.prev("day") // => Now
     *
     * @param {string} [scope] Target scope
     * @returns {PicoNow} New instance
     */
    prev(scope?: string): PicoNow;
    /**
     * Get next date by scope
     *
     * @example Now.next("day") // => Now
     *
     * @param {string} [scope] Target scope
     * @returns {PicoNow} New instance
     */
    next(scope?: string): PicoNow;
    /**
     * Get previous second
     *
     * @example Now.prevSecond()
     *
     * @returns {PicoNow} New instance
     */
    prevSecond(): PicoNow;
    /**
     * Get next second
     *
     * @example Now.nextSecond()
     *
     * @returns {PicoNow} New instance
     */
    nextSecond(): PicoNow;
    /**
     * Get previous minute
     *
     * @example Now.prevMinute()
     *
     * @returns {PicoNow} New instance
     */
    prevMinute(): PicoNow;
    /**
     * Get next minute
     *
     * @example Now.nextMinute()
     *
     * @returns {PicoNow} New instance
     */
    nextMinute(): PicoNow;
    /**
     * Get previous hour
     *
     * @example Now.prevHour()
     *
     * @returns {PicoNow} New instance
     */
    prevHour(): PicoNow;
    /**
     * Get next hour
     *
     * @example Now.nextHour()
     *
     * @returns {PicoNow} New instance
     */
    nextHour(): PicoNow;
    /**
     * Get previous date
     *
     * @example Now.prevDate()
     *
     * @returns {PicoNow} New instance
     */
    prevDate(): PicoNow;
    /**
     * Get next date
     *
     * @example Now.nextDate()
     *
     * @returns {PicoNow} New instance
     */
    nextDate(): PicoNow;
    /**
     * Get previous month
     *
     * @example Now.prevMonth()
     *
     * @returns {PicoNow} New instance
     */
    prevMonth(): PicoNow;
    /**
     * Get next month
     *
     * @example Now.nextMonth()
     *
     * @returns {PicoNow} New instance
     */
    nextMonth(): PicoNow;
    /**
     * Get previous year
     *
     * @example Now.prevYear()
     *
     * @returns {PicoNow} New instance
     */
    prevYear(): PicoNow;
    /**
     * Get next year
     *
     * @example Now.nextYear()
     *
     * @returns {PicoNow} New instance
     */
    nextYear(): PicoNow;
    /**
     * Get previous decade
     *
     * @example Now.prevDecade()
     *
     * @returns {PicoNow} New instance
     */
    prevDecade(): PicoNow;
    /**
     * Get next decade
     *
     * @example Now.nextDecade()
     *
     * @returns {PicoNow} New instance
     */
    nextDecade(): PicoNow;
    /**
     * Get start of scope
     *
     * @example Now.first("month")
     *
     * @param {string} [scope] Target scope
     * @returns {PicoNow} New instance
     */
    first(scope?: string): PicoNow;
    /**
     * Get end of scope
     *
     * @example Now.last("month")
     *
     * @param {string} [scope] Target scope
     * @returns {PicoNow} New instance
     */
    last(scope?: string): PicoNow;
    /**
     * Get start of second
     *
     * @example Now.firstSecond()
     *
     * @returns {PicoNow} New instance
     */
    firstSecond(): PicoNow;
    /**
     * Get end of second
     *
     * @example Now.lastSecond()
     *
     * @returns {PicoNow} New instance
     */
    lastSecond(): PicoNow;
    /**
     * Get start of minute
     *
     * @example Now.firstMinute()
     *
     * @returns {PicoNow} New instance
     */
    firstMinute(): PicoNow;
    /**
     * Get end of minute
     *
     * @example Now.lastMinute()
     *
     * @returns {PicoNow} New instance
     */
    lastMinute(): PicoNow;
    /**
     * Get start of hour
     *
     * @example Now.firstHour()
     *
     * @returns {PicoNow} New instance
     */
    firstHour(): PicoNow;
    /**
     * Get end of hour
     *
     * @example Now.lastHour()
     *
     * @returns {PicoNow} New instance
     */
    lastHour(): PicoNow;
    /**
     * Get start of day
     *
     * @example Now.firstDay()
     *
     * @returns {PicoNow} New instance
     */
    firstDay(): PicoNow;
    /**
     * Get end of day
     *
     * @example Now.lastDay()
     *
     * @returns {PicoNow} New instance
     */
    lastDay(): PicoNow;
    /**
     * Get start of month date
     *
     * @example Now.firstDate()
     *
     * @returns {PicoNow} New instance
     */
    firstDate(): PicoNow;
    /**
     * Get end of month date
     *
     * @example Now.lastDate()
     *
     * @returns {PicoNow} New instance
     */
    lastDate(): PicoNow;
    /**
     * Get start of year month
     *
     * @example Now.firstMonth()
     *
     * @returns {PicoNow} New instance
     */
    firstMonth(): PicoNow;
    /**
     * Get end of year month
     *
     * @example Now.lastMonth()
     *
     * @returns {PicoNow} New instance
     */
    lastMonth(): PicoNow;
    /**
     * Get nth year of decade
     *
     * @example Now.nthYear(5)
     *
     * @param {number} [n] Year index
     * @returns {PicoNow} New instance
     */
    nthYear(n?: number): PicoNow;
    /**
     * Get first year of decade
     *
     * @example Now.firstYear()
     *
     * @returns {PicoNow} New instance
     */
    firstYear(): PicoNow;
    /**
     * Get last year of decade
     *
     * @example Now.lastYear()
     *
     * @returns {PicoNow} New instance
     */
    lastYear(): PicoNow;
    /**
     * Get nth decade of century
     *
     * @example Now.nthDecade(5)
     *
     * @param {number} [n] Decade index
     * @returns {PicoNow} New instance
     */
    nthDecade(n?: number): PicoNow;
    /**
     * Get first decade of century
     *
     * @example Now.firstDecade()
     *
     * @returns {PicoNow} New instance
     */
    firstDecade(): PicoNow;
    /**
     * Get last decade of century
     *
     * @example Now.lastDecade()
     *
     * @returns {PicoNow} New instance
     */
    lastDecade(): PicoNow;
}
export function PicoNowWalkerPlugin(self: any): typeof import("#src/utils/Now.js").PicoNow;
