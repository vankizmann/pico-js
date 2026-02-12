import { Arr, go, Mix, Run, Now, Locale, Str, Obj } from "#src/index.esm.js";

export const MIX_REGEX = {
    'iso': /^\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/,
};

export class PicoMixed
{
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
    static isEmpty(value)
    {
        if ( value == null ) {
            return true;
        }

        if ( typeof value === 'string' ) {
            return value === '';
        }

        if ( typeof value === 'number' ) {
            return false;
        }

        if ( typeof value === 'boolean' ) {
            return false;
        }

        if ( this.isArr(value) ) {
            return value.length === 0;
        }

        return this.len(value) === 0;
    }

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
    static isNull(value)
    {
        return value === null;
    }

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
    static isUndef(value)
    {
        return value === undefined;
    }

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
    static isNix(value)
    {
        return value === undefined || value === null;
    }

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
    static isPrim(value)
    {
        return typeof value === 'string' || typeof value === 'number';
    }

    /**
     * @see PicoMixed.isPrim
     */
    static isPrimitive = PicoMixed.isPrim;

    /**
     * Check if the value is a string
     *
     * @example Mix.isStr('foo') // => true
     * @example Mix.isStr(1) // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Return true if is string
     */
    static isStr(value)
    {
        return typeof value === 'string';
    }

    /**
     * @see PicoMixed.isStr
     */
    static isString = PicoMixed.isStr;

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
    static isNum(value)
    {
        if ( typeof value === 'number' ) {
            return true;
        }

        if ( this.isStr(value) ) {
            return /^-?[0-9]+(\.[0-9]+)?$/.test(value);
        }

        return false;
    }

    /**
     * @see PicoMixed.isNum
     */
    static isNumber = PicoMixed.isNum;

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
    static isInt(value)
    {
        if ( !this.isNum(value) ) {
            return false;
        }

        if ( this.isStr(value) ) {
            return /^-?[0-9]+$/.test(value);
        }

        return parseInt(value) === parseFloat(value);
    }

    /**
     * @see PicoMixed.isInt
     */
    static isInteger = PicoMixed.isInt;

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
    static isBool(value)
    {
        if ( typeof value === 'boolean' ) {
            return true;
        }

        if ( this.isStr(value) ) {
            return /^(true|false)$/.test(value);
        }

        return false;
    }

    /**
     * @see PicoMixed.isBool
     */
    static isBoolean = PicoMixed.isBool;

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
    static isFunc(value)
    {
        return typeof value === 'function';
    }

    /**
     * @see PicoMixed.isFunc
     */
    static isFunction = PicoMixed.isFunc;

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
    static isRef(value)
    {
        if ( value == null ) {
            return false;
        }

        return typeof value === 'object';
    }

    /**
     * @see PicoMixed.isRef
     */
    static isReference = PicoMixed.isRef;

    /**
     * Check if the value is plain object
     *
     * @example Mix.isObj({}) // => true
     * @example Mix.isObj([]) // => false
     *
     * @param {any} value The value to test
     * @returns {boolean} Returns true if is plain object
     */
    static isObj(value)
    {
        if ( value == null ) {
            return false;
        }

        return Object.getPrototypeOf(value) === Object.prototype;
    }

    /**
     * @see PicoMixed.isObj
     */
    static isObject = PicoMixed.isObj;

    /**
     * Check if the value is array object
     *
     * @example Mix.isArr([]) // => true
     * @example Mix.isArr({}) // => false
     *
     * @param {any} value The Value to test
     * @returns {boolean} Returns true if is array object
     */
    static isArr(value)
    {
        if ( value == null ) {
            return false;
        }

        return Object.getPrototypeOf(value) === Array.prototype;
    }

    /**
     * @see PicoMixed.isArr
     */
    static isArray = PicoMixed.isArr;

    /**
     * Check if the value is iterable object
     *
     * @example Mix.isIter(new FormData()) // => true
     * @example Mix.isIter({}) // => false
     *
     * @param {any} value The Value to test
     * @returns {boolean} Returns true if is iterable object
     */
    static isIter(value)
    {
        if ( this.isArr(value) ) {
            return false;
        }

        if ( !this.isRef(value) ) {
            return false;
        }

        return this.isFunc(value.entries);
    }

    /**
     * @see PicoMixed.isIter
     */
    static isIterable = PicoMixed.isIter;

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
    static isIsoDate(value)
    {
        if ( value instanceof Date ) {
            return true;
        }

        return MIX_REGEX.iso.test(value);
    }

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
    static isDate(value)
    {
        if ( value instanceof Date ) {
            return true;
        }

        return /^\d{4}-\d{2}-\d{2}$/.test(value);
    }

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
    static isTime(value)
    {
        if ( value instanceof Date ) {
            return true;
        }

        return /^\d{2}:\d{2}:\d{2}$/.test(value);
    }

    /**
     * Check if value is equal
     *
     * @example Mix.isEqual(el, el) // => true
     *
     * @param {any} obj Source value
     * @param {any} val Compare value
     * @returns {boolean} True if equal
     */
    static isEqual(obj, val)
    {
        if ( obj instanceof Node ) {
            return obj.isEqualNode(val);
        }

        if ( this.isRef(obj) ) {
            return Object.is(obj, val)
        }

        return obj === val;
    }

    /**
     * Convert iterable object to a regular object
     *
     * @example Mix.iter(new FormData()) // => {}
     *
     * @param {any} value Value to convert
     * @returns {Record<string, any>} Converted object
     */
    static iter(value)
    {
        if ( value == null ) {
            return {};
        }

        let result = {};

        for ( const [key, val] of value.entries() ) {
            result[key] = val;
        }

        return result;
    }

    /**
     * Get keys of an object
     *
     * @example Mix.keys({a: 'v1', b: 'v2'}) // => ['a', 'b']
     * @example Mix.keys(['v1', 'v2']) // => ['0', '1']
     *
     * @param {any} value Object to iterate
     * @returns {Array<any>} Returns array with keys
     */
    static keys(value)
    {
        if ( value == null ) {
            return [];
        }

        if ( this.isIter(value) ) {
            value = this.iter(value);
        }

        return Object.keys(value);
    }

    /**
     * Get values of an object
     *
     * @example Mix.vals({a: 'v1', b: 'v2'}) // => ['v1', 'v2']
     * @example Mix.vals(['v1', 'v2']) // => ['v1', 'v2']
     *
     * @param {any} value Object to iterate
     * @returns {Array<any>} Returns array with values
     */
    static vals(value)
    {
        if ( value == null ) {
            return [];
        }

        if ( this.isIter(value) ) {
            value = this.iter(value);
        }

        if ( this.isArr(value) || !go().chrome ) {
            return Object.values(value);
        }

        let keys = this.keys(value);

        for ( let i = 0; i < keys.length; i ++ ) {
            keys[i] = value[keys[i]];
        }

        return keys;
    }

    /**
     * Cast to array
     *
     * @example Mix.nodes(nodeList) // => []
     *
     * @param {any} value Source value
     * @returns {Array<any>} Array result
     */
    static nodes(value)
    {
        return Array.prototype.slice.call(value);
    }

    /**
     * Get own props excluding keys
     *
     * @example Mix.props(Math, ["PI"]) // => {}
     *
     * @param {any} value Source object
     * @param {Array<any>} [exclude] Exclude keys
     * @returns {Record<string, any>} Props map
     */
    static props(value, exclude = [])
    {
        let result = {};

        for ( const key of Object.getOwnPropertyNames(value) ) {
            if ( exclude.length && ! Arr.has(exclude, key) ) {
                result[key] = value[key];
            }
        }

        return result;
    }

    /**
     * Get static class props
     *
     * @example Mix.class(MyClass) // => {}
     *
     * @param {any} value Source class
     * @param {Array<any>} [exclude] Exclude keys
     * @returns {Record<string, any>} Props map
     */
    static class(value, exclude = [])
    {
        exclude = Arr.merge(exclude, [
            'length', 'name', 'prototype', 'constructor'
        ]);

        return this.props(value, exclude);
    }

    /**
     * Get prototype props
     *
     * @example Mix.proto(MyClass) // => {}
     *
     * @param {any} value Source class
     * @param {Array<any>} [exclude] Exclude keys
     * @returns {Record<string, any>} Props map
     */
    static proto(value, exclude = [])
    {
        exclude = Arr.merge(exclude, [
            'constructor'
        ]);

        return this.props(value.prototype, exclude);
    }

    /**
     * Create form data
     *
     * @example Mix.form({ a: 1 }) // => FormData
     *
     * @param {any} value Source object
     * @returns {FormData} Form instance
     */
    static form(value)
    {
        let form = new FormData();

        Obj.each(Obj.flattenForm(value), (val, key) => {
            form.append(key, val);
        });

        return form;
    }

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
    static each(value, cb)
    {
        if ( !this.isRef(value) ) {
            throw new Error('Iterate non object');
        }

        for ( let key of Mix.keys(value) ) {
            cb(value[key], key);
        }

        return this;
    }

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
    static len(value)
    {
        if ( this.isArr(value) ) {
            return value.length;
        }

        if ( ! this.isRef(value) ) {
            return this.string(value).length;
        }

        return this.keys(value).length;
    }

    /**
     * @see PicoMixed.length
     */
    static length = PicoMixed.len;

    /**
     * Compare two objects (used for natural array sort)
     *
     * @param {any} value First compare value
     * @param {any} compare Second compare value
     * @returns {number} Returns sort position
     */
    static compare(value, compare)
    {
        return Locale.collator().compare(value, compare);
    }

    /**
     * Get value as null
     *
     * @example Mix.null("null") // => null
     *
     * @param {any} value Input value
     * @param {any} [fallback] Fallback value
     * @returns {any} Null or fallback
     */
    static null(value, fallback = null)
    {
        if ( value === 'null' ) {
            return null;
        }

        if ( this.isEmpty(value) ) {
            return null;
        }

        return fallback;
    }

    /**
     * Cast to array
     *
     * @example Mix.arr("a,b") // => ["a", "b"]
     *
     * @param {any} value Source value
     * @returns {Array<any>} Array result
     */
    static arr(value)
    {
        if ( this.isArr(value) ) {
            return value;
        }

        if ( ! this.isStr(value) ) {
            return [value];
        }

        value = value.replace(/^@?\[?(.*?)]$/g, '$1');

        return Arr.each(value.split(','), (val) => {
            return val.replace(/(^"|^'|'$|"$)/g, '');
        });
    }

    /**
     * @see PicoMixed.arr
     */
    static array = PicoMixed.arr;

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
    static str(value)
    {
        if ( this.isNix(value) ) {
            return String(value);
        }

        if ( value.toString === undefined ) {
            return String(value);
        }

        return value.toString();
    }

    /**
     * @see PicoMixed.str
     */
    static string = PicoMixed.str;

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
    static num(value, fallback = NaN)
    {
        if ( !this.isPrim(value) ) {
            return fallback;
        }

        if ( this.isStr(value) ) {
            value = parseFloat(value);
        }

        return value;
    }

    /**
     * @see PicoMixed.num
     */
    static number = PicoMixed.num;

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
    static int(value, fallback = NaN)
    {
        if ( !this.isPrim(value) ) {
            return fallback;
        }

        if ( this.isStr(value) ) {
            value = parseFloat(value);
        }

        return Math.round(value);
    }

    /**
     * @see PicoMixed.int
     */
    static integer = PicoMixed.int;

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
    static bool(value)
    {
        if ( this.isRef(value) ) {
            return !!this.vals(value).length;
        }

        if ( this.isNum(value) ) {
            return this.num(value) !== 0;
        }

        return /^(true|yes)$/i.test(value);
    }

    /**
     * @see PicoMixed.bool
     */
    static boolean = PicoMixed.bool;
}

PicoMixed.global = function (...args) {
    console.warn('Mix.global() is deprecated, use go() instead.');
    return go(...args);
};

PicoMixed.isPlain = function (...args) {
    console.warn('Mix.isPlain() is deprecated, use Mix.isObj() instead.');
    return Mix.isObj(...args);
};

PicoMixed.float = function (...args) {
    console.warn('Mix.float() is deprecated, use Mix.num() instead.');
    return Mix.num(...args);
};

PicoMixed.delay = function (...args) {
    console.warn('Mix.delay() is deprecated, use Run.delay() instead.');
    return Run.delay(...args);
};

PicoMixed.async = function (...args) {
    console.warn('Mix.async() is deprecated, use Run.async() instead.');
    return Run.async(...args);
};

PicoMixed.debounce = function (...args) {
    console.warn('Mix.debounce() is deprecated, use Run.debounce() instead.');
    return Run.debounce(...args);
};

PicoMixed.throttle = function (...args) {
    console.warn('Mix.throttle() is deprecated, use Run.throttle() instead.');
    return Run.throttle(...args);
};

PicoMixed.framerate = function (...args) {
    console.warn('Mix.framerate() is deprecated, use Run.framerate() instead.');
    return Run.framerate(...args);
};

PicoMixed.convertString = function (...args) {
    console.warn('Mix.convertString() is deprecated, use Str.string() instead.');
    return Str.string(...args);
};

PicoMixed.convertDatetime = function (...args) {
    console.warn('Mix.convertDatetime() is deprecated, use Str.date() instead.');
    return Str.date(...args);
};

PicoMixed.convertBool = function (...args) {
    console.warn('Mix.convertBool() is deprecated, use Str.boolean() instead.');
    return Str.boolean(...args);
};

PicoMixed.convertBoolean = function (...args) {
    console.warn('Mix.convertBoolean() is deprecated, use Str.boolean() instead.');
    return Str.boolean(...args);
};



export default PicoMixed;