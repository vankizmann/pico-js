export namespace NOW_MODIFY {
    let second: RegExp;
    let minute: RegExp;
    let hour: RegExp;
    let date: RegExp;
    let month: RegExp;
    let year: RegExp;
}
/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowDefaultInstance {
    /**
     * Get value by scope
     *
     * @example Now.get("year") // => 2026
     *
     * @param {string} scope Value scope
     * @returns {number|PicoNow} Scope value
     */
    get(scope: string): number | PicoNow;
    /**
     * Set value by scope
     *
     * @example Now.set(2026, "year")
     *
     * @param {any} value New value
     * @param {string} scope Value scope
     * @returns {PicoNow} Current instance
     */
    set(value: any, scope: string): PicoNow;
    /**
     * Get or set timestamp
     *
     * @example Now.time() // => 1739334660000
     *
     * @param {any} [value] New timestamp
     * @returns {number|PicoNow} Timestamp or instance
     */
    time(value?: any): number | PicoNow;
    /**
     * Get or set seconds
     *
     * @example Now.second() // => 45
     *
     * @param {any} [value] New seconds
     * @returns {number|PicoNow} Seconds or instance
     */
    second(value?: any): number | PicoNow;
    /**
     * Get or set minutes
     *
     * @example Now.minute() // => 30
     *
     * @param {any} [value] New minutes
     * @returns {number|PicoNow} Minutes or instance
     */
    minute(value?: any): number | PicoNow;
    /**
     * Get or set hours
     *
     * @example Now.hour() // => 12
     *
     * @param {any} [value] New hours
     * @returns {number|PicoNow} Hours or instance
     */
    hour(value?: any): number | PicoNow;
    /**
     * Get or set day of week
     *
     * @example Now.day() // => 1
     *
     * @param {any} [value] New day
     * @returns {number|PicoNow} Day or instance
     */
    day(value?: any): number | PicoNow;
    /**
     * Get or set date of month
     *
     * @example Now.date() // => 12
     *
     * @param {any} [value] New date
     * @returns {number|PicoNow} Date or instance
     */
    date(value?: any): number | PicoNow;
    /**
     * Get or set month
     *
     * @example Now.month() // => 2
     *
     * @param {any} [value] New month
     * @returns {number|PicoNow} Month or instance
     */
    month(value?: any): number | PicoNow;
    /**
     * Get or set year
     *
     * @example Now.year() // => 2026
     *
     * @param {any} [value] New year
     * @returns {number|PicoNow} Year or instance
     */
    year(value?: any): number | PicoNow;
    /**
     * Get short year
     *
     * @example Now.shortyear() // => "26"
     *
     * @returns {string} Short year
     */
    shortyear(): string;
    /**
     * Add value to scope
     *
     * @example Now.add(1, "day")
     *
     * @param {number} value Add value
     * @param {string} [scope] Target scope
     * @returns {PicoNow} Current instance
     */
    add(value: number, scope?: string): PicoNow;
    /**
     * Subtract value from scope
     *
     * @example Now.sub(1, "day")
     *
     * @param {number} value Sub value
     * @param {string} [scope] Target scope
     * @returns {PicoNow} Current instance
     */
    sub(value: number, scope?: string): PicoNow;
    /**
     * Check if string is modifiable
     *
     * @example Now.isModifible("+1 day") // => true
     *
     * @param {string} value Test value
     * @returns {boolean} Is modifiable
     */
    isModifible(value: string): boolean;
    /**
     * Modify date by string
     *
     * @example Now.modify("+1 day")
     *
     * @param {string} value Modify string
     * @returns {PicoNow} Current instance
     */
    modify(value: string): PicoNow;
    /**
     * Apply values from other date
     *
     * @example Now.apply("2026-01-01", "YYYY-MM-DD", ["year"])
     *
     * @param {any} value Source value
     * @param {string} [format] Source format
     * @param {Array<string>} [keys] Scope keys
     * @returns {PicoNow} Current instance
     */
    apply(value: any, format?: string, keys?: Array<string>): PicoNow;
    /**
     * Apply date from other value
     *
     * @example Now.applyDate("2026-01-01")
     *
     * @param {any} value Source value
     * @param {string} [format] Source format
     * @returns {PicoNow} Current instance
     */
    applyDate(value: any, format?: string): PicoNow;
    /**
     * Apply time from other value
     *
     * @example Now.applyTime("12:00:00")
     *
     * @param {any} value Source value
     * @param {string} [format] Source format
     * @returns {PicoNow} Current instance
     */
    applyTime(value: any, format?: string): PicoNow;
}
export function PicoNowDefaultPlugin(self: any): typeof import("#src/utils/Now.js").PicoNow;
