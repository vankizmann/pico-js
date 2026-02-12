export class PicoNumber {
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
    static fixed(value: any, decimals?: number): string;
    /**
     * Parse value as float
     *
     * @example Num.float("2.2") // => 2.2
     * @example Num.float(3) // => 3
     *
     * @param {any} value Numeric value
     * @returns {number} Parsed float
     */
    static float(value: any): number;
    /**
     * Parse value as int
     *
     * @example Num.int("12") // => 12
     * @example Num.int(12.9) // => 12
     *
     * @param {any} value Numeric value
     * @returns {number} Parsed int
     */
    static int(value: any): number;
    /**
     * Round up to integer
     *
     * @example Num.ceil(1.1) // => 2
     * @example Num.ceil("2.0") // => 2
     *
     * @param {any} value Numeric value
     * @returns {number} Ceil value
     */
    static ceil(value: any): number;
    /**
     * Round down to integer
     *
     * @example Num.floor(1.9) // => 1
     * @example Num.floor("2.0") // => 2
     *
     * @param {any} value Numeric value
     * @returns {number} Floor value
     */
    static floor(value: any): number;
    /**
     * Round to nearest integer
     *
     * @example Num.round(1.5) // => 2
     * @example Num.round("2.2") // => 2
     *
     * @param {any} value Numeric value
     * @returns {number} Rounded value
     */
    static round(value: any): number;
    /**
     * Sum numbers in list
     *
     * @example Num.combine([1, 2]) // => 3
     * @example Num.combine([5, -2]) // => 3
     *
     * @param {Array<number>} value Number list
     * @returns {number} Sum value
     */
    static combine(value: Array<number>): number;
    /**
     * Subtract numbers in list
     *
     * @example Num.subtract([5, 2]) // => 3
     * @example Num.subtract([10, 3]) // => 7
     *
     * @param {Array<number>} value Number list
     * @returns {number} Result value
     */
    static subtract(value: Array<number>): number;
    /**
     * Get decade base (10s)
     *
     * @example Num.decade(27) // => 20
     * @example Num.decade("99") // => 90
     *
     * @param {any} value Numeric value
     * @returns {number} Decade value
     */
    static decade(value: any): number;
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
    static matrix(num: number, limit?: number, base?: Array<number>): Array<number>;
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
    static distance(cord1: any, cord2: any, miles?: boolean): number;
}
export namespace PicoNumber {
    /**
     * @see PicoStr.number
     */
    function format(value: any, ...args: any[]): any;
    /**
     * @see PicoHash.number
     */
    function random(...args: any[]): number;
}
export default PicoNumber;
