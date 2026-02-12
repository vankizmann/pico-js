export const NOW_HUMAN_DAYS: string[];
export const NOW_HUMAN_MONTHS: string[];
/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowHumanInstance {
    /**
     * Get human readable value
     *
     * @example Now.human("day") // => "Monday"
     *
     * @param {string} [scope] Value scope
     * @param {number} [substr] Substring length
     * @returns {string|number} Human value
     */
    human(scope?: string, substr?: number): string | number;
    /**
     * Get human readable day
     *
     * @example Now.getHumanDay(3) // => "Mon"
     *
     * @param {number} [substr] Substring length
     * @returns {string} Day name
     */
    getHumanDay(substr?: number): string;
    /**
     * Get human readable month
     *
     * @example Now.getHumanMonth(3) // => "Jan"
     *
     * @param {number} [substr] Substring length
     * @returns {string} Month name
     */
    getHumanMonth(substr?: number): string;
}
export function PicoNowHumanPlugin(self: any): typeof import("#src/utils/Now.js").PicoNow;
