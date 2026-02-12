export namespace MIX_REGEX {
    let iso: RegExp;
}
export class PicoMixed {
    /**
     * Check if the value is empty
     *
     * @example Mix.isEmpty('') // => true
     * @example Mix.isEmpty(null) // => true
     * @example Mix.isEmpty([]) // => true
     * @example Mix.isEmpty({}) // => true
     * @example Mix.isEmpty(false) // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Returns true if value is not empty
     */
    static isEmpty(value: any): boolean;
    /**
     * Check if the value is null
     *
     * @example Mix.isNull(null) // => true
     * @example Mix.isNull(undefined) // => false
     * @example Mix.isNull(0) // => false
     * @example Mix.isNull('') // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Return true if null
     */
    static isNull(value: any): boolean;
    /**
     * Check if the value is undefined
     *
     * @example Mix.isUndef(undefined) // => true
     * @example Mix.isUndef(null) // => false
     * @example Mix.isUndef(0) // => false
     * @example Mix.isUndef('') // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Return true if undefined
     */
    static isUndef(value: any): boolean;
    /**
     * Check if the value is null or undefined
     *
     * @example Mix.isNix(null) // => true
     * @example Mix.isNix(undefined) // => true
     * @example Mix.isNix(0) // => false
     * @example Mix.isNix('') // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Return true if null or undefined
     */
    static isNix(value: any): boolean;
    /**
     * Check if the value is string or number
     *
     * @example Mix.isPrim('foo') // => true
     * @example Mix.isPrim(2.2) // => true
     * @example Mix.isPrim([]) // => false
     * @example Mix.isPrim(null) // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Return true if typeof string or number
     */
    static isPrim(value: any): boolean;
    /**
     * @see PicoMixed.isPrim
     */
    static isPrimitive: typeof PicoMixed.isPrim;
    /**
     * Check if the value is a string
     *
     * @example Mix.isStr('foo') // => true
     * @example Mix.isStr(1) // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Return true if is string
     */
    static isStr(value: any): boolean;
    /**
     * @see PicoMixed.isStr
     */
    static isString: typeof PicoMixed.isStr;
    /**
     * Check if the value is a number
     *
     * @example Mix.isNum(12.2) // => true
     * @example Mix.isNum('-4.3') // => true
     * @example Mix.isNum('13f') // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Return true if is number
     */
    static isNum(value: any): boolean;
    /**
     * @see PicoMixed.isNum
     */
    static isNumber: typeof PicoMixed.isNum;
    /**
     * Check if the value is an integer
     *
     * @example Mix.isInt(12) // => true
     * @example Mix.isInt('4') // => true
     * @example Mix.isInt('-4.3') // => false
     * @example Mix.isInt(3.4) // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Return true if is integer
     */
    static isInt(value: any): boolean;
    /**
     * @see PicoMixed.isInt
     */
    static isInteger: typeof PicoMixed.isInt;
    /**
     * Check if the value is a boolean
     *
     * @example Mix.isBool(false) // => true
     * @example Mix.isBool('true') // => true
     * @example Mix.isBool(1) // => false
     * @example Mix.isBool('1') // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Return true if is boolean
     */
    static isBool(value: any): boolean;
    /**
     * @see PicoMixed.isBool
     */
    static isBoolean: typeof PicoMixed.isBool;
    /**
     * Check if the value is a function
     *
     * @example Mix.isFunc(() => {}) // => true
     * @example Mix.isFunc(Mix.isFunc) // => true
     * @example Mix.isFunc({}) // => false
     * @example Mix.isFunc('1') // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Return true if is function
     */
    static isFunc(value: any): boolean;
    /**
     * @see PicoMixed.isFunc
     */
    static isFunction: typeof PicoMixed.isFunc;
    /**
     * Check if the value is object
     *
     * @example Mix.isRef({}) // => true
     * @example Mix.isRef([]) // => true
     * @example Mix.isRef(() => {}) // => false
     * @example Mix.isRef(null) // => false
     * @example Mix.isRef(undefined) // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Returns true if is an object
     */
    static isRef(value: any): boolean;
    /**
     * @see PicoMixed.isRef
     */
    static isReference: typeof PicoMixed.isRef;
    /**
     * Check if the value is plain object
     *
     * @example Mix.isObj({}) // => true
     * @example Mix.isObj([]) // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Returns true if is plain object
     */
    static isObj(value: any): boolean;
    /**
     * @see PicoMixed.isObj
     */
    static isObject: typeof PicoMixed.isObj;
    /**
     * Check if the value is array object
     *
     * @example Mix.isArr([]) // => true
     * @example Mix.isArr({}) // => false
     *
     * @param {any} value The Value to test
     * @returns {boolean} Returns true if is array object
     */
    static isArr(value: any): boolean;
    /**
     * @see PicoMixed.isArr
     */
    static isArray: typeof PicoMixed.isArr;
    /**
     * Check if the value is iterable object
     *
     * @example Mix.isIter(new FormData()) // => true
     * @example Mix.isIter({}) // => false
     *
     * @param {any} value The Value to test
     * @returns {boolean} Returns true if is iterable object
     */
    static isIter(value: any): boolean;
    /**
     * @see PicoMixed.isIter
     */
    static isIterable: typeof PicoMixed.isIter;
    /**
     * Check if the value is iso date
     *
     * @example Mix.isIsoDate(new Date()) // => true
     * @example Mix.isIsoDate(new Date()) // => true
     * @example Mix.isIsoDate('2023-01-01 00:00:00') // => true
     *
     * @param {any} value The Value to test
     * @returns {boolean} Returns true if is iso date
     */
    static isIsoDate(value: any): boolean;
    /**
     * Check if the value is valid date
     *
     * @example Mix.isIsoDate(new Date()) // => true
     * @example Mix.isIsoDate('2023-01-01') // => true
     * @example Mix.isIsoDate('2023-01-01 00:00:00') // => false
     *
     * @param {any} value The Value to test
     * @returns {boolean} Returns true if is valid date
     */
    static isDate(value: any): boolean;
    /**
     * Check if the value is valid time
     *
     * @example Mix.isIsoDate(new Date()) // => true
     * @example Mix.isIsoDate('00:00:00') // => true
     * @example Mix.isIsoDate('2023-01-01 00:00:00') // => false
     *
     * @param {any} value The Value to test
     * @returns {boolean} Returns true if is valid time
     */
    static isTime(value: any): boolean;
    /**
     * Check if value is equal
     *
     * @example Mix.isEqual(el, el) // => true
     *
     * @param {any} obj Source value
     * @param {any} val Compare value
     * @returns {boolean} True if equal
     */
    static isEqual(obj: any, val: any): boolean;
    /**
     * Convert iterable object to a regular object
     *
     * @example Mix.iter(new FormData()) // => {}
     *
     * @param {any} value Value to convert
     * @returns {Record<string, any>} Converted object
     */
    static iter(value: any): Record<string, any>;
    /**
     * Get keys of an object
     *
     * @example Mix.keys({a: 'v1', b: 'v2'}) // => ['a', 'b']
     * @example Mix.keys(['v1', 'v2']) // => ['0', '1']
     *
     * @param {any} value Object to iterate
     * @returns {Array<any>} Returns array with keys
     */
    static keys(value: any): Array<any>;
    /**
     * Get values of an object
     *
     * @example Mix.vals({a: 'v1', b: 'v2'}) // => ['v1', 'v2']
     * @example Mix.vals(['v1', 'v2']) // => ['v1', 'v2']
     *
     * @param {any} value Object to iterate
     * @returns {Array<any>} Returns array with values
     */
    static vals(value: any): Array<any>;
    /**
     * Cast to array
     *
     * @example Mix.nodes(nodeList) // => []
     *
     * @param {any} value Source value
     * @returns {Array<any>} Array result
     */
    static nodes(value: any): Array<any>;
    /**
     * Get own props excluding keys
     *
     * @example Mix.props(Math, ["PI"]) // => {}
     *
     * @param {any} value Source object
     * @param {Array<any>} [exclude] Exclude keys
     * @returns {Record<string, any>} Props map
     */
    static props(value: any, exclude?: Array<any>): Record<string, any>;
    /**
     * Get static class props
     *
     * @example Mix.class(MyClass) // => {}
     *
     * @param {any} value Source class
     * @param {Array<any>} [exclude] Exclude keys
     * @returns {Record<string, any>} Props map
     */
    static class(value: any, exclude?: Array<any>): Record<string, any>;
    /**
     * Get prototype props
     *
     * @example Mix.proto(MyClass) // => {}
     *
     * @param {any} value Source class
     * @param {Array<any>} [exclude] Exclude keys
     * @returns {Record<string, any>} Props map
     */
    static proto(value: any, exclude?: Array<any>): Record<string, any>;
    /**
     * Create form data
     *
     * @example Mix.form({ a: 1 }) // => FormData
     *
     * @param {any} value Source object
     * @returns {FormData} Form instance
     */
    static form(value: any): FormData;
    /**
     * Loop over items
     *
     * @example Mix.vals(FormData, (val, key) => null) // => Mix
     * @example Mix.vals(NodeList, (val, key) => null) // => Mix
     *
     * @param {any} value Value to loop
     * @param {function} cb Callback for each loop
     * @returns {PicoMixed} Returns Mix instance
     */
    static each(value: any, cb: Function): PicoMixed;
    /**
     * Get length of value
     *
     * @example Mix.len({a: 'v1', b: 'v2'}) // => 2
     * @example Mix.len(['v1', 'v2']) // => 2
     * @example Mix.len('foobar') // => 6
     * @example Mix.len(12) // => 2
     *
     * @param {any} value The value to count
     * @returns {number} Returns length of value
     */
    static len(value: any): number;
    /**
     * @see PicoMixed.length
     */
    static length: typeof PicoMixed.len;
    /**
     * Compare two objects (used for natural array sort)
     *
     * @param {any} value First compare value
     * @param {any} compare Second compare value
     * @returns {number} Returns sort position
     */
    static compare(value: any, compare: any): number;
    /**
     * Get value as null
     *
     * @example Mix.null("null") // => null
     *
     * @param {any} value Input value
     * @param {any} [fallback] Fallback value
     * @returns {any} Null or fallback
     */
    static null(value: any, fallback?: any): any;
    /**
     * Cast to array
     *
     * @example Mix.arr("a,b") // => ["a", "b"]
     *
     * @param {any} value Source value
     * @returns {Array<any>} Array result
     */
    static arr(value: any): Array<any>;
    /**
     * @see PicoMixed.arr
     */
    static array: typeof PicoMixed.arr;
    /**
     * Convert value to string
     *
     * @example Mix.str('foobar') // => 'foobar'
     * @example Mix.str(12) // => '12'
     * @example Mix.str(true) // => 'true'
     * @example Mix.str(null) // => 'null'
     * @example Mix.str(undefined) // => 'undefined'
     *
     * @param {any} value The value to convert
     * @returns {string} Return value as string
     */
    static str(value: any): string;
    /**
     * @see PicoMixed.str
     */
    static string: typeof PicoMixed.str;
    /**
     * Convert value to number
     *
     * @example Mix.num('-2.2') // => -2.2
     * @example Mix.num(12) // => 12
     * @example Mix.num('foobar') // => NaN
     * @example Mix.num(true) // => NaN
     *
     * @param {any} value The value to convert
     * @param {any} fallback Fallback incase it is not primitive
     * @returns {number|any} Return value as number
     */
    static num(value: any, fallback?: any): number | any;
    /**
     * @see PicoMixed.num
     */
    static number: typeof PicoMixed.num;
    /**
     * Convert value to integer
     *
     * @example Mix.int('-2.2') // => -2
     * @example Mix.int(12) // => 12
     * @example Mix.int('foobar') // => NaN
     * @example Mix.int(true) // => NaN
     *
     * @param {any} value The value to convert
     * @param {any} fallback Fallback incase it is not primitive
     * @returns {number|any} Return value as integer
     */
    static int(value: any, fallback?: any): number | any;
    /**
     * @see PicoMixed.int
     */
    static integer: typeof PicoMixed.int;
    /**
     * Convert value to boolean
     *
     * @example Mix.int(true) // => true
     * @example Mix.int(12) // => true
     * @example Mix.int(0) // => false
     * @example Mix.int('yes') // => true
     * @example Mix.int('foobar') // => false
     * @example Mix.int(['v1']) // => true
     * @example Mix.int({}) // => false
     *
     * @param {any} value The value to convert
     * @returns {boolean} Return value as boolean
     */
    static bool(value: any): boolean;
    /**
     * @see PicoMixed.bool
     */
    static boolean: typeof PicoMixed.bool;
}
export namespace PicoMixed {
    function global(...args: any[]): any;
    function isPlain(...args: any[]): boolean;
    function float(...args: any[]): any;
    function delay(...args: any[]): Function;
    function async(...args: any[]): typeof import("./Runner.js").PicoRunner;
    function debounce(...args: any[]): Function;
    function throttle(...args: any[]): Function;
    function framerate(...args: any[]): Function;
    function convertString(...args: any[]): any;
    function convertDatetime(...args: any[]): any;
    function convertBool(...args: any[]): string;
    function convertBoolean(...args: any[]): string;
}
export default PicoMixed;
