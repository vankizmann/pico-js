/**
 * @returns {typeof PicoNow}
 */
export function PicoNowBuilder(): typeof PicoNow;
export const PicoNowPlugins: ((self: any) => typeof import("./Now.js").PicoNow)[];
/**
 * @class PicoNow
 *
 * @typedef {import('#src/now/NowMatch.js').PicoNowMatchInstance} PicoNowMatchInstance
 * @typedef {import('#src/now/NowFormat.js').PicoNowFormatInstance} PicoNowFormatInstance
 * @typedef {import('#src/now/NowMatch.js').PicoNowMatchInstance} PicoNowMatchInstance
 * @typedef {import('#src/now/NowGrid.js').PicoNowGridInstance} PicoNowGridInstance
 * @typedef {import('#src/now/NowWalker.js').PicoNowWalkerInstance} PicoNowWalkerInstance
 * @typedef {import('#src/now/NowRange.js').PicoNowRangeInstance} PicoNowRangeInstance
 * @typedef {import('#src/now/NowHuman.js').PicoNowHumanInstance} PicoNowHumanInstance
 *
 * @extends PicoNowDefaultInstance
 * @extends PicoNowFormatInstance
 * @extends PicoNowMatchInstance
 * @extends PicoNowGridInstance
 * @extends PicoNowWalkerInstance
 * @extends PicoNowRangeInstance
 * @extends PicoNowHumanInstance
 */
export class PicoNow {
    /**
     * Init hooks for instance
     *
     * @type {Array<function>}
     */
    static init: Array<Function>;
    /**
     * Extend Now with a plugin
     *
     * @example Now.extend(fn)
     *
     * @param {function} plugin Plugin function
     * @returns {void} No return value
     */
    static extend(plugin: Function): void;
    /**
     * Create Now instance helper
     *
     * @example Now.make("now") // => Now
     *
     * @param {any} [value] Date input
     * @param {string} [format] Input format
     * @returns {PicoNow} Now instance
     */
    static make(value?: any, format?: string): PicoNow;
    /**
     * Create Now instance from input
     *
     * @example new Now().toUTC() // => string
     *
     * @param {any} [value] Date input
     * @param {string} [format] Input format
     */
    constructor(value?: any, format?: string);
    /**
     * Original input value
     *
     * @type {any}
     */
    input: any;
    /**
     * Current Date instance
     *
     * @type {Date}
     */
    value: Date;
    /**
     * Reset date parts to start
     *
     * @example Now.make().reset() // => Now
     *
     * @param {any} [config] Reset flags
     * @returns {PicoNow} Now instance
     */
    reset(config?: any): PicoNow;
    /**
     * Clone Now instance
     *
     * @example Now.make().clone() // => Now
     *
     * @param {boolean} [reset] Reset clone
     * @returns {PicoNow} New instance
     */
    clone(reset?: boolean): PicoNow;
    /**
     * Check if input is valid date
     *
     * @example Now.make("x").valid() // => false
     *
     * @returns {boolean} True if valid
     */
    valid(): boolean;
    /**
     * Get Date instance
     *
     * @example Now.make().toDate() // => Date
     *
     * @returns {Date} Date instance
     */
    toDate(): Date;
    /**
     * Get UTC string
     *
     * @example Now.make().toUTC() // => string
     *
     * @returns {string} UTC string
     */
    toUTC(): string;
    /**
     * @see PicoNow.reset
     */
    resetTime(): PicoNow;
}
export default PicoNowBuilder;
export type PicoNowMatchInstance = import("#src/now/NowMatch.js").PicoNowMatchInstance;
export type PicoNowFormatInstance = import("#src/now/NowFormat.js").PicoNowFormatInstance;
export type PicoNowGridInstance = import("#src/now/NowGrid.js").PicoNowGridInstance;
export type PicoNowWalkerInstance = import("#src/now/NowWalker.js").PicoNowWalkerInstance;
export type PicoNowRangeInstance = import("#src/now/NowRange.js").PicoNowRangeInstance;
export type PicoNowHumanInstance = import("#src/now/NowHuman.js").PicoNowHumanInstance;
