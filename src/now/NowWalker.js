import { Mix, Now, Obj } from "#src/index.esm.js";

/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowWalkerInstance
{

    prev(scope = 'date')
    {
        if ( /^days?$/i.test(scope) ) {
            scope = 'date';
        }

        if ( /^decades?$/i.test(scope) ) {
            return this.clone().sub(10, 'year');
        }

        return this.clone().sub(1, scope);
    }

    next(scope = 'day')
    {
        if ( /^days?$/i.test(scope) ) {
            scope = 'date';
        }

        if ( /^decades?$/i.test(scope) ) {
            return this.clone().add(10, 'year');
        }

        return this.clone().add(1, scope);
    }

    prevSecond()
    {
        return this.prev('second');
    }

    nextSecond()
    {
        return this.next('second');
    }

    prevMinute()
    {
        return this.prev('minute');
    }

    nextMinute()
    {
        return this.next('minute');
    }

    prevHour()
    {
        return this.prev('hour');
    }

    nextHour()
    {
        return this.next('hour');
    }

    prevDate()
    {
        return this.prev('date');
    }

    nextDate()
    {
        return this.next('date');
    }

    prevMonth()
    {
        return this.prev('month');
    }

    nextMonth()
    {
        return this.next('month');
    }

    prevYear()
    {
        return this.prev('year');
    }

    nextYear()
    {
        return this.next('year');
    }

    prevDecade()
    {
        return this.prev('decade');
    }

    nextDecade()
    {
        return this.next('decade');
    }

    first(scope = 'date')
    {
        if ( /^seconds?$/i.test(scope) ) {
            return this.firstSecond();
        }

        if ( /^minutes?$/i.test(scope) ) {
            return this.firstMinute();
        }

        if ( /^hours?$/i.test(scope) ) {
            return this.firstHour();
        }

        if ( /^days?$/i.test(scope) ) {
            return this.firstDay();
        }

        if ( /^dates?$/i.test(scope) ) {
            return this.firstDate();
        }

        if ( /^months?$/i.test(scope) ) {
            return this.firstMonth();
        }

        if ( /^years?$/i.test(scope) ) {
            return this.firstYear();
        }

        if ( /^decades?$/i.test(scope) ) {
            return this.firstDecade();
        }

        throw new Error(`Invalid first scope type "${scope}".`);
    }

    last(scope = 'date')
    {
        if ( /^seconds?$/i.test(scope) ) {
            return this.lastSecond();
        }

        if ( /^minutes?$/i.test(scope) ) {
            return this.lastMinute();
        }

        if ( /^hours?$/i.test(scope) ) {
            return this.lastHour();
        }

        if ( /^days?$/i.test(scope) ) {
            return this.lastDay();
        }

        if ( /^dates?$/i.test(scope) ) {
            return this.lastDate();
        }

        if ( /^months?$/i.test(scope) ) {
            return this.lastMonth();
        }

        if ( /^years?$/i.test(scope) ) {
            return this.lastYear();
        }

        if ( /^decades?$/i.test(scope) ) {
            return this.lastDecade();
        }

        throw new Error(`Invalid last scope type "${scope}".`);
    }

    firstSecond()
    {
        return this.clone().set(0, 'second');
    }

    lastSecond()
    {
        return this.clone().set(59, 'second');
    }

    firstMinute()
    {
        return this.clone().set(0, 'minute');
    }

    lastMinute()
    {
        return this.clone().set(59, 'minute');
    }

    firstHour()
    {
        return this.clone().set(0, 'hour');
    }

    lastHour()
    {
        return this.clone().set(23, 'hour');
    }

    firstDay()
    {
        return this.clone().set(0, 'day');
    }

    lastDay()
    {
        return this.clone().set(6, 'day');
    }

    firstDate()
    {
        return this.clone().set(1, 'date');
    }

    lastDate()
    {
        return this.clone().next('month').set(0, 'date');
    }

    firstMonth()
    {
        return this.clone().set(1, 'month');
    }

    lastMonth()
    {
        return this.clone().set(12, 'month');
    }

    nthYear(n = 0)
    {
        let year = Math.floor(this.year() / 10) * 10;

        return this.clone().set(year + n, 'year');
    }

    firstYear()
    {
        return this.nthYear(0);
    }

    lastYear()
    {
        return this.nthYear(9);
    }

    nthDecade(n = 0)
    {
        let year = Math.floor(this.year() / 100) * 100;

        return this.clone().set(year + (n * 10), 'year');
    }

    firstDecade()
    {
        return this.nthDecade(0);
    }

    lastDecade()
    {
        return this.nthDecade(9);
    }

}

export const PicoNowWalkerPlugin = function () {

    Obj.each(Mix.proto(PicoNowWalkerInstance), (fn, id) => {
        this.prototype[id] = fn;
    });

    return this;
}