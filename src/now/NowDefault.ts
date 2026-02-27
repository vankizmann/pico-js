import { Mix, Now, Obj, Str } from "../index.esm.ts";
import { PicoNow, PicoNowInterface } from "../utils/Now.ts";

export const NOW_MODIFY : any = {
    'second': /([+-])([0-9]+)\s?seconds?/i,
    'minute': /([+-])([0-9]+)\s?minutes?/i,
    'hour': /([+-])([0-9]+)\s?hours?/i,
    'date': /([+-])([0-9]+)\s?days?/i,
    'month': /([+-])([0-9]+)\s?months?/i,
    'year': /([+-])([0-9]+)\s?years?/i
};

export interface PicoNowDefault extends PicoNowInterface
{
    //
}

/**
 * @memberof PicoNow
 */
export class PicoNowDefault
{
    static test(value : any) : boolean
    {
        return value instanceof Date;
    }

    /**
     * Get value by scope
     *
     * @example Now.get("year") // => 2026
     *
     * @param {string} scope Value scope
     * @returns {any} Scope value
     */
    get(scope : string) : any
    {
        if ( scope === 'time' ) {
            return this.value.getTime();
        }

        if ( /^seconds?$/i.test(scope) ) {
            return this.value.getSeconds();
        }

        if ( /^minutes?$/i.test(scope) ) {
            return this.value.getMinutes();
        }

        if ( /^hours?$/i.test(scope) ) {
            return this.value.getHours();
        }

        if ( /^days?$/i.test(scope) ) {
            return this.value.getDay();
        }

        if ( /^dates?$/i.test(scope) ) {
            return this.value.getDate();
        }

        if ( /^months?$/i.test(scope) ) {
            return this.value.getMonth() + 1;
        }

        if ( /^years?$/i.test(scope) ) {
            return this.value.getFullYear();
        }

        return this;
    }

    /**
     * Set value by scope
     *
     * @example Now.set(2026, "year")
     *
     * @param {any} value New value
     * @param {string} scope Value scope
     * @returns {PicoNow} Current instance
     */
    set(value : any, scope : string) : PicoNow
    {
        if ( !Mix.isNum(value) ) {
            value = Mix.int(value);
        }

        let day = this.value.getDay();

        if ( scope === 'day' ) {
            value = value + 1 - (day || 7);
        }

        if ( scope === 'time' ) {
            this.value.setTime(value);
        }

        if ( /^seconds?$/i.test(scope) ) {
            this.value.setSeconds(value);
        }

        if ( /^minutes?$/i.test(scope) ) {
            this.value.setMinutes(value);
        }

        if ( /^hours?$/i.test(scope) ) {
            this.value.setHours(value);
        }

        if ( /^days?$/i.test(scope) ) {
            this.add(value, 'date');
        }

        if ( /^dates?$/i.test(scope) ) {
            this.value.setDate(value);
        }

        if ( /^months?$/i.test(scope) ) {
            this.value.setMonth(value - 1);
        }

        if ( /^years?$/i.test(scope) ) {
            this.value.setFullYear(value);
        }

        return <PicoNow> <unknown> this;
    }

    /**
     * Get or set timestamp
     *
     * @example Now.time() // => 1739334660000
     *
     * @param {any} [value] New timestamp
     * @returns {any} Timestamp or instance
     */
    time(value : any = null) : any
    {
        if ( value == null ) {
            return this.get('time');
        }

        return this.set(value, 'time');
    }

    /**
     * Get or set seconds
     *
     * @example Now.second() // => 45
     *
     * @param {any} [value] New seconds
     * @returns {any} Seconds or instance
     */
    second(value : any = null) : any
    {
        if ( value == null ) {
            return this.get('second');
        }

        return this.set(value, 'second');
    }

    /**
     * Get or set minutes
     *
     * @example Now.minute() // => 30
     *
     * @param {any} [value] New minutes
     * @returns {any} Minutes or instance
     */
    minute(value : any = null) : any
    {
        if ( value == null ) {
            return this.get('minute');
        }

        return this.set(value, 'minute');
    }

    /**
     * Get or set hours
     *
     * @example Now.hour() // => 12
     *
     * @param {any} [value] New hours
     * @returns {any} Hours or instance
     */
    hour(value : any = null) : any
    {
        if ( value == null ) {
            return this.get('hour');
        }

        return this.set(value, 'hour');
    }

    /**
     * Get or set day of week
     *
     * @example Now.day() // => 1
     *
     * @param {any} [value] New day
     * @returns {any} Day or instance
     */
    day(value : any = null) : any
    {
        if ( value == null ) {
            return this.get('day');
        }

        return this.set(value, 'day');
    }

    /**
     * Get or set date of month
     *
     * @example Now.date() // => 12
     *
     * @param {any} [value] New date
     * @returns {any} Date or instance
     */
    date(value : any = null) : any
    {
        if ( value == null ) {
            return this.get('date');
        }

        return this.set(value, 'date');
    }

    /**
     * Get or set month
     *
     * @example Now.month() // => 2
     *
     * @param {any} [value] New month
     * @returns {any} Month or instance
     */
    month(value : any = null) : any
    {
        if ( value == null ) {
            return this.get('month');
        }

        return this.set(value, 'month');
    }

    /**
     * Get or set year
     *
     * @example Now.year() // => 2026
     *
     * @param {any} [value] New year
     * @returns {any} Year or instance
     */
    year(value : any = null) : any
    {
        if ( value == null ) {
            return this.get('year');
        }

        return this.set(value, 'year');
    }

    /**
     * Get short year
     *
     * @example Now.shortyear() // => "26"
     *
     * @returns {string} Short year
     */
    shortyear() : string
    {
        return this.get('year').toString().slice(-2);
    }

    /**
     * Add value to scope
     *
     * @example Now.add(1, "day")
     *
     * @param {any} value Add value
     * @param {string} [scope] Target scope
     * @returns {PicoNow} Current instance
     */
    add(value : any, scope : string = 'day') : PicoNow
    {
        if ( /^days?$/i.test(scope) ) {
            scope = 'date';
        }

        this.set(this.get(scope) + Mix.int(value), scope);

        return <PicoNow> <unknown> this;
    }

    /**
     * Subtract value from scope
     *
     * @example Now.sub(1, "day")
     *
     * @param {any} value Sub value
     * @param {string} [scope] Target scope
     * @returns {PicoNow} Current instance
     */
    sub(value : any, scope : string = 'day') : PicoNow
    {
        if ( /^days?$/i.test(scope) ) {
            scope = 'date';
        }

        this.set(this.get(scope) - Mix.int(value), scope);

        return <PicoNow> <unknown> this;
    }

    /**
     * Check if string is modifiable
     *
     * @example Now.isModifible("+1 day") // => true
     *
     * @param {string} value Test value
     * @returns {boolean} Is modifiable
     */
    isModifible(value : string) : boolean
    {
        return /^(\s*[+-][0-9]+\s?[a-z]+\s*)+$/i.test(value);
    }

    /**
     * Modify date by string
     *
     * @example Now.modify("+1 day")
     *
     * @param {string} value Modify string
     * @returns {PicoNow} Current instance
     */
    modify(value : string) : PicoNow
    {
        if ( Mix.isEmpty(value) ) {
            return <PicoNow> <unknown> this;
        }

        Obj.each(NOW_MODIFY, (val : any, key : any) => {
            Str.match(value, val, ([f, o, c]) => {
                o === '+' ? this.add(c, key) : this.sub(c, key);
            });
        });

        return <PicoNow> <unknown> this;
    }

    /**
     * Apply values from other date
     *
     * @example Now.apply("2026-01-01", "YYYY-MM-DD", ["year"])
     *
     * @param {any} value Source value
     * @param {string} [format] Source format
     * @param {string[]} [keys] Scope keys
     * @returns {PicoNow} Current instance
     */
    apply(value : any, format : string = 'YYYY-MM-DD HH:mm:ss', keys : string[] = []) : PicoNow
    {
        value = Now.make(value, format);

        for ( const key of keys ) {
            this.set(value.get(key), key);
        }

        return <PicoNow> <unknown> this;
    }

    /**
     * Apply date from other value
     *
     * @example Now.applyDate("2026-01-01")
     *
     * @param {any} value Source value
     * @param {string} [format] Source format
     * @returns {PicoNow} Current instance
     */
    applyDate(value : any, format : string = 'YYYY-MM-DD HH:mm:ss') : PicoNow
    {
        return <PicoNow> this.apply(value, format, ['date', 'month', 'year']);
    }

    /**
     * Apply time from other value
     *
     * @example Now.applyTime("12:00:00")
     *
     * @param {any} value Source value
     * @param {string} [format] Source format
     * @returns {PicoNow} Current instance
     */
    applyTime(value : any, format : string = 'YYYY-MM-DD HH:mm:ss') : PicoNow
    {
        return <PicoNow> this.apply(value, format, ['hour', 'minute', 'second']);
    }

}

/**
 * @deprecated use Now.add instead
 */
// @ts-ignore
PicoNowDefault.prototype.addSecond = function(value : any) : PicoNow {
    console.warn('Now.addSecond() is deprecated, use Now.add(value, \'second\') instead.');
    return this.add(value, 'second');
};

/**
 * @deprecated use Now.sub instead
 */
// @ts-ignore
PicoNowDefault.prototype.subSecond = function(value : any) : PicoNow {
    console.warn('Now.subSecond() is deprecated, use Now.sub(value, \'second\') instead.');
    return this.sub(value, 'second');
};

/**
 * @deprecated use Now.add instead
 */
// @ts-ignore
PicoNowDefault.prototype.addMinute = function(value : any) : PicoNow {
    console.warn('Now.addMinute() is deprecated, use Now.add(value, \'minute\') instead.');
    return this.add(value, 'minute');
};

/**
 * @deprecated use Now.sub instead
 */
// @ts-ignore
PicoNowDefault.prototype.subMinute = function(value : any) : PicoNow {
    console.warn('Now.subMinute() is deprecated, use Now.sub(value, \'minute\') instead.');
    return this.sub(value, 'minute');
};

/**
 * @deprecated use Now.add instead
 */
// @ts-ignore
PicoNowDefault.prototype.addHour = function(value : any) : PicoNow {
    console.warn('Now.addHour() is deprecated, use Now.add(value, \'hour\') instead.');
    return this.add(value, 'hour');
};

/**
 * @deprecated use Now.sub instead
 */
// @ts-ignore
PicoNowDefault.prototype.subHour = function(value : any) : PicoNow {
    console.warn('Now.subHour() is deprecated, use Now.sub(value, \'hour\') instead.');
    return this.sub(value, 'hour');
};

/**
 * @deprecated use Now.add instead
 */
// @ts-ignore
PicoNowDefault.prototype.addDates = function(value : any) : PicoNow {
    console.warn('Now.addDates() is deprecated, use Now.add(value, \'date\') instead.');
    return this.add(value, 'date');
};

/**
 * @deprecated use Now.sub instead
 */
// @ts-ignore
PicoNowDefault.prototype.subDates = function(value : any) : PicoNow {
    console.warn('Now.subDates() is deprecated, use Now.sub(value, \'date\') instead.');
    return this.sub(value, 'date');
};

/**
 * @deprecated use Now.add instead
 */
// @ts-ignore
PicoNowDefault.prototype.addMonths = function(value : any) : PicoNow {
    console.warn('Now.addMonths() is deprecated, use Now.add(value, \'month\') instead.');
    return this.add(value, 'month');
};

/**
 * @deprecated use Now.sub instead
 */
// @ts-ignore
PicoNowDefault.prototype.subMonths = function(value : any) : PicoNow {
    console.warn('Now.subMonths() is deprecated, use Now.sub(value, \'month\') instead.');
    return this.sub(value, 'month');
};

/**
 * @deprecated use Now.add instead
 */
// @ts-ignore
PicoNowDefault.prototype.addYears = function(value : any) : PicoNow {
    console.warn('Now.addYears() is deprecated, use Now.add(value, \'year\') instead.');
    return this.add(value, 'year');
};

/**
 * @deprecated use Now.sub instead
 */
// @ts-ignore
PicoNowDefault.prototype.subYears = function(value : any) : PicoNow {
    console.warn('Now.subYears() is deprecated, use Now.sub(value, \'year\') instead.');
    return this.sub(value, 'year');
};

/**
 * @deprecated use Now.add instead
 */
// @ts-ignore
PicoNowDefault.prototype.addDecades = function(value : any) : PicoNow {
    console.warn('Now.addDecades() is deprecated, use Now.grid(10 * value, \'year\') instead.');
    return this.add(10 * value, 'year');
};

/**
 * @deprecated use Now.sub instead
 */
// @ts-ignore
PicoNowDefault.prototype.subDecades = function(value : any) : PicoNow {
    console.warn('Now.subDecades() is deprecated, use Now.grid(10 * value, \'year\') instead.');
    return this.sub(10 * value, 'year');
};

/**
 * @deprecated use Now.day instead
 */
// @ts-ignore
PicoNowDefault.prototype.humanDay = function() : number {
    console.warn('Now.humanDay() is deprecated, use Now.day() instead.');
    return this.day();
};

/**
 * @deprecated use Now.month instead
 */
// @ts-ignore
PicoNowDefault.prototype.humanMonth = function() : number {
    console.warn('Now.humanMonth() is deprecated, use Now.month() instead.');
    return this.month();
};

export default PicoNowDefault;