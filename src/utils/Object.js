import { go, Mix, Arr } from "../index.esm.js";

export class PicoObject
{
    /**
     * Normalize key path to array
     *
     * @example Obj.keyoptim("a.b") // => ["a","b"]
     * @example Obj.keyoptim(["a","b"]) // => ["a","b"]
     *
     * @param {any} keys Key path
     * @param {boolean} [flatten] Flatten keys
     * @param {boolean|null} [isstr] Is string flag
     * @returns {Array<any>} Key segments
     */
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

    /**
     * Check if nested key exists
     *
     * @example Obj.has({a:{b:1}}, "a.b") // => true
     * @example Obj.has({a:{}}, "a.b") // => false
     *
     * @param {any} target Target object
     * @param {any} keys Key path
     * @param {boolean} [flatten] Flatten keys
     * @returns {boolean} True if exists
     */
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

    /**
     * Get nested value or fallback
     *
     * @example Obj.get({a:{b:1}}, "a.b") // => 1
     * @example Obj.get({}, "a.b", null) // => null
     *
     * @param {any} target Target object
     * @param {any} keys Key path
     * @param {any} [fallback] Fallback value
     * @param {boolean} [flatten] Flatten keys
     * @returns {any} Nested value
     */
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

    /**
     * Set nested value (mutates)
     *
     * @example Obj.set({}, "a.b", 1) // => object
     * @example Obj.set({}, ["a","b"], 1) // => object
     *
     * @param {any} target Target object
     * @param {any} keys Key path
     * @param {any} value Value to set
     * @param {boolean} [flatten] Flatten keys
     * @returns {any} Mutated target
     */
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

    /**
     * Unset nested value (mutates)
     *
     * @example Obj.unset({a:{b:1}}, "a.b")
     * @example Obj.unset({a:{b:1}}, ["a","b"])
     *
     * @param {any} target Target object
     * @param {any} keys Key path
     * @param {boolean} [flatten] Flatten keys
     * @returns {any} Mutated target
     */
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

    /**
     * Check if nested value is empty
     *
     * @example Obj.empty({a:null}, "a") // => true
     * @example Obj.empty({a:1}, "a") // => false
     *
     * @param {any} target Target object
     * @param {any} key Key path
     * @returns {boolean} True if empty
     */
    static empty(target, key)
    {
        return Mix.isEmpty(this.get(target, key));
    }

    /**
     * Unset multiple keys (mutates)
     *
     * @example Obj.remove({a:1,b:2}, ["a"]) // => object
     *
     * @param {any} target Target object
     * @param {any} keys Keys list
     * @returns {any} Mutated target
     */
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

    /**
     * Map object values to object
     *
     * @example Obj.each({a:1}, v => v+1) // => {a:2}
     *
     * @param {any} value Source object
     * @param {function} cb Map callback
     * @param {any} [retval] Forced return
     * @returns {any} Mapped object
     */
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

    /**
     * Map object values to object
     *
     * @example Obj.map({a:1}, v => v+1) // => {a:2}
     *
     * @param {any} value Source object
     * @param {function} cb Map callback
     * @returns {Record<string, any>} Mapped object
     */
    static map(value, cb)
    {
        for ( let key of Mix.keys(value) ) {
            value[key] = cb(value[key], key);
        }

        return value;
    }

    /**
     * Get filtered key indexes
     *
     * @example Obj.filterIndex({a:1,b:null}) // => ["a"]
     *
     * @param {any} value Source object
     * @param {any} [filter] Filter spec
     * @returns {Array<any>} Key list
     */
    static filterIndex(value, filter = null)
    {
        return Arr.filterIndex(value, filter);
    }

    /**
     * Filter object by key filter
     *
     * @example Obj.filter({a:1,b:null}) // => {a:1}
     *
     * @param {any} value Source object
     * @param {any} [filter] Filter spec
     * @returns {Record<string, any>} Filtered object
     */
    static filter(value, filter = null)
    {
        let result = {};

        for (let key of this.filterIndex(value, filter)) {
            result[key] = value[key];
        }

        return result;
    }

    /**
     * Flatten object into dot keys
     *
     * @example Obj.flatten({a:{b:1}}) // => {"a.b":1}
     *
     * @param {any} value Source object
     * @param {string} [prefix] Key prefix
     * @param {Record<string, any>} [result] Result map
     * @returns {Record<string, any>} Flat map
     */
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

    /**
     * Flatten object into form keys
     *
     * @example Obj.flattenForm({a:{b:1}}) // => {"a[b]":1}
     *
     * @param {any} value Source object
     * @param {string} [prefix] Key prefix
     * @param {Record<string, any>} [result] Result map
     * @returns {Record<string, any>} Flat map
     */
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

    /**
     * Unpack dotted keys into object
     *
     * @example Obj.unpack({"a.b":1}) // => {a:{b:1}}
     *
     * @param {any} value Flat key map
     * @param {Record<string, any>} [result] Result object
     * @returns {Record<string, any>} Unpacked object
     */
    static unpack(value, result = {})
    {
        Arr.each(Mix.keys(value), (key) => {
            this.set(result, key, value[key]);
        });

        return result;
    }

    /**
     * Assign objects (Object.assign)
     *
     * @example Obj.assign({}, {a:1}) // => {a:1}
     *
     * @param {...any} args Assign args
     * @returns {any} Assigned object
     */
    static assign(...args)
    {
        return Object.assign(...args);
    }

    /**
     * Deep clone primitive/array/object
     *
     * @example Obj.clone({a:{b:1}}) // => new object
     *
     * @param {any} value Value to clone
     * @param {any} [merge] Merge values
     * @returns {any} Cloned value
     */
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

    /**
     * Get and remove nested value
     *
     * @example Obj.pluck({a:1}, "a") // => 1
     *
     * @param {any} value Source object
     * @param {any} key Key path
     * @param {any} [fallback] Fallback value
     * @returns {any} Plucked value
     */
    static pluck(value, key, fallback = null)
    {
        let result = this.get(value, key, fallback);

        this.unset(value, key);

        return result;
    }

    /**
     * Pick only given keys
     *
     * @example Obj.only({a:1,b:2}, ["a"]) // => {a:1}
     *
     * @param {any} value Source object
     * @param {Array<any>} keys Allowed keys
     * @param {any} [merge] Merge values
     * @returns {Record<string, any>} Picked object
     */
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

    /**
     * Pick all keys except given
     *
     * @example Obj.except({a:1,b:2}, ["a"]) // => {b:2}
     *
     * @param {any} value Source object
     * @param {Array<any>} keys Excluded keys
     * @param {any} [merge] Merge values
     * @returns {Record<string, any>} Picked object
     */
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

    /**
     * Check if value includes search
     *
     * @example Obj.includes({a:1}, {a:1}) // => true
     * @example Obj.includes({a:1}, {a:2}) // => false
     *
     * @param {any} value Source value
     * @param {any} search Search spec
     * @returns {boolean} True if includes
     */
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

    /**
     * Check if value matches search
     *
     * @example Obj.matches({a:1}, {a:1}) // => true
     * @example Obj.matches({a:1}, {b:1}) // => false
     *
     * @param {any} value Source value
     * @param {any} search Search spec
     * @returns {boolean} True if matches
     */
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

    static sort(obj, key)
    {
        let keys = Mix.keys(obj);

        if ( Mix.isFunction(key) ) {
            keys = keys.sort((a, b) => {
                return key.call({}, obj[a], obj[b]);
            });
        }

        if ( !Mix.isFunction(key) ) {
            keys = keys.sort((a, b) => {
                return Mix.integer(this.get(obj[a], key)) - Mix.integer(this.get(obj[b], key));
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
        let keys = Mix.keys(obj);

        if ( !Mix.isFunction(key) ) {
            keys = keys.sort((a, b) => {

                let va = Mix.string(this.get(obj[a], key)).toLowerCase();
                let vb = Mix.string(this.get(obj[b], key)).toLowerCase();

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

}

/**
 * @see PicoMixed.vals
 */
PicoObject.values = (...args) => {
    console.warn('Obj.values() is deprecated, use Mix.vals() instead.');
    return Mix.vals(...args);
};

/**
 * @see PicoArray.find
 */
PicoObject.find = (...args) => {
    console.warn('Obj.find() is deprecated, use Arr.find() instead.');
    return Arr.find(...args);
};

/**
 * @see PicoArray.findIndex
 */
PicoObject.findIndex = (...args) => {
    console.warn('Obj.findIndex() is deprecated, use Arr.findIndex() instead.');
    return Arr.findIndex(...args);
};

// /**
//  * @see PicoArray.sort
//  */
// PicoObject.sort = (...args) => {
//     console.warn('Obj.sort() is deprecated, use Arr.sort() instead.');
//     return Arr.sort(...args);
// };
//
// /**
//  * @see PicoArray.sortDeep
//  */
// PicoObject.sortString = (...args) => {
//     console.warn('Obj.sortString() is deprecated, use Arr.sortDeep() instead.');
//     return Arr.sortDeep(...args);
// };

export default PicoObject