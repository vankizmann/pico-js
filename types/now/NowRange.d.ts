/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowRangeInstance {
    /**
     * Get range of dates
     *
     * @example Now.range("2026-01-31", "day") // => [Now, Now, ...]
     *
     * @param {any} [value] End date
     * @param {string} [scope] Range scope
     * @returns {Array<PicoNow>} Array of dates
     */
    range(value?: any, scope?: string): Array<PicoNow>;
    /**
     * @see PicoNow.range
     */
    getDatesRange(...args: any[]): PicoNow[];
}
export function PicoNowRangePlugin(self: any): typeof import("#src/utils/Now.js").PicoNow;
