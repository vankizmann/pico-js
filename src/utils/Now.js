import { Arr, Dom, Mix, Now, Num } from "../index.esm.js";
import { PicoNowDefaultPlugin } from "../now/NowDefault.js";
import { PicoNowFormatPlugin } from "../now/NowFormat.js";
import { PicoNowMatchPlugin } from "../now/NowMatch.js";
import { PicoNowGridPlugin } from "../now/NowGrid.js";
import { PicoNowWalkerPlugin } from "../now/NowWalker.js";
import { PicoNowRangePlugin } from "../now/NowRange.js";
import { PicoNowHumanPlugin } from "../now/NowHuman.js";

export const PicoNowPlugins = [
    PicoNowDefaultPlugin,
    PicoNowFormatPlugin,
    PicoNowMatchPlugin,
    PicoNowGridPlugin,
    PicoNowWalkerPlugin,
    PicoNowRangePlugin,
    PicoNowHumanPlugin,
];

/**
 * @class PicoNow
 *
 * @typedef {import('../now/NowMatch.js').PicoNowMatchInstance} PicoNowMatchInstance
 * @typedef {import('../now/NowFormat.js').PicoNowFormatInstance} PicoNowFormatInstance
 * @typedef {import('../now/NowMatch.js').PicoNowMatchInstance} PicoNowMatchInstance
 * @typedef {import('../now/NowGrid.js').PicoNowGridInstance} PicoNowGridInstance
 * @typedef {import('../now/NowWalker.js').PicoNowWalkerInstance} PicoNowWalkerInstance
 * @typedef {import('../now/NowRange.js').PicoNowRangeInstance} PicoNowRangeInstance
 * @typedef {import('../now/NowHuman.js').PicoNowHumanInstance} PicoNowHumanInstance
 *
 * @extends PicoNowDefaultInstance
 * @extends PicoNowFormatInstance
 * @extends PicoNowMatchInstance
 * @extends PicoNowGridInstance
 * @extends PicoNowWalkerInstance
 * @extends PicoNowRangeInstance
 * @extends PicoNowHumanInstance
 */
export class PicoNow
{
    /**
     * Init hooks for instance
     *
     * @type {Array<function>}
     */
    static init = [];

    /**
     * Original input value
     *
     * @type {any}
     */
    input = null;

    /**
     * Current Date instance
     *
     * @type {Date}
     */
    value = null;

    /**
     * Create Now instance from input
     *
     * @example new Now().toUTC() // => string
     *
     * @param {any} [value] Date input
     * @param {string} [format] Input format
     */
    constructor(value = null, format = 'YYYY-MM-DD HH:mm:ss')
    {
        if ( value === 'now' ) {
            value = null;
        }

        let input = value;

        if ( value && value.toDate ) {
            value = value.toDate();
        }

        if ( ! (value instanceof Date) ) {
            value = new Date();
        }

        this.input = value;

        if ( Mix.isNix(input) ) {
            this.input = input;
        }

        this.value = value;

        if ( Mix.isStr(input) ) {
            this.parse(input, format);
        }

        Arr.each(Now.init, (fn) => {
            el = fn.call(this, el, format);
        });

        return this;
    }

    /**
     * Extend Now with a plugin
     *
     * @example Now.extend(fn)
     *
     * @param {function} plugin Plugin function
     * @returns {void} No return value
     */
    static extend(plugin)
    {
        plugin.call({}, this);
    }

    /**
     * Create Now instance helper
     *
     * @example Now.make("now") // => Now
     *
     * @param {any} [value] Date input
     * @param {string} [format] Input format
     * @returns {PicoNow} Now instance
     */
    static make(value = null, format = 'YYYY-MM-DD HH:mm:ss')
    {
        return new Now(value, format);
    }

    /**
     * Reset date parts to start
     *
     * @example Now.make().reset() // => Now
     *
     * @param {any} [config] Reset flags
     * @returns {PicoNow} Now instance
     */
    reset(config = null)
    {
        if ( config == null ) {
            config = { month: true, day: true, time: true };
        }

        if ( config.month ) {
            this.value.setMonth(0);
        }

        if ( config.day ) {
            this.value.setDate(1);
        }

        if ( config.time ) {
            this.value.setHours(0, 0, 0);
        }

        return this;
    }

    /**
     * Clone Now instance
     *
     * @example Now.make().clone() // => Now
     *
     * @param {boolean} [reset] Reset clone
     * @returns {PicoNow} New instance
     */
    clone(reset = false)
    {
        return new Now(new Date(this.value), null, reset);
    }

    /**
     * Check if input is valid date
     *
     * @example Now.make("x").valid() // => false
     *
     * @returns {boolean} True if valid
     */
    valid()
    {
        return ! isNaN(this.input);
    }

    /**
     * Get Date instance
     *
     * @example Now.make().toDate() // => Date
     *
     * @returns {Date} Date instance
     */
    toDate()
    {
        return this.value;
    }

    /**
     * Get UTC string
     *
     * @example Now.make().toUTC() // => string
     *
     * @returns {string} UTC string
     */
    toUTC()
    {
        return this.value.toUTCString();
    }

}

/**
 * @see PicoNow.reset
 */
PicoNow.prototype.resetTime = function () {
    console.warn('Now.resetTime() is deprecated, use Now.reset({ time: true }) instead.');
    return this.reset({ time: true });
}

/**
 * @returns {typeof PicoNow}
 */
export function PicoNowBuilder() {

    let cls = PicoNow;

    for ( const plugin of PicoNowPlugins ) {
        cls = plugin.call(cls, cls);
    }

    return cls;
}

export default PicoNowBuilder;