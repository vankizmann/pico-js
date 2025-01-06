import { Arr, Obj, Now } from "../index.js";

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

    static number(val, fallback = NaN)
    {
        let res = ! val || typeof val.toString === 'undefined' ?
            String(val) : val.toString();

        if ( ! Any.isString(res) ) {
            return fallback;
        }

        if ( res.match(/^[0-9]+$/) ) {
            return this.integer(val);
        }

        if ( res.match(/^[0-9.,]+$/) ) {
            return this.float(val);
        }

        if ( ! this.isNumber(res) || Number.isNaN(res) ) {
            return fallback;
        }

        return res;
    }

    static integer(val)
    {
        let res = ! val || typeof val.toString === 'undefined' ?
            String(val) : val.toString();

        if ( ! Any.isString(res) ) {
            return NaN;
        }

        return parseInt(val);
    }

    static float(val)
    {
        let res = typeof val.toString === 'undefined' ?
            String(val) : val.toString();

        if ( ! Any.isString(res) ) {
            return NaN;
        }

        if ( res.match(/^[0-9,]+$/) ) {
            res = res.replace(/,/g, '.');
        }

        return parseFloat(res);
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

        if ( ! Any.isEmpty(ref) ) {
            debounce = ref();
        }

        if ( ref !== null && ref.__debouce !== undefined ) {
            debounce = ref.__debouce;
        }

        return (...args) => {

            clearTimeout(debounce);

            debounce = setTimeout(() => {
                callback(...args);
            }, delay);

            if ( ! Any.isEmpty(ref) ) {
                ref(debounce);
            }
        };
    }

    static throttle(callback, delay = 100, ref = null)
    {
        let throttle = null;

        if ( ! Any.isEmpty(ref) ) {
            throttle = ref();
        }

        let timer = null;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {
                throttle = null;
            }, delay);

            if ( throttle === true ) {
                return;
            }

            throttle = true;

            if ( ! Any.isEmpty(ref) ) {
                ref(throttle);
            }

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

    static form(obj)
    {
        let form = new FormData();

        let appendField = (values, keys = []) => {
            Obj.each(values, (value, index) => {

                let inner = Arr.merge([], keys, index);

                if ( Any.isPlain(value) ) {
                    return appendField(value, inner);
                }

                if ( Any.isArray(value) ) {
                    return appendField(value, inner);
                }

                let key = inner.splice(0, 1)[0];

                Arr.each(inner, (index) => {
                    key += '[' + index + ']';
                });

                if ( value !== null ) {
                    form.append(key, value);
                }
            });

            return form;
        };

        return appendField(obj);
    }

}

export default Any;
