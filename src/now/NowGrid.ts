import { Arr } from "../index.esm.ts";
import { PicoNowInterface } from "../utils/Now.ts";
import PicoNowWalker from "./NowWalker.js";

export interface PicoNowGrid extends PicoNowInterface,
PicoNowWalker
{
    //
}

/**
 * @memberof PicoNow
 */
export class PicoNowGrid
{
    /**
     * Get grid of dates by scope
     *
     * @example Now.grid("month") // => [Now, Now, ...]
     *
     * @param {string} [scope] Grid scope
     * @returns {Array<PicoNowInterface>} Array of dates
     */
    grid(scope : string = 'day') : Array<PicoNowInterface>
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
     * @returns {Array<PicoNowInterface>} Array of dates
     */
    getSecondsGrid(interval : number = 1) : Array<PicoNowInterface>
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
     * @returns {Array<PicoNowInterface>} Array of dates
     */
    getMinutesGrid(interval : number = 1) : Array<PicoNowInterface>
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
     * @returns {Array<PicoNowInterface>} Array of dates
     */
    getHoursGrid(interval : number = 1) : Array<PicoNowInterface>
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
     * @returns {Array<PicoNowInterface>} Array of dates
     */
    getDaysGrid() : Array<PicoNowInterface>
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
     * @returns {Array<PicoNowInterface>} Array of dates
     */
    getDatesGrid() : Array<PicoNowInterface>
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
     * @returns {Array<PicoNowInterface>} Array of dates
     */
    getMonthsGrid() : Array<PicoNowInterface>
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
     * @returns {Array<PicoNowInterface>} Array of dates
     */
    getYearsGrid() : Array<PicoNowInterface>
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
     * @returns {Array<PicoNowInterface>} Array of dates
     */
    getDecadesGrid() : Array<PicoNowInterface>
    {
        let dates = [
            this.first('decade'), this.clone().last('decade')
        ];

        return dates[0].range(dates[1], 'decade');
    }

}

/**
 * @deprecated use Now.grid instead
 */
// @ts-ignore
PicoNowGrid.prototype.getYears = function() : Array<PicoNowInterface> {
    console.warn('Now.getYears() is deprecated, use Now.grid(\'years\') instead.');
    return this.grid('years');
};

/**
 * @deprecated use Now.grid instead
 */
// @ts-ignore
PicoNowGrid.prototype.getMonths = function() : Array<PicoNowInterface> {
    console.warn('Now.getMonths() is deprecated, use Now.grid(\'months\') instead.');
    return this.grid('months');
};

/**
 * @deprecated use Now.grid instead
 */
// @ts-ignore
PicoNowGrid.prototype.getDates = function() : Array<PicoNowInterface> {
    console.warn('Now.getDates() is deprecated, use Now.grid(\'dates\') instead.');
    return this.grid('dates');
};

/**
 * @deprecated use Now.grid instead
 */
// @ts-ignore
PicoNowGrid.prototype.getHours = function() : Array<PicoNowInterface> {
    console.warn('Now.getHours() is deprecated, use Now.grid(\'hours\') instead.');
    return this.grid('hours');
};

/**
 * @deprecated use Now.grid instead
 */
// @ts-ignore
PicoNowGrid.prototype.getMinutes = function() : Array<PicoNowInterface> {
    console.warn('Now.getMinutes() is deprecated, use Now.grid(\'minutes\') instead.');
    return this.grid('minutes');
};

/**
 * @deprecated use Now.grid instead
 */
// @ts-ignore
PicoNowGrid.prototype.getSeconds = function() : Array<PicoNowInterface> {
    console.warn('Now.getSeconds() is deprecated, use Now.grid(\'seconds\') instead.');
    return this.grid('seconds');
};

export default PicoNowGrid;