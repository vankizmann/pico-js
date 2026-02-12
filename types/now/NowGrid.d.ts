/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowGridInstance {
    /**
     * Get grid of dates by scope
     *
     * @example Now.grid("month") // => [Now, Now, ...]
     *
     * @param {string} [scope] Grid scope
     * @returns {Array<PicoNow>} Array of dates
     */
    grid(scope?: string): Array<PicoNow>;
    /**
     * Get seconds grid
     *
     * @example Now.getSecondsGrid(10)
     *
     * @param {number} [interval] Step interval
     * @returns {Array<PicoNow>} Array of dates
     */
    getSecondsGrid(interval?: number): Array<PicoNow>;
    /**
     * Get minutes grid
     *
     * @example Now.getMinutesGrid(10)
     *
     * @param {number} [interval] Step interval
     * @returns {Array<PicoNow>} Array of dates
     */
    getMinutesGrid(interval?: number): Array<PicoNow>;
    /**
     * Get hours grid
     *
     * @example Now.getHoursGrid(2)
     *
     * @param {number} [interval] Step interval
     * @returns {Array<PicoNow>} Array of dates
     */
    getHoursGrid(interval?: number): Array<PicoNow>;
    /**
     * Get days grid
     *
     * @example Now.getDaysGrid()
     *
     * @returns {Array<PicoNow>} Array of dates
     */
    getDaysGrid(): Array<PicoNow>;
    /**
     * Get dates grid
     *
     * @example Now.getDatesGrid()
     *
     * @returns {Array<PicoNow>} Array of dates
     */
    getDatesGrid(): Array<PicoNow>;
    /**
     * Get months grid
     *
     * @example Now.getMonthsGrid()
     *
     * @returns {Array<PicoNow>} Array of dates
     */
    getMonthsGrid(): Array<PicoNow>;
    /**
     * Get years grid
     *
     * @example Now.getYearsGrid()
     *
     * @returns {Array<PicoNow>} Array of dates
     */
    getYearsGrid(): Array<PicoNow>;
    /**
     * Get decades grid
     *
     * @example Now.getDecadesGrid()
     *
     * @returns {Array<PicoNow>} Array of dates
     */
    getDecadesGrid(): Array<PicoNow>;
    /**
     * @see PicoNow.grid
     */
    getYears(): PicoNow[];
    /**
     * @see PicoNow.grid
     */
    getMonths(): PicoNow[];
    /**
     * @see PicoNow.grid
     */
    getDates(): PicoNow[];
    /**
     * @see PicoNow.grid
     */
    getHours(): PicoNow[];
    /**
     * @see PicoNow.grid
     */
    getMinutes(): PicoNow[];
    /**
     * @see PicoNow.grid
     */
    getSeconds(): PicoNow[];
}
export function PicoNowGridPlugin(self: any): typeof import("#src/utils/Now.js").PicoNow;
