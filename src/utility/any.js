import { Obj, Now } from "../index";

export class Any
{
    static isEmpty(val)
    {
        if ( this.isNumber(val) ) {
            return false;
        }

        if ( this.isString(val) ) {
            return val === '';
        }

        if ( this.isBool(val) ) {
            return val === null;
        }

        if ( this.isPlain(val) ) {
            return Object.keys(val).length === 0;
        }

        if ( this.isArray(val) ) {
            return Object.keys(val).length === 0;
        }

        return val === null || val === undefined;
    }

    static isNull(val)
    {
        return val === null;
    }

    static isEqual(obj, val)
    {
        if ( obj instanceof Node ) {
            return obj.isEqualNode(val);
        }

        if ( this.isPlain(obj) ) {
            return Object.is(obj, val)
        }

        if ( this.isArray(obj) ) {
            return Object.is(obj, val)
        }

        return obj === val;
    }

    static isString(val)
    {
        return typeof val === 'string';
    }

    static isNumber(val)
    {
        return typeof val === 'number' ||
            (typeof val === 'string' && val.match(/^\-?[0-9]+$/));
    }

    static isBool(val)
    {
        return typeof val === 'boolean' ||
            (typeof val === 'string' && val.match(/^(true|false)$/));
    }

    static isFunction(val)
    {
        return typeof val === 'function';
    }

    static isObject(val)
    {
        return val !== null && typeof val === 'object';
    }

    static isPlain(val)
    {
        return this.isObject(val) && val.constructor === Object;
    }

    static isArray(val)
    {
        return this.isObject(val) && val.constructor === Array;
    }

    static isDate(val)
    {
        return val instanceof Date;
    }

    static string(val)
    {
        return String(val);
    }

    static convertString(val, empty = '-')
    {
        return this.isEmpty(val) ? empty : this.string(val);
    }

    static integer(val)
    {
        return parseInt(val);
    }

    static float(val)
    {
        return parseFloat(val);
    }

    static bool(val)
    {
        let result = String(val).match(/^(true|1|yes|ja)$/i);

        return result === null ? false : result.length !== 0;
    }

    static boolean(val)
    {
        let result = String(val).match(/^(true|1|yes|ja)$/i);

        return result === null ? false : result.length !== 0;
    }

    static convertBool(val, yes = 'Yes', no = 'No')
    {
        let result = String(val).match(/^(true|1|yes|ja)$/i);

        return result === null ||  result.length === 0 ? no : yes;
    }

    static convertBoolean(val, yes = 'Yes', no = 'No')
    {
        let result = String(val).match(/^(true|1|yes|ja)$/i);

        return result === null ||  result.length === 0 ? no : yes;
    }

    static convertDatetime(val, format = 'YYYY-MM-DD hh:mm:ss', empty = '-')
    {
        if ( Any.isEmpty(val) === true ) {
            return empty;
        }

        return Now.make(val).format(format);
    }

    static vals(obj)
    {
        let keys = [];

        for ( let key in obj ) {
            if ( obj.hasOwnProperty(key) ) {
                keys.push(obj[key]);
            }
        }

        return keys;
    }

    static keys(obj)
    {
        let keys = [];

        for ( let key in obj ) {
            if ( obj.hasOwnProperty(key) ) {
                keys.push(key);
            }
        }

        return keys;
    }

    static async(callback, ...args)
    {
        setTimeout(function() {
            callback(...args);
        }, 0);

        return this;
    }

    static delay(callback, delay = 100, ...args)
    {
        setTimeout(function() {
            callback(...args);
        }, delay);

        return this;
    }

    static debounce(callback, delay = 100, ref = null)
    {
        let debounce = null;

        if ( ref !== null && ref.__debouce !== undefined ) {
            debounce = ref.__debouce;
        }

        return (...args) => {

            clearTimeout(debounce);

            debounce = setTimeout(() => {
                callback(...args);
            }, delay);

            if ( ref !== null ) {
                ref.__debouce = debounce;
            }
        };
    }

    static throttle(callback, delay = 100, reference = null)
    {
        let throttle = reference;

        return (...args) => {

            if ( throttle === true ) {
                return;
            }

            throttle = true;

            setTimeout(() => {
                throttle = null;
            }, delay);

            callback(...args);
        };
    }

    static framerate(callback, rate = 30, ref = null)
    {
        let latest = 0;

        if ( ! Any.isEmpty(ref) ) {
            latest = ref();
        }

        return (...args) => {

            if ( Date.now() - latest <= (1000 / rate) ) {
                return;
            }

            callback(...args);

            latest = Date.now();

            if ( ! Any.isEmpty(ref) ) {
                ref(latest);
            }

        };
    }

    static md5(value)
    {
        if ( this.isObject(value) ) {
            value = JSON.stringify(value);
        }

        return require('blueimp-md5')(value);
    }

}

export default Any;
