import { Arr, Mix, Num, Obj, Str } from "#src/index.esm.js";

/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowGridInstance
{
    grid(scope = 'day')
    {
        if ( /^seconds?$/i.test(scope) ) {
            return this.getSecondsGrid();
        }

        if ( /^minutes?$/i.test(scope) ) {
            return this.getMinutesGrid();
        }

        if ( /^hours?$/i.test(scope) ) {
            return this.getHoursGrid();
        }

        if ( /^days?$/i.test(scope) ) {
            return this.getDaysGrid();
        }

        if ( /^dates?$/i.test(scope) ) {
            return this.getDatesGrid();
        }

        if ( /^months?$/i.test(scope) ) {
            return this.getMonthsGrid();
        }

        if ( /^years?$/i.test(scope) ) {
            return this.getYearsGrid();
        }

        if ( /^decades?$/i.test(scope) ) {
            return this.getDecadesGrid();
        }

        throw new Error(`Invalid grid scope type "${scope}".`);
    }

    getSecondsGrid(interval = 1)
    {
        if ( interval == null ) {
            interval = 1;
        }

        return Arr.make(60 / interval, (i) => {
            return this.clone().second(i * interval);
        });
    }


    getMinutesGrid(interval = 1)
    {
        if ( interval == null ) {
            interval = 1;
        }

        return Arr.make(60 / interval, (i) => {
            return this.clone().minute(i * interval);
        });
    }

    getHoursGrid(interval = 1)
    {
        if ( interval == null ) {
            interval = 1;
        }

        return Arr.make(24 / interval, (i) => {
            return this.clone().hour(i * interval);
        });
    }

    getDaysGrid()
    {
        let dates = [
            this.first('date').first('day'), this.last('date').last('day')
        ];

        return dates[0].range(dates[1], 'date');
    }

    getDatesGrid()
    {
        let dates = [
            this.first('date'), this.last('date')
        ];

        return dates[0].range(dates[1], 'date');
    }

    getMonthsGrid()
    {
        let dates = [
            this.first('month'), this.last('month')
        ];

        return dates[0].range(dates[1], 'month');
    }

    getYearsGrid()
    {
        let dates = [
            this.first('year'), this.clone().last('year')
        ];

        return dates[0].range(dates[1], 'year');
    }

    getDecadesGrid()
    {
        let dates = [
            this.first('decade'), this.clone().last('decade')
        ];

        return dates[0].range(dates[1], 'decade');
    }

}

PicoNowGridInstance.prototype.getYears = function () {
    console.warn('Now.getYears() is deprecated, use Now.grid(\'years\') instead.');
    return this.grid('years');
}

PicoNowGridInstance.prototype.getMonths = function () {
    console.warn('Now.getMonths() is deprecated, use Now.grid(\'months\') instead.');
    return this.grid('months');
}

PicoNowGridInstance.prototype.getDates = function () {
    console.warn('Now.getDates() is deprecated, use Now.grid(\'dates\') instead.');
    return this.grid('dates');
}

PicoNowGridInstance.prototype.getHours = function () {
    console.warn('Now.getHours() is deprecated, use Now.grid(\'hours\') instead.');
    return this.grid('hours');
}

PicoNowGridInstance.prototype.getMinutes = function () {
    console.warn('Now.getMinutes() is deprecated, use Now.grid(\'minutes\') instead.');
    return this.grid('minutes');
}

PicoNowGridInstance.prototype.getSeconds = function () {
    console.warn('Now.getSeconds() is deprecated, use Now.grid(\'seconds\') instead.');
    return this.grid('seconds');
}

export const PicoNowGridPlugin = function () {

    Obj.each(Mix.proto(PicoNowGridInstance), (fn, id) => {
        this.prototype[id] = fn;
    });

    return this;
}