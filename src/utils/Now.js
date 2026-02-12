import { Arr, Dom, Mix, Now, Num } from "#src/index.esm.js";
import { PicoNowDefaultInstance, PicoNowDefaultPlugin } from "#src/now/NowDefault.js";
import { PicoNowFormatInstance, PicoNowFormatPlugin } from "#src/now/NowFormat.js";
import { PicoNowMatchInstance, PicoNowMatchPlugin } from "#src/now/NowMatch.js";
import { PicoNowGridInstance, PicoNowGridPlugin } from "#src/now/NowGrid.js";
import { PicoNowWalkerInstance, PicoNowWalkerPlugin } from "#src/now/NowWalker.js";
import { PicoNowRangeInstance, PicoNowRangePlugin } from "#src/now/NowRange.js";
import { PicoNowHumanInstance, PicoNowHumanPlugin } from "#src/now/NowHuman.js";

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
    static init = [];

    input = null;
    value = null;

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

    static extend(plugin)
    {
        plugin.call({}, this);
    }

    static make(value = null, format = 'YYYY-MM-DD HH:mm:ss')
    {
        return new Now(value, format);
    }

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

    clone(reset = false)
    {
        return new Now(new Date(this.value), null, reset);
    }

    valid()
    {
        return ! isNaN(this.input);
    }

    toDate()
    {
        return this.value;
    }

    toUTC()
    {
        return this.value.toUTCString();
    }

}

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