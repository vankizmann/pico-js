import { Arr, Mix, Num, Obj, Str } from "#src/index.esm.js";

/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowGridInstance
{
    /**
     * Get grid of dates by scope
     *
     * @example Now.grid("month") // => [Now, Now, ...]
     *
     * @param {string} [scope] Grid scope
     * @returns {Array<PicoNow>} Array of dates
     */
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

    /**
     * Get seconds grid
     *
     * @example Now.getSecondsGrid(10)
     *
     * @param {number} [interval] Step interval
     * @returns {Array<PicoNow>} Array of dates
     */
    getSecondsGrid(interval = 1)
    {
        if ( interval == null ) {
            interval = 1;
        }

        return Arr.make(60 / interval, (i) => {
            return this.clone().second(i * interval);
        });
    }

    /**
     * Get minutes grid
     *
     * @example Now.getMinutesGrid(10)
     *
     * @param {number} [interval] Step interval
     * @returns {Array<PicoNow>} Array of dates
     */
    getMinutesGrid(interval = 1)
    {
        if ( interval == null ) {
            interval = 1;
        }

        return Arr.make(60 / interval, (i) => {
            return this.clone().minute(i * interval);
        });
    }

    /**
     * Get hours grid
     *
     * @example Now.getHoursGrid(2)
     *
     * @param {number} [interval] Step interval
     * @returns {Array<PicoNow>} Array of dates
     */
    getHoursGrid(interval = 1)
    {
        if ( interval == null ) {
            interval = 1;
        }

        return Arr.make(24 / interval, (i) => {
            return this.clone().hour(i * interval);
        });
    }

    /**
     * Get days grid
     *
     * @example Now.getDaysGrid()
     *
     * @returns {Array<PicoNow>} Array of dates
     */
    getDaysGrid()
    {
        let dates = [
            this.first('date').first('day'), this.last('date').last('day')
        ];

        return dates[0].range(dates[1], 'date');
    }

    /**
     * Get dates grid
     *
     * @example Now.getDatesGrid()
     *
     * @returns {Array<PicoNow>} Array of dates
     */
    getDatesGrid()
    {
        let dates = [
            this.first('date'), this.last('date')
        ];

        return dates[0].range(dates[1], 'date');
    }

    /**
     * Get months grid
     *
     * @example Now.getMonthsGrid()
     *
     * @returns {Array<PicoNow>} Array of dates
     */
    getMonthsGrid()
    {
        let dates = [
            this.first('month'), this.last('month')
        ];

        return dates[0].range(dates[1], 'month');
    }

    /**
     * Get years grid
     *
     * @example Now.getYearsGrid()
     *
     * @returns {Array<PicoNow>} Array of dates
     */
    getYearsGrid()
    {
        let dates = [
            this.first('year'), this.clone().last('year')
        ];

        return dates[0].range(dates[1], 'year');
    }

    /**
     * Get decades grid
     *
     * @example Now.getDecadesGrid()
     *
     * @returns {Array<PicoNow>} Array of dates
     */
    getDecadesGrid()
    {
        let dates = [
            this.first('decade'), this.clone().last('decade')
        ];

        return dates[0].range(dates[1], 'decade');
    }

}

/**
 * @see PicoNow.grid
 */
PicoNowGridInstance.prototype.getYears = function () {
    console.warn('Now.getYears() is deprecated, use Now.grid(\'years\') instead.');
    return this.grid('years');
}

/**
 * @see PicoNow.grid
 */
PicoNowGridInstance.prototype.getMonths = function () {
    console.warn('Now.getMonths() is deprecated, use Now.grid(\'months\') instead.');
    return this.grid('months');
}

/**
 * @see PicoNow.grid
 */
PicoNowGridInstance.prototype.getDates = function () {
    console.warn('Now.getDates() is deprecated, use Now.grid(\'dates\') instead.');
    return this.grid('dates');
}

/**
 * @see PicoNow.grid
 */
PicoNowGridInstance.prototype.getHours = function () {
    console.warn('Now.getHours() is deprecated, use Now.grid(\'hours\') instead.');
    return this.grid('hours');
}

/**
 * @see PicoNow.grid
 */
PicoNowGridInstance.prototype.getMinutes = function () {
    console.warn('Now.getMinutes() is deprecated, use Now.grid(\'minutes\') instead.');
    return this.grid('minutes');
}

/**
 * @see PicoNow.grid
 */
PicoNowGridInstance.prototype.getSeconds = function () {
    console.warn('Now.getSeconds() is deprecated, use Now.grid(\'seconds\') instead.');
    return this.grid('seconds');
}

/**
 * @returns {typeof import('#src/utils/Now.js').PicoNow}
 */
export const PicoNowGridPlugin = function (self) {

    Obj.each(Mix.proto(PicoNowGridInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    return self;
}