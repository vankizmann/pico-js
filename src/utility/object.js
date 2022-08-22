import Arr from "./array";
import Any from "./any";

export class Obj
{
    static has(obj, key)
    {
        return this.get(obj, key, - 1) !== - 1;
    }

    static empty(obj, key)
    {
        return Any.isEmpty(this.get(obj, key, null));
    }

    static get(obj, keys, fallback = null)
    {
        if ( obj === null || obj === undefined ) {
            return fallback;
        }

        if ( keys === null || keys === undefined ) {
            return fallback;
        }

        if ( Any.isArray(keys) ) {
            keys = keys.join('.');
        }

        if ( ! Any.isString(keys) ) {
            keys = keys.toString();
        }

        keys = keys.split('.');

        let index = 0, length = keys.length;

        if ( length === 0 ) {
            return fallback;
        }

        while (obj !== undefined && index < length) {
            obj = obj[keys[index++]];
        }

        if ( typeof obj === 'undefined' ) {
            return fallback;
        }

        return obj;
    }

    static set(obj, keys, val)
    {
        if ( Any.isArray(keys) ) {
            keys = keys.join('.');
        }

        if ( ! Any.isString(keys) ) {
            keys = keys.toString();
        }

        keys = keys.split('.');

        let index = 0, length = keys.length, nested = obj;

        if ( length === 0 ) {
            return obj;
        }

        while (nested !== null && index < length) {

            if ( nested[keys[index]] === undefined || nested[keys[index]] === null ) {
                nested[keys[index]] = {};
            }

            if ( index == length - 1 ) {
                nested[keys[index]] = val;
            }

            nested = nested[keys[index++]];
        }

        return obj;
    }

    static unset(obj, keys)
    {
        if ( Any.isArray(keys) ) {
            keys = keys.join('.');
        }

        if ( ! Any.isString(keys) ) {
            keys = keys.toString();
        }

        keys = keys.split('.');

        let key = keys.shift();

        if ( typeof obj[key] === 'undefined' ) {
            return obj;
        }

        if ( keys.length === 0 ) {
            delete obj[key];
            return obj;
        }

        return this.unset(obj[key], keys);
    }

    static only(obj, keys, assign = null)
    {
        let result = {};

        this.each(obj, (val, key) => {
            if ( Arr.has(keys, key) === true ) {
                result[key] = val;
            }
        });

        if ( !Any.isEmpty(assign) ) {
            result = this.assign(result, assign);
        }

        return result;
    }

    static except(obj, keys, assign = null)
    {
        let result = {};

        this.each(obj, (val, key) => {
            if ( Arr.has(keys, key) === false ) {
                result[key] = val;
            }
        });

        if ( !Any.isEmpty(assign) ) {
            result = this.assign(result, assign);
        }

        return result;
    }

    static includes(obj, val)
    {
        let result = true;

        for ( let key of Any.keys(obj) ) {
            if ( typeof val[key] !== 'undefined' ) {
                result = (Any.isPlain(obj[key]) || Any.isArray(obj[key]) ?
                    this.includes(obj[key], val[key]) : obj[key] === val[key]) && result;
            }
        }

        return result;
    }

    static matches(obj, val)
    {
        let result = true;

        for ( let key of Any.keys(obj) ) {
            if ( typeof val[key] !== 'undefined' ) {
                result = (Any.isObject(obj[key]) ?
                    this.matches(obj[key], val[key]) : obj[key] === val[key]) && result;
            }
        }

        return result;
    }

    static sort(obj, key)
    {
        let keys = Any.keys(obj);

        if ( Any.isFunction(key) ) {
            keys = keys.sort((a, b) => {
                return key.call({}, obj[a], obj[b]);
            });
        }

        if ( !Any.isFunction(key) ) {
            keys = keys.sort((a, b) => {
                return Any.integer(Obj.get(obj[a], key)) - Any.integer(Obj.get(obj[b], key));
            })
        }

        let result = [];

        Arr.each(keys, (key, index) => {
            obj[key]['_key'] = key;
            result[index] = obj[key];
        });

        return result;
    }

    static sortString(obj, key)
    {
        let keys = Any.keys(obj);

        if ( !Any.isFunction(key) ) {
            keys = keys.sort((a, b) => {

                let va = Any.string(Obj.get(obj[a], key)).toLowerCase();
                let vb = Any.string(Obj.get(obj[b], key)).toLowerCase();

                return (va < vb) ? - 1 : (va > vb) ? 1 : 0;
            })
        }

        let result = [];

        Arr.each(keys, (key, index) => {
            obj[key]['_key'] = key;
            result[index] = obj[key];
        });

        return result;
    }

    static filter(obj, filter)
    {
        return Obj.each(Obj.filterIndex(obj, filter), (key) => {
            return obj[key];
        });
    }

    static filterIndex(obj, filter)
    {
        return Any.keys(obj).filter((key) => {

            if ( Any.isFunction(filter) ) {
                return filter.call({}, obj[key], key);
            }

            if ( Any.isPlain(filter) ) {
                return Obj.includes(filter, obj[key]);
            }

            if ( Any.isArray(filter) ) {
                return Arr.includes(filter, obj[key]);
            }

            return filter === obj[key];
        });
    }

    static find(arr, obj, fallback = null)
    {
        return Arr.first(Obj.filter(arr, obj)) || fallback;
    }

    static findIndex(arr, obj, fallback = - 1)
    {
        return Arr.first(Obj.filterIndex(arr, obj)) || fallback;
    }

    static clone(obj)
    {
        let clone;

        if ( Any.isArray(obj) === true ) {
            return Arr.clone(obj);
        }

        if ( Any.isPlain(obj) === true ) {

            clone = {};

            for ( let key of Any.keys(obj) ) {
                clone[key] = Obj.clone(obj[key]);
            }

            return clone;
        }

        return clone || obj;
    }

    static assign(...args)
    {
        return Object.assign(...args);
    }

    static remove(obj, keys)
    {
        Arr.each(keys, (key) => delete obj[key]);

        return obj;
    }

    static each(obj, callback)
    {
        let result = {};

        if ( obj instanceof FormData ) {

            for ( let [key, value] of obj.entries() ) {
                result[key] = callback(value, key);
            }

            return obj;
        }

        for ( let key of Any.keys(obj) ) {
            result[key] = callback(obj[key], key);
        }

        return result;
    }

    static map(obj, callback)
    {
        for ( let key of Any.keys(obj) ) {
            obj[key] = callback(obj[key], key);
        }

        return obj;
    }

    static values(obj)
    {
        let result = [];

        this.each(obj, val => result.push(val));

        return result;
    }

}

export default Obj;
