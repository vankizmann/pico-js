import { Mix, Num, Arr, Hash, Str, Obj } from "#src/index.esm.js";

export class PicoNumber
{

    /**
     * Format number with decimals
     *
     * @example Num.fixed(1.234, 2) // => "1.23"
     * @example Num.fixed("2.4", 0) // => "2"
     *
     * @param {any} value Number value
     * @param {number} decimals Decimals count
     * @returns {string} Fixed string
     */
    static fixed(value, decimals = 2)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return value.toFixed(decimals);
    }

    /**
     * Parse value as float
     *
     * @example Num.float("2.2") // => 2.2
     * @example Num.float(3) // => 3
     *
     * @param {any} value Numeric value
     * @returns {number} Parsed float
     */
    static float(value)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return parseFloat(value);
    }

    /**
     * Parse value as int
     *
     * @example Num.int("12") // => 12
     * @example Num.int(12.9) // => 12
     *
     * @param {any} value Numeric value
     * @returns {number} Parsed int
     */
    static int(value)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return parseInt(value);
    }

    /**
     * Round up to integer
     *
     * @example Num.ceil(1.1) // => 2
     * @example Num.ceil("2.0") // => 2
     *
     * @param {any} value Numeric value
     * @returns {number} Ceil value
     */
    static ceil(value)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return Math.ceil(value);
    }

    /**
     * Round down to integer
     *
     * @example Num.floor(1.9) // => 1
     * @example Num.floor("2.0") // => 2
     *
     * @param {any} value Numeric value
     * @returns {number} Floor value
     */
    static floor(value)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return Math.floor(value);
    }

    /**
     * Round to nearest integer
     *
     * @example Num.round(1.5) // => 2
     * @example Num.round("2.2") // => 2
     *
     * @param {any} value Numeric value
     * @returns {number} Rounded value
     */
    static round(value)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return Math.round(value);
    }

    /**
     * Sum numbers in list
     *
     * @example Num.combine([1, 2]) // => 3
     * @example Num.combine([5, -2]) // => 3
     *
     * @param {Array<number>} value Number list
     * @returns {number} Sum value
     */
    static combine(value)
    {
        return Arr.reduce(value, (acc, val) => acc + val, 0);
    }

    /**
     * Subtract numbers in list
     *
     * @example Num.subtract([5, 2]) // => 3
     * @example Num.subtract([10, 3]) // => 7
     *
     * @param {Array<number>} value Number list
     * @returns {number} Result value
     */
    static subtract(value)
    {
        return Arr.reduce(value, (acc, val) => acc - val, 0);
    }

    /**
     * Get decade base (10s)
     *
     * @example Num.decade(27) // => 20
     * @example Num.decade("99") // => 90
     *
     * @param {any} value Numeric value
     * @returns {number} Decade value
     */
    static decade(value)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return Math.floor(value / 10) * 10;
    }

    /**
     * Convert number to power-of-2 list
     *
     * @example Num.matrix(5) // => [4, 1]
     * @example Num.matrix(8) // => [8]
     *
     * @param {number} num Input number
     * @param {number} [limit] Unused (legacy)
     * @param {Array<number>} [base] Result base
     * @returns {Array<number>} Power list
     */
    static matrix(num, limit = 10, base = [])
    {
        let value = 0;

        for ( let i = 20; i >= 0; i -- ) {
            if ( num >= (value = Math.pow(2, i)) ) {
                (base.push(value), num -= value);
            }
        }

        return base;
    }

    /**
     * Calculate distance between coords
     *
     * @example Num.distance({lat:0,lng:0},{lat:0,lng:1}) // => number
     *
     * @param {any} cord1 First coord
     * @param {any} cord2 Second coord
     * @param {boolean} [miles] Return miles if true
     * @returns {number} Distance value
     */
    static distance(cord1, cord2, miles = false)
    {
        let cord = { lat: 0, lng: 0 };

        [cord1, cord2] = [
            { ...cord, ...cord1 }, { ...cord, ...cord2 }
        ];

        let radlat1 = (Math.PI * this.float(cord1.lat)) / 180;
        let radlat2 = (Math.PI * this.float(cord2.lat)) / 180;

        let theta = this.float(cord1.lng) - this.float(cord2.lng);
        let radtheta = (theta) / 180;

        let dist = this.combine([
            Math.sin(radlat1) * Math.sin(radlat2),
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        ]);

        dist = (Math.acos(dist > 1 ? 1 : dist) * 180) /
            Math.PI * 60 * 1.1515;

        return miles ? dist * 1.609344 : dist;
    }

}

/**
 * @see PicoStr.number
 */
PicoNumber.format = (value, ...args) => {
    console.warn('Num.format() is deprecated, use Str.number() instead.');
    return Str.number(value, args[2] || null);
};

/**
 * @see PicoHash.number
 */
PicoNumber.random = (...args) => {
    console.warn('Num.random() is deprecated, use Hash.number() instead.');
    return Hash.number(...args);
};

export default PicoNumber;