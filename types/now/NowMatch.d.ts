/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowMatchInstance {
    /**
     * Check if date is before value
     *
     * @example Now.make("2026-01-01").before("2026-02-12") // => true
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if before
     */
    before(value?: any, format?: string): boolean;
    /**
     * Check if date is before value date
     *
     * @example Now.make("2026-01-01").beforeDate("2026-02-12")
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if before
     */
    beforeDate(value?: any, format?: string): boolean;
    /**
     * Check if date is before value time
     *
     * @example Now.make("10:00:00").beforeTime("12:00:00")
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if before
     */
    beforeTime(value?: any, format?: string): boolean;
    /**
     * Check if date is after value
     *
     * @example Now.make("2026-02-12").after("2026-01-01") // => true
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if after
     */
    after(value?: any, format?: string): boolean;
    /**
     * Check if date is after value date
     *
     * @example Now.make("2026-02-12").afterDate("2026-01-01")
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if after
     */
    afterDate(value?: any, format?: string): boolean;
    /**
     * Check if date is after value time
     *
     * @example Now.make("12:00:00").afterTime("10:00:00")
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if after
     */
    afterTime(value?: any, format?: string): boolean;
    /**
     * Check if date equals value
     *
     * @example Now.make("2026-01-01").equal("2026-01-01") // => true
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if equal
     */
    equal(value?: any, format?: string): boolean;
    /**
     * Check if date equals value date
     *
     * @example Now.make("2026-01-01").equalDate("2026-01-01")
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if equal
     */
    equalDate(value?: any, format?: string): boolean;
    /**
     * Check if date equals value time
     *
     * @example Now.make("12:00:00").equalTime("12:00:00")
     *
     * @param {any} [value] Compare value
     * @param {string} [format] Compare format
     * @returns {boolean} True if equal
     */
    equalTime(value?: any, format?: string): boolean;
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
    between(start?: any, end?: any, format?: string): boolean;
}
export function PicoNowMatchPlugin(self: any): typeof import("#src/utils/Now.js").PicoNow;
