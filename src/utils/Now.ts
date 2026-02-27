import { trait } from "../tool/scope.ts";
import { Arr, Mix, Now } from "../index.esm.ts";
import { PicoNowDefault } from "../now/NowDefault.ts";
import { PicoNowFormat } from "../now/NowFormat.ts";
import { PicoNowMatch } from "../now/NowMatch.ts";
import { PicoNowGrid } from "../now/NowGrid.ts";
import { PicoNowWalker } from "../now/NowWalker.ts";
import { PicoNowRange } from "../now/NowRange.ts";
import { PicoNowHuman } from "../now/NowHuman.ts";

export const PicoNowPlugins = [
    PicoNowDefault,
    PicoNowFormat,
    PicoNowMatch,
    PicoNowGrid,
    PicoNowWalker,
    PicoNowRange,
    PicoNowHuman,
];

export interface PicoNowInterface
{
    value : Date;
    input : any;
    reset(config : any) : PicoNow;
    clone() : PicoNow;
    valid() : boolean;
    toDate() : Date;
    toUTC() : string;
}

export interface PicoNow extends PicoNowDefault,
    PicoNowFormat,
    PicoNowMatch,
    PicoNowGrid,
    PicoNowWalker,
    PicoNowRange,
    PicoNowHuman
{
    //
}

/**
 * @class PicoNow
 * @extends PicoNowDefault
 * @extends PicoNowFormat
 * @extends PicoNowMatch
 * @extends PicoNowGrid
 * @extends PicoNowWalker
 * @extends PicoNowRange
 * @extends PicoNowHuman
 */
export class PicoNow extends trait(PicoNowPlugins)
{
    /**
     * Init hooks for instance
     *
     * @type {Function[]}
     */
    static init : Function[] = [];

    /**
     * Original input value
     *
     * @type {any}
     */
    input : any = null;

    /**
     * Current Date instance
     *
     * @type {Date}
     */
    value : Date = null;

    /**
     * Create Now instance from input
     *
     * @example new Now().toUTC() // => string
     *
     * @param {any} [value] Date input
     * @param {string} [format] Input format
     */
    constructor(value : any = null, format : string = 'YYYY-MM-DD HH:mm:ss')
    {
        super();

        if ( value === 'now' ) {
            value = null;
        }

        let input = value;

        if ( value && value.toDate ) {
            value = value.toDate();
        }

        if ( !(value instanceof Date) ) {
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

        Arr.each(Now.init, (fn : Function) => {
            fn.call(this, format);
        });

        return this;
    }

    /**
     * Extend Now with a plugin
     *
     * @example Now.extend(fn)
     *
     * @param {Function} plugin Plugin function
     * @returns {void} No return value
     */
    static extend(plugin : Function) : void
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
    static make(value : any = null, format : string = 'YYYY-MM-DD HH:mm:ss') : PicoNow
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
    reset(config : any = null) : PicoNow
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
     * @returns {PicoNow} New instance
     */
    clone() : PicoNow
    {
        return new Now(new Date(this.value), null);
    }

    /**
     * Check if input is valid date
     *
     * @example Now.make("x").valid() // => false
     *
     * @returns {boolean} True if valid
     */
    valid() : boolean
    {
        return !isNaN(this.input);
    }

    /**
     * Get Date instance
     *
     * @example Now.make().toDate() // => Date
     *
     * @returns {Date} Date instance
     */
    toDate() : Date
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
    toUTC() : string
    {
        return this.value.toUTCString();
    }

}

/**
 * @deprecated use Now.reset instead
 */
// @ts-ignore
PicoNow.prototype.resetTime = function() : PicoNow {
    console.warn('Now.resetTime() is deprecated, use Now.reset({ time: true }) instead.');
    return this.reset({ time: true });
};

export default PicoNow;