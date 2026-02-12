import { go, Mix, Arr } from "#src/index.esm.js";

export class PicoObject
{
    static keyoptim(keys, flatten = false, isstr = null)
    {
        if ( isstr === null ) {
            isstr = Mix.isStr(keys);
        }

        if ( !isstr && flatten ) {
            keys = keys.join('.');
        }

        return isstr || flatten ? keys.split('.') : keys;
    }

    static has(target, keys, flatten = false)
    {
        if ( target == null || keys == null ) {
            return false;
        }

        if ( typeof keys === 'number' ) {
            keys = Mix.str(keys);
        }

        const isstr = typeof keys === 'string';

        if ( isstr && target && target[keys] !== undefined ) {
            return target[keys] !== undefined;
        }

        keys = this.keyoptim(keys, flatten, isstr);

        let [list, index, length] = [
            keys.pop(), 0, keys.length
        ];

        if ( length === 0 ) {
            return target[list] !== undefined;
        }

        while ( target != null && index < length ) {
            target = target[keys[index ++]];
        }

        if ( target == null ) {
            return false;
        }

        return target[list] !== undefined;

    }

    static get(target, keys, fallback = null, flatten = false)
    {
        if ( target == null || keys == null ) {
            return fallback;
        }

        if ( typeof keys === 'number' ) {
            keys = Mix.str(keys);
        }

        const isstr = typeof keys === 'string';

        if ( isstr && target && target[keys] !== undefined ) {
            return target[keys];
        }

        keys = this.keyoptim(keys, flatten, isstr);

        let index = 0, length = keys.length;

        if ( length === 0 ) {
            return fallback;
        }

        while ( target != null && index < length ) {
            target = target[keys[index ++]];
        }

        if ( target == null ) {
            return fallback;
        }

        return target;
    }

    static set(target, keys, value, flatten = false)
    {
        if ( keys == null ) {
            return target;
        }

        if ( typeof keys === 'number' ) {
            keys = Mix.str(keys);
        }

        const isstr = typeof keys === 'string';

        if ( isstr && target && target[keys] !== undefined ) {
            return (target[keys] = value, target);
        }

        keys = this.keyoptim(keys, flatten, isstr);

        if ( keys.length === 0 ) {
            return target;
        }

        let nested = target;

        for ( let mod, src, i = 0; i < keys.length; i++) {

            mod = src = String(keys[i]);

            if ( src.indexOf('[]') !== -1 ) {
                mod = src.replace('[]', '');
            }

            if ( nested[mod] == null ) {
                nested[mod] = mod === src ? {} : [];
            }

            if ( mod !== src ) {
                Arr.insert(keys, i + 1, nested[mod].length);
            }

            if ( keys.length - 1 === i ) {
                nested[mod] = value;
            }

            nested = nested[mod];
        }

        return target;
    }

    static unset(target, keys, flatten = false)
    {
        if ( keys == null ) {
            return target;
        }

        if ( typeof keys === 'number' ) {
            keys = Mix.str(keys);
        }

        const isstr = typeof keys === 'string';

        if ( isstr && target && target[keys] !== undefined ) {
            return (delete target[keys], target);
        }

        keys = this.keyoptim(keys, flatten, isstr);

        let [list, index, length, nested] = [
            keys.pop(), 0, keys.length, target
        ];

        if ( length === 0 ) {
            return target;
        }

        while ( nested != null && index < length ) {
            nested = nested[keys[index ++]];
        }

        if ( nested == null ) {
            return target;
        }

        return (delete nested[list], target);
    }

    static empty(target, key)
    {
        return Mix.isEmpty(this.get(target, key));
    }

    static remove(target, keys)
    {
        if ( ! Mix.isArr(keys) ) {
            return target;
        }

        for ( let key of keys ) {
            this.unset(target, key);
        }

        return target;
    }

    static each(value, cb, retval = null)
    {
        let result = {};

        for ( let key of Mix.keys(value) ) {
            result[key] = cb(value[key], key);
        }

        if ( retval != null ) {
            return retval;
        }

        return result;
    }

    static map(value, cb)
    {
        let result = {};

        for ( let key of Mix.keys(value) ) {
            result[key] = cb(value[key], key);
        }

        return result;
    }

    static filterIndex(value, filter = null)
    {
        return Arr.filterIndex(value, filter);
    }

    static filter(value, filter = null)
    {
        let result = {};

        for (let key of this.filterIndex(value, filter)) {
            result[key] = value[key];
        }

        return result;
    }

    static flatten(value, prefix = '', result = {})
    {
        if ( typeof value !== 'object' ) {
            return result[prefix] = value;
        }

        if ( prefix !== '' ) {
            prefix += '.';
        }

        for ( let key of Mix.keys(value) ) {
            this.flatten(value[key], prefix + key, result);
        }

        return result;
    }

    static flattenForm(value, prefix = '', result = {})
    {
        if ( typeof value !== 'object' ) {
            return result[prefix] = value;
        }

        let fn = (key) => {
            return prefix ? `${prefix}[${key}]` : key;
        };

        for ( let key of Mix.keys(value) ) {
            this.flattenForm(value[key], fn(key), result);
        }

        return result;
    }

    static unpack(value, result = {})
    {
        Arr.each(Mix.keys(value), (key) => {
            this.set(result, key, value[key]);
        });

        return result;
    }

    static assign(...args)
    {
        return Object.assign(...args);
    }

    static clone(value, merge = null)
    {
        if ( Mix.isPrim(value) ) {
            return value;
        }

        if ( Mix.isArr(value) ) {
            return Arr.clone(value);
        }

        if ( ! Mix.isObj(value) ) {
            return value;
        }

        let result = {};

        for ( let key of Mix.keys(value) ) {
            result[key] = this.clone(value[key]);
        }

        if ( merge != null ) {
            return this.assign(result, merge);
        }

        return result;
    }

    static pluck(value, key, fallback = null)
    {
        let result = this.get(value, key, fallback);

        this.unset(value, key);

        return result;
    }

    static only(value, keys, merge = null)
    {
        let result = {};

        this.each(value, (val, key) => {
            if ( Arr.has(keys, key) ) result[key] = val;
        });

        if ( merge == null ) {
            return result;
        }

        return this.assign(result, merge);
    }

    static except(value, keys, merge = null)
    {
        let result = {};

        this.each(value, (val, key) => {
            if ( ! Arr.has(keys, key) ) result[key] = val;
        });

        if ( merge == null ) {
            return result;
        }

        return this.assign(result, merge);
    }

    static includes(value, search)
    {
        if ( Mix.isArr(search) ) {
            return Arr.includes(value, search);
        }

        if ( ! Mix.isObj(search) ) {
            return value === search;
        }

        let keys = Mix.keys(search);

        let [result, length] = [
            true, keys.length,
        ];

        for ( let i = 0; result === true && i < length; i++) {
            result = this.includes(...[
                value[keys[i]], search[keys[i]]
            ]);
        }

        return result;
    }

    static matches(value, search)
    {
        if ( Mix.isArr(search) ) {
            return Arr.matches(value, search);
        }

        if ( ! Mix.isObj(value) ) {
            return value === search;
        }

        let keys = Arr.unique([
            ...Mix.keys(search), ...Mix.keys(value)
        ]);

        let [result, length] = [
            true, keys.length,
        ];

        for ( let i = 0; result === true && i < length; i++) {
            result &&= this.matches(...[
                value[keys[i]], search[keys[i]]
            ]);
        }

        return result;
    }

}

PicoObject.values = (...args) => {
    console.warn('Obj.values() is deprecated, use Mix.vals() instead.');
    return Mix.vals(...args);
};

PicoObject.find = (...args) => {
    console.warn('Obj.find() is deprecated, use Arr.find() instead.');
    return Arr.find(...args);
};

PicoObject.findIndex = (...args) => {
    console.warn('Obj.findIndex() is deprecated, use Arr.findIndex() instead.');
    return Arr.findIndex(...args);
};

PicoObject.sort = (...args) => {
    console.warn('Obj.sort() is deprecated, use Arr.sort() instead.');
    return Arr.sort(...args);
};

PicoObject.sortString = (...args) => {
    console.warn('Obj.sortString() is deprecated, use Arr.sortDeep() instead.');
    return Arr.sortDeep(...args);
};

export default PicoObject