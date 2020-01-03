import { Obj } from "../index";

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
            (typeof val === 'string' && val.match(/^[0-9]$/));
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

    static datetime(val)
    {
        val = val.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/, '$1/$2/$3');

        return new Date(val);
    }

    static datetimeISO(val)
    {
        return new Date(this.datetime(val).getTime() -
            (this.datetime(val).getTimezoneOffset() * 60000));
    }

    static convertDatetime(val, format = 'YYYY-MM-DD hh:ii:ss', empty = '-')
    {
        if ( Any.isEmpty(val) === true ) {
            return empty;
        }

        let date = this.datetimeISO(val);

        format = format.replace(/YYYY/g,
            date.toISOString().substr(0, 4));

        format = format.replace(/MM/g,
            date.toISOString().substr(5, 2));

        format = format.replace(/DD/g,
            date.toISOString().substr(8, 2));

        format = format.replace(/hh/g,
            date.toISOString().substr(11, 2));

        format = format.replace(/ii/g,
            date.toISOString().substr(14, 2));

        format = format.replace(/ss/g,
            date.toISOString().substr(17, 2));

        return format;
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

    static md5(value)
    {
        if ( this.isObject(value) ) {
            value = JSON.stringify(value);
        }

        return require('blueimp-md5')(value);
    }

}

export default Any;
