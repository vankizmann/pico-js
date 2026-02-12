import { Arr, Mix, Now, Num, Obj, Str } from "#src/index.esm.js";
import { PicoNowGridInstance } from "#src/now/NowGrid.js";

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

    time(value = null)
    {
        if ( value == null ) {
            return this.get('time');
        }

        return this.set(value, 'time');
    }

    second(value = null)
    {
        if ( value == null ) {
            return this.get('second');
        }

        return this.set(value, 'second');
    }

    minute(value = null)
    {
        if ( value == null ) {
            return this.get('minute');
        }

        return this.set(value, 'minute');
    }

    hour(value = null)
    {
        if ( value == null ) {
            return this.get('hour');
        }

        return this.set(value, 'hour');
    }

    day(value = null)
    {
        if ( value == null ) {
            return this.get('day');
        }

        return this.set(value, 'day');
    }

    date(value = null)
    {
        if ( value == null ) {
            return this.get('date');
        }

        return this.set(value, 'date');
    }

    month(value = null)
    {
        if ( value == null ) {
            return this.get('month');
        }

        return this.set(value, 'month');
    }

    year(value = null)
    {
        if ( value == null ) {
            return this.get('year');
        }

        return this.set(value, 'year');
    }

    shortyear()
    {
        return this.get('year').toString().slice(- 2);
    }

    add(value, scope = 'day')
    {
        if ( /^days?$/i.test(scope) ) {
            scope = 'date';
        }

        this.set(this.get(scope) + Mix.int(value), scope);

        return this;
    }

    sub(value, scope = 'day')
    {
        if ( /^days?$/i.test(scope) ) {
            scope = 'date';
        }

        this.set(this.get(scope) - Mix.int(value), scope);

        return this;
    }

    isModifible(value)
    {
        return /^(\s*[+-][0-9]+\s?[a-z]+\s*)+$/i.test(value);
    }

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

    apply(value, format = 'YYYY-MM-DD HH:mm:ss', keys = [])
    {
        value = Now.make(value, format);

        for ( const key of keys ) {
            this.set(value.get(key), key);
        }

        return this;
    }

    applyDate(value, format = 'YYYY-MM-DD HH:mm:ss')
    {
        return this.apply(value, format, ['date', 'month', 'year']);
    }

    applyTime(value, format = 'YYYY-MM-DD HH:mm:ss')
    {
        return this.apply(value, format, ['hour', 'minute', 'second']);
    }

}

PicoNowGridInstance.prototype.addSecond = function (value) {
    console.warn('Now.addSecond() is deprecated, use Now.add(value, \'second\') instead.');
    return this.add(value, 'second');
}

PicoNowGridInstance.prototype.subSecond = function (value) {
    console.warn('Now.subSecond() is deprecated, use Now.sub(value, \'second\') instead.');
    return this.sub(value, 'second');
}

PicoNowGridInstance.prototype.addMinute = function (value) {
    console.warn('Now.addMinute() is deprecated, use Now.add(value, \'minute\') instead.');
    return this.add(value, 'minute');
}

PicoNowGridInstance.prototype.subMinute = function (value) {
    console.warn('Now.subMinute() is deprecated, use Now.sub(value, \'minute\') instead.');
    return this.sub(value, 'minute');
}

PicoNowGridInstance.prototype.addHour = function (value) {
    console.warn('Now.addHour() is deprecated, use Now.add(value, \'hour\') instead.');
    return this.add(value, 'hour');
}

PicoNowGridInstance.prototype.subHour = function (value) {
    console.warn('Now.subHour() is deprecated, use Now.sub(value, \'hour\') instead.');
    return this.sub(value, 'hour');
}

PicoNowGridInstance.prototype.addDates = function (value) {
    console.warn('Now.addDates() is deprecated, use Now.add(value, \'date\') instead.');
    return this.add(value, 'date');
}

PicoNowGridInstance.prototype.subDates = function (value) {
    console.warn('Now.subDates() is deprecated, use Now.sub(value, \'date\') instead.');
    return this.sub(value, 'date');
}

PicoNowGridInstance.prototype.addMonths = function (value) {
    console.warn('Now.addMonths() is deprecated, use Now.add(value, \'month\') instead.');
    return this.add(value, 'month');
}

PicoNowGridInstance.prototype.subMonths = function (value) {
    console.warn('Now.subMonths() is deprecated, use Now.sub(value, \'month\') instead.');
    return this.sub(value, 'month');
}

PicoNowGridInstance.prototype.addYears = function (value) {
    console.warn('Now.addYears() is deprecated, use Now.add(value, \'year\') instead.');
    return this.add(value, 'year');
}

PicoNowGridInstance.prototype.subYears = function (value) {
    console.warn('Now.subYears() is deprecated, use Now.sub(value, \'year\') instead.');
    return this.sub(value, 'year');
}

PicoNowGridInstance.prototype.addDecades = function (value) {
    console.warn('Now.addDecades() is deprecated, use Now.grid(10 * value, \'year\') instead.');
    return this.add(10 * value, 'year');
}

PicoNowGridInstance.prototype.subDecades = function (value) {
    console.warn('Now.subDecades() is deprecated, use Now.grid(10 * value, \'year\') instead.');
    return this.sub(10 * value, 'year');
}

PicoNowGridInstance.prototype.humanDay = function () {
    console.warn('Now.humanDay() is deprecated, use Now.day() instead.');
    return this.day();
}

PicoNowGridInstance.prototype.humanMonth = function () {
    console.warn('Now.humanMonth() is deprecated, use Now.month() instead.');
    return this.month();
}

export const PicoNowDefaultPlugin = function () {

    Obj.each(Mix.proto(PicoNowDefaultInstance), (fn, id) => {
        this.prototype[id] = fn;
    });

    return this;
}