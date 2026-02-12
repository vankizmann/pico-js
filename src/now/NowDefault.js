import { Arr, Mix, Now, Num, Obj, Str } from "#src/index.esm.js";

export const NOW_MODIFY = {
    'second': /([+-])([0-9]+)\s?seconds?/i,
    'minute': /([+-])([0-9]+)\s?minutes?/i,
    'hour': /([+-])([0-9]+)\s?hours?/i,
    'date': /([+-])([0-9]+)\s?days?/i,
    'month': /([+-])([0-9]+)\s?months?/i,
    'year': /([+-])([0-9]+)\s?years?/i
};

/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowDefaultInstance
{

    /**
     * Get value by scope
     *
     * @example Now.get("year") // => 2026
     *
     * @param {string} scope Value scope
     * @returns {number|PicoNow} Scope value
     */
    get(scope)
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
    set(value, scope)
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

        return this;
    }

    /**
     * Get or set timestamp
     *
     * @example Now.time() // => 1739334660000
     *
     * @param {any} [value] New timestamp
     * @returns {number|PicoNow} Timestamp or instance
     */
    time(value = null)
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
     * @returns {number|PicoNow} Seconds or instance
     */
    second(value = null)
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
     * @returns {number|PicoNow} Minutes or instance
     */
    minute(value = null)
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
     * @returns {number|PicoNow} Hours or instance
     */
    hour(value = null)
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
     * @returns {number|PicoNow} Day or instance
     */
    day(value = null)
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
     * @returns {number|PicoNow} Date or instance
     */
    date(value = null)
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
     * @returns {number|PicoNow} Month or instance
     */
    month(value = null)
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
     * @returns {number|PicoNow} Year or instance
     */
    year(value = null)
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
    shortyear()
    {
        return this.get('year').toString().slice(- 2);
    }

    /**
     * Add value to scope
     *
     * @example Now.add(1, "day")
     *
     * @param {number} value Add value
     * @param {string} [scope] Target scope
     * @returns {PicoNow} Current instance
     */
    add(value, scope = 'day')
    {
        if ( /^days?$/i.test(scope) ) {
            scope = 'date';
        }

        this.set(this.get(scope) + Mix.int(value), scope);

        return this;
    }

    /**
     * Subtract value from scope
     *
     * @example Now.sub(1, "day")
     *
     * @param {number} value Sub value
     * @param {string} [scope] Target scope
     * @returns {PicoNow} Current instance
     */
    sub(value, scope = 'day')
    {
        if ( /^days?$/i.test(scope) ) {
            scope = 'date';
        }

        this.set(this.get(scope) - Mix.int(value), scope);

        return this;
    }

    /**
     * Check if string is modifiable
     *
     * @example Now.isModifible("+1 day") // => true
     *
     * @param {string} value Test value
     * @returns {boolean} Is modifiable
     */
    isModifible(value)
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
    modify(value)
    {
        if ( Mix.isEmpty(value) ) {
            return this;
        }

        Obj.each(NOW_MODIFY, (val, key) => {
            Str.match(value, val, ([f, o, c]) => {
                o === '+' ? this.add(c, key) : this.sub(c, key);
            });
        });

        return this;
    }

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
    apply(value, format = 'YYYY-MM-DD HH:mm:ss', keys = [])
    {
        value = Now.make(value, format);

        for ( const key of keys ) {
            this.set(value.get(key), key);
        }

        return this;
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
    applyDate(value, format = 'YYYY-MM-DD HH:mm:ss')
    {
        return this.apply(value, format, ['date', 'month', 'year']);
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
    applyTime(value, format = 'YYYY-MM-DD HH:mm:ss')
    {
        return this.apply(value, format, ['hour', 'minute', 'second']);
    }

}

/**
 * @see PicoNow.add
 */
PicoNowGridInstance.prototype.addSecond = function (value) {
    console.warn('Now.addSecond() is deprecated, use Now.add(value, \'second\') instead.');
    return this.add(value, 'second');
}

/**
 * @see PicoNow.sub
 */
PicoNowGridInstance.prototype.subSecond = function (value) {
    console.warn('Now.subSecond() is deprecated, use Now.sub(value, \'second\') instead.');
    return this.sub(value, 'second');
}

/**
 * @see PicoNow.add
 */
PicoNowGridInstance.prototype.addMinute = function (value) {
    console.warn('Now.addMinute() is deprecated, use Now.add(value, \'minute\') instead.');
    return this.add(value, 'minute');
}

/**
 * @see PicoNow.sub
 */
PicoNowGridInstance.prototype.subMinute = function (value) {
    console.warn('Now.subMinute() is deprecated, use Now.sub(value, \'minute\') instead.');
    return this.sub(value, 'minute');
}

/**
 * @see PicoNow.add
 */
PicoNowGridInstance.prototype.addHour = function (value) {
    console.warn('Now.addHour() is deprecated, use Now.add(value, \'hour\') instead.');
    return this.add(value, 'hour');
}

/**
 * @see PicoNow.sub
 */
PicoNowGridInstance.prototype.subHour = function (value) {
    console.warn('Now.subHour() is deprecated, use Now.sub(value, \'hour\') instead.');
    return this.sub(value, 'hour');
}

/**
 * @see PicoNow.add
 */
PicoNowGridInstance.prototype.addDates = function (value) {
    console.warn('Now.addDates() is deprecated, use Now.add(value, \'date\') instead.');
    return this.add(value, 'date');
}

/**
 * @see PicoNow.sub
 */
PicoNowGridInstance.prototype.subDates = function (value) {
    console.warn('Now.subDates() is deprecated, use Now.sub(value, \'date\') instead.');
    return this.sub(value, 'date');
}

/**
 * @see PicoNow.add
 */
PicoNowGridInstance.prototype.addMonths = function (value) {
    console.warn('Now.addMonths() is deprecated, use Now.add(value, \'month\') instead.');
    return this.add(value, 'month');
}

/**
 * @see PicoNow.sub
 */
PicoNowGridInstance.prototype.subMonths = function (value) {
    console.warn('Now.subMonths() is deprecated, use Now.sub(value, \'month\') instead.');
    return this.sub(value, 'month');
}

/**
 * @see PicoNow.add
 */
PicoNowGridInstance.prototype.addYears = function (value) {
    console.warn('Now.addYears() is deprecated, use Now.add(value, \'year\') instead.');
    return this.add(value, 'year');
}

/**
 * @see PicoNow.sub
 */
PicoNowGridInstance.prototype.subYears = function (value) {
    console.warn('Now.subYears() is deprecated, use Now.sub(value, \'year\') instead.');
    return this.sub(value, 'year');
}

/**
 * @see PicoNow.add
 */
PicoNowGridInstance.prototype.addDecades = function (value) {
    console.warn('Now.addDecades() is deprecated, use Now.grid(10 * value, \'year\') instead.');
    return this.add(10 * value, 'year');
}

/**
 * @see PicoNow.sub
 */
PicoNowGridInstance.prototype.subDecades = function (value) {
    console.warn('Now.subDecades() is deprecated, use Now.grid(10 * value, \'year\') instead.');
    return this.sub(10 * value, 'year');
}

/**
 * @see PicoNow.day
 */
PicoNowGridInstance.prototype.humanDay = function () {
    console.warn('Now.humanDay() is deprecated, use Now.day() instead.');
    return this.day();
}

/**
 * @see PicoNow.month
 */
PicoNowGridInstance.prototype.humanMonth = function () {
    console.warn('Now.humanMonth() is deprecated, use Now.month() instead.');
    return this.month();
}

/**
 * @returns {typeof import('#src/utils/Now.js').PicoNow}
 */
export const PicoNowDefaultPlugin = function (self) {

    Obj.each(Mix.proto(PicoNowDefaultInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    return self;
}