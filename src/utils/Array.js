import { Obj, Mix } from "../index.esm.js";

export class PicoArray
{

    /**
     * Wrap value into an array
     *
     * @example Arr.all(1) // => [1]
     * @example Arr.all([1]) // => [1]
     *
     * @param {any} value Value to wrap
     * @returns {Array<any>} Wrapped array
     */
    static all(value)
    {
        return Mix.isArr(value) ? value : [value];
    }

    /**
     * Get item at index or fallback
     *
     * @example Arr.get(["a"], 0) // => "a"
     * @example Arr.get(["a"], 9, null) // => null
     *
     * @param {any} value Array-like value
     * @param {number} index Index to read
     * @param {any} [fallback] Fallback value
     * @returns {any} Item or fallback
     */
    static get(value, index, fallback = null)
    {
        if ( ! Mix.isArr(value) ) {
            return value;
        }

        if ( value && value[index] ) {
            return value[index];
        }

        return fallback;
    }

    /**
     * Set item at index (mutates)
     *
     * @example Arr.set([1,2], 0, 9) // => [9,2]
     *
     * @param {Array<any>} target Target array
     * @param {number} index Index to set
     * @param {any} value Value to set
     * @returns {any} Splice result
     */
    static set(target, index, value)
    {
        return this.splice(target, index, 1, value);
    }

    /**
     * Remove item at index (mutates)
     *
     * @example Arr.unset([1,2], 0) // => [1]
     *
     * @param {Array<any>} target Target array
     * @param {number} index Index to remove
     * @returns {any} Splice result
     */
    static unset(target, index)
    {
        return this.splice(target, index, 1);
    }

    /**
     * Create array with callback values
     *
     * @example Arr.make(3) // => [0,1,2]
     * @example Arr.make(2, "x") // => ["x","x"]
     *
     * @param {number} length Array length
     * @param {any} [cb] Value or mapper
     * @returns {Array<any>} Generated array
     */
    static make(length, cb = null)
    {
        let result = new Array(length);

        if ( cb == null ) {
            cb = (i) => i;
        }

        for ( let i = 0; i < length; i ++ ) {
            result[i] = typeof cb === 'function' ? cb(i) : cb;
        }

        return result;
    }

    /**
     * Check if array has value
     *
     * @example Arr.has([1,2], 2) // => true
     * @example Arr.has([{id:1}], {id:1}) // => true
     *
     * @param {any} value List to search
     * @param {any} search Search value
     * @returns {boolean} True if found
     */
    static has(value, search)
    {
        if ( !Mix.isPrim(search) ) {
            return this.findIndex(value, search) !== - 1;
        }

        if ( ! Mix.isArr(value) ) {
            value = [value];
        }

        let index = value.findIndex((val) => {
            return val == search;
        });

        return index !== - 1;
    }

    /**
     * Get unique values as strings
     *
     * @example Arr.unique(["a","a"]) // => ["a"]
     *
     * @param {Array<any>} value Input list
     * @returns {Array<any>} Unique list
     */
    static unique(value)
    {
        let buffer = {};

        for ( const val of value ) {
            buffer[val] = true;
        }

        return Mix.keys(buffer);
    }

    /**
     * Check equal lengths for arrays
     *
     * @example Arr.lengths([1],[2]) // => true
     *
     * @param {Array<any>} value Base array
     * @param {...Array<any>} args Other arrays
     * @returns {boolean} True if equal
     */
    static lengths(value, ...args)
    {
        let length = value.length;

        for ( let i = 0; i < args.length; i ++ ) {
            if ( args[i].length !== length ) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get first item or fallback
     *
     * @example Arr.first([1,2]) // => 1
     *
     * @param {Array<any>} value Input array
     * @param {any} [fallback] Fallback value
     * @returns {any} First item
     */
    static first(value, fallback = null)
    {
        return this.get(value, 0, fallback);
    }

    /**
     * Get second item or fallback
     *
     * @example Arr.second([1,2]) // => 2
     *
     * @param {Array<any>} value Input array
     * @param {any} [fallback] Fallback value
     * @returns {any} Second item
     */
    static second(value, fallback = null)
    {
        return this.get(value, 2, fallback);
    }

    /**
     * Get third item or fallback
     *
     * @example Arr.third([1,2,3]) // => 3
     *
     * @param {Array<any>} value Input array
     * @param {any} [fallback] Fallback value
     * @returns {any} Third item
     */
    static third(value, fallback = null)
    {
        return this.get(value, 2, fallback);
    }

    /**
     * Get last item or fallback
     *
     * @example Arr.last([1,2]) // => 2
     *
     * @param {Array<any>} value Input array
     * @param {any} [fallback] Fallback value
     * @returns {any} Last item
     */
    static last(value, fallback = null)
    {
        return this.get(value, value.length - 1, fallback);
    }

    /**
     * Map values to new array
     *
     * @example Arr.each([1], v => v+1) // => [2]
     *
     * @param {any} value Input list
     * @param {function} cb Map callback
     * @param {any} [retval] Forced return
     * @returns {any} Mapped array
     */
    static each(value, cb, retval = null)
    {
        let [isArr, keys] = [
            Mix.isArr(value), Mix.keys(value)
        ];

        let fn = (key) => {
            return isArr ? parseInt(key) : key;
        };

        let result = new Array(keys.length);

        for (let i = 0; i < keys.length; i++) {
            result[i] = cb(value[keys[i]], fn(keys[i]));
        }

        if ( retval != null ) {
            return retval;
        }

        return result;
    }

    /**
     * Map values in place (mutates)
     *
     * @example Arr.map([1], v => v+1) // => [2]
     *
     * @param {any} value Input list
     * @param {function} cb Map callback
     * @returns {any} Mutated input
     */
    static map(value, cb)
    {
        let [isArr, keys] = [
            Mix.isArr(value), Mix.keys(value)
        ];

        let fn = (key) => {
            return isArr ? parseInt(key) : key;
        };

        for ( let key of keys ) {
            value[key] = cb(value[key], fn(key));
        }

        return value;
    }

    /**
     * Recursively map nested arrays
     *
     * @example Arr.recursive([{c:[]}], "c", () => 1) // => list
     *
     * @param {any} value Input list
     * @param {string} key Child key
     * @param {function} cb Node callback
     * @param {Array<any>} [cascade] Parent chain
     * @returns {any} Mapped tree
     */
    static recursive(value, key, cb, cascade = [])
    {
        if ( value == null ) {
            return value;
        }

        return this.map(value, (item) => {
            return (this.recursive(item[key], key, cb, [
                ...cascade, value
            ]), cb(item, cascade));
        });

        // [{childs: [{ childs: [] } ] }, { childs: [] } ] }]
    }

    /**
     * Get matching indexes by filter
     *
     * @example Arr.filterIndex([0,1], v => v) // => ["1"]
     *
     * @param {any} value Input list
     * @param {any} [filter] Filter spec
     * @returns {Array<string>} Matching keys
     */
    static filterIndex(value, filter = null)
    {
        if ( filter == null ) {
            filter = (val) => !Mix.isEmpty(val);
        }

        return Mix.keys(value).filter((key) => {

            if ( Mix.isFunc(filter) ) {
                return filter.call({}, value[key], key);
            }

            if ( Mix.isRef(filter) ) {
                return this.includes(value[key], filter);
            }

            return filter === value[key];
        });
    }

    /**
     * Filter values by filter
     *
     * @example Arr.filter([0,1], v => v) // => [1]
     *
     * @param {any} value Input list
     * @param {any} [filter] Filter spec
     * @returns {Array<any>} Filtered values
     */
    static filter(value, filter = null)
    {
        if ( filter == null ) {
            filter = (val) => !Mix.isEmpty(val);
        }

        return Mix.vals(value).filter((val, key) => {

            if ( Mix.isFunc(filter) ) {
                return filter.call({}, val, key);
            }

            if ( Mix.isRef(filter) ) {
                return this.includes(val, filter);
            }

            return filter === value[key];
        });
    }

    /**
     * Find index matching filter
     *
     * @example Arr.findIndex([1,2], 2) // => 1
     *
     * @param {Array<any>} value Input array
     * @param {any} [filter] Filter spec
     * @param {number} [fallback] Fallback index
     * @returns {number} Found index
     */
    static findIndex(value, filter = null, fallback = - 1)
    {
        if ( filter == null ) {
            filter = (val) => !Mix.isEmpty(val);
        }

        for ( let i = 0; i < value.length; i ++ ) {

            if ( Mix.isFunc(filter) ) {
                if ( filter.call({}, value[i], i) ) {
                    return i;
                }
            }

            if ( Mix.isRef(filter) ) {
                if ( this.includes(value[i], filter) ) {
                    return i;
                }
            }

            if ( filter === value[i] ) return i;
        }

        return fallback;
    }

    /**
     * Find value matching filter
     *
     * @example Arr.find([1,2], 2) // => 2
     *
     * @param {Array<any>} value Input array
     * @param {any} [filter] Filter spec
     * @param {any} [fallback] Fallback value
     * @returns {any} Found value
     */
    static find(value, filter = null, fallback = null)
    {
        let index = this.findIndex(value, filter);

        if ( index === - 1 ) {
            return fallback;
        }

        return value[index];
    }

    /**
     * Sort array by key or callback
     *
     * @example Arr.sort([{n:2},{n:1}], "n") // => list
     *
     * @param {any} value Input list
     * @param {any} [key] Key or compare fn
     * @returns {Array<any>} Sorted list
     */
    static sort(value, key = null)
    {
        if ( Mix.isFunc(key) ) {
            return this.sortFunc(value, key);
        }

        if ( key != null ) {
            return this.sortDeep(value, key);
        }

        return this.sortPrim(value)
    }

    /**
     * Sort by compare callback
     *
     * @example Arr.sortFunc([2,1], (a,b)=>a-b) // => [1,2]
     *
     * @param {any} value Input list
     * @param {function} cb Compare callback
     * @returns {Array<any>} Sorted list
     */
    static sortFunc(value, cb)
    {
        let keys = Mix.keys(value).sort((a, b) => {
            return cb.call({}, value[a], value[b]);
        });

        let result = [];

        for ( const key of keys ) {
            result.push(value[key]);
        }

        return result;
    }

    /**
     * Sort by nested key value
     *
     * @example Arr.sortDeep([{a:{n:2}},{a:{n:1}}], "a.n") // => list
     *
     * @param {any} value Input list
     * @param {any} key Key path
     * @returns {Array<any>} Sorted list
     */
    static sortDeep(value, key)
    {
        let keys = Mix.keys(value).sort((a, b) => {
            return Mix.compare(Obj.get(a, key), Obj.get(b, key));
        });

        let result = [];

        for ( const key of keys ) {
            result.push(value[key]);
        }

        return result;
    }

    /**
     * Sort by primitive key order
     *
     * @example Arr.sortPrim(["b","a"]) // => ["a","b"]
     *
     * @param {any} value Input list
     * @returns {Array<any>} Sorted list
     */
    static sortPrim(value)
    {
        let keys = Mix.keys(value).sort((a, b) => {
            return Mix.compare(a, b);
        });

        let result = [];

        for ( const key of keys ) {
            result.push(value[key]);
        }

        return result;
    }

    /**
     * Merge arrays (concat)
     *
     * @example Arr.merge([1],[2]) // => [1,2]
     *
     * @param {Array<any>} value Base array
     * @param {...any} args Arrays to add
     * @returns {Array<any>} Merged array
     */
    static merge(value, ...args)
    {
        return value.concat(...args);
    }

    /**
     * Prepend items (mutates)
     *
     * @example Arr.prepend([2], 1) // => [1,2]
     *
     * @param {Array<any>} value Target array
     * @param {...any} args Items to add
     * @returns {Array<any>} Mutated array
     */
    static prepend(value, ...args)
    {
        return (value.unshift(...args), value);
    }

    /**
     * Append items (mutates)
     *
     * @example Arr.append([1], 2) // => [1,2]
     *
     * @param {Array<any>} value Target array
     * @param {...any} args Items to add
     * @returns {Array<any>} Mutated array
     */
    static append(value, ...args)
    {
        return (value.push(...args), value);
    }

    /**
     * Add item if not present
     *
     * @example Arr.add([1], 2) // => [1,2]
     *
     * @param {Array<any>} value Target array
     * @param {any} target Item to add
     * @param {any} [finder] Finder value
     * @returns {Array<any>} Mutated array
     */
    static add(value, target, finder = null)
    {
        if ( finder == null ) {
            finder = target;
        }

        if ( this.findIndex(value, finder) !== -1 ) {
            return value;
        }

        return (value.push(target), value);
    }

    /**
     * Replace existing item or add
     *
     * @example Arr.replace([1], 2) // => [1,2]
     *
     * @param {Array<any>} value Target array
     * @param {any} target Item to add
     * @param {any} [finder] Finder value
     * @returns {Array<any>} Mutated array
     */
    static replace(value, target, finder = null)
    {
        if ( finder == null ) {
            finder = target;
        }

        let index = this.findIndex(value, finder);

        if ( index !== -1 ) {
            this.splice(value, index, 1);
        }

        return (value.push(target), value);
    }

    /**
     * Remove item if present
     *
     * @example Arr.remove([1,2], 1) // => [2]
     *
     * @param {Array<any>} value Target array
     * @param {any} target Item to remove
     * @param {any} [finder] Finder value
     * @returns {Array<any>} Mutated array
     */
    static remove(value, target, finder = null)
    {
        if ( finder == null ) {
            finder = target;
        }

        let index = this.findIndex(value, finder);

        if ( index === -1 ) {
            return value;
        }

        return (this.splice(value, index, 1), value);
    }

    /**
     * Toggle item in array
     *
     * @example Arr.toggle([1], 1) // => []
     * @example Arr.toggle([], 1) // => [1]
     *
     * @param {Array<any>} value Target array
     * @param {any} target Item to toggle
     * @param {any} [finder] Finder value
     * @returns {Array<any>} Mutated array
     */
    static toggle(value, target, finder = null)
    {
        if ( finder == null ) {
            finder = target;
        }

        let index = this.findIndex(value, finder);

        if ( index === -1 ) {
            return (value.push(target), value);
        }

        return (this.splice(value, index, 1), value);
    }

    /**
     * Insert item at index (mutates)
     *
     * @example Arr.insert([1,3], 1, 2) // => [1,2,3]
     *
     * @param {Array<any>} value Target array
     * @param {number} index Insert index
     * @param {any} target Item to insert
     * @returns {Array<any>} Mutated array
     */
    static insert(value, index, target)
    {
        return (this.splice(value, index, 0, target), value);
    }

    /**
     * Slice array from index
     *
     * @example Arr.slice([1,2,3], 1, 2) // => [2,3]
     *
     * @param {Array<any>} value Source array
     * @param {number} index Start index
     * @param {number} [length] Slice length
     * @returns {Array<any>} Sliced array
     */
    static slice(value, index, length = 1)
    {
        return value.slice(parseInt(index), length);
    }

    /**
     * Splice array (mutates)
     *
     * @example Arr.splice([1,2], 0, 1) // => [1]
     *
     * @param {Array<any>} value Target array
     * @param {number} index Start index
     * @param {number} [length] Remove count
     * @param {...any} args Items to add
     * @returns {any} Splice result
     */
    static splice(value, index, length = 1, ...args)
    {
        return value.splice(parseInt(index), length, ...args);
    }

    /**
     * Splice multiple indexes
     *
     * @example Arr.splices([1,2,3],[0,2]) // => [2]
     *
     * @param {Array<any>} value Target array
     * @param {Array<number>} indexies Index list
     * @param {number} [length] Remove count
     * @returns {Array<any>} Mutated array
     */
    static splices(value, indexies, length = 1)
    {
        this.each(indexies, (index) => {
            this.splice(value, index, length);
        });

        return value;
    }

    /**
     * Deep clone array/object
     *
     * @example Arr.clone([1,{a:1}]) // => new array
     *
     * @param {any} value Value to clone
     * @returns {any} Cloned value
     */
    static clone(value)
    {
        if ( Mix.isPrim(value) ) {
            return value;
        }

        if ( Mix.isObj(value) ) {
            return Obj.clone(value);
        }

        if ( ! Mix.isArr(value) ) {
            return value;
        }

        let result = new Array(value.length);

        for ( let i = 0; i < value.length; i ++ ) {
            result[i] = this.clone(value[i]);
        }

        return result;
    }

    /**
     * Get items not in others
     *
     * @example Arr.diff([1,2],[2]) // => [1]
     *
     * @param {...Array<any>} args Arrays to diff
     * @returns {Array<any>} Difference list
     */
    static diff(...args)
    {
        return args.reduce((a, c) => {
            return a.filter(i => !c.includes(i))
        });
    }

    /**
     * Get intersecting items
     *
     * @example Arr.isect([1,2],[2,3]) // => [2]
     *
     * @param {...Array<any>} args Arrays to intersect
     * @returns {Array<any>} Intersection list
     */
    static isect(...args)
    {
        return args.reduce((a, c) => {
            return a.filter(i => c.includes(i))
        });
    }

    /**
     * Extract property values from list
     *
     * @example Arr.extract([{id:1}], "id") // => [1]
     *
     * @param {Array<any>} value Input list
     * @param {any} key Key path
     * @returns {Array<any>} Extracted list
     */
    static extract(value, key)
    {
        let result = new Array(value.length);

        for ( let i = 0; i < value.length; i ++ ) {
            result[i] = Obj.get(value[i], key);
        }

        return result;
    }

    /**
     * Reduce list values
     *
     * @example Arr.reduce([1,2], (a,c)=>a+c, 0) // => 3
     *
     * @param {any} value Input list
     * @param {function} callback Reducer callback
     * @param {any} accumulator Start value
     * @returns {any} Reduced value
     */
    static reduce(value, callback, accumulator)
    {
        return Mix.vals(value).reduce(callback, accumulator);
    }

    /**
     * Split array into chunks
     *
     * @example Arr.chunk([1,2,3], 2) // => [[1,2],[3]]
     *
     * @param {Array<any>} value Source array
     * @param {number} [chunk] Chunk size
     * @returns {Array<Array<any>>} Chunked list
     */
    static chunk(value, chunk = 10)
    {
        let res = [];

        for ( let i = 0; i < value.length; i += chunk ) {
            res.push(value.slice(i, i + chunk));
        }

        return res;
    }

    /**
     * Check if value includes search
     *
     * @example Arr.includes([1,2], 2) // => true
     * @example Arr.includes([{a:1}], {a:1}) // => true
     *
     * @param {any} value Target value
     * @param {any} search Search spec
     * @returns {boolean} True if includes
     */
    static includes(value, search)
    {
        if ( Mix.isObj(search) ) {
            return Obj.includes(value, search);
        }

        if ( ! Mix.isArr(search) ) {
            return value === search;
        }

        let [result, length] = [
            false, search.length,
        ];

        if ( length === 0 ) {
            return true;
        }

        for ( let i = 0; result === false && i < length; i++) {
            result ||= this.has(value, search[i]);
        }

        return result;
    }

    /**
     * Check array contains all values
     *
     * @example Arr.contains([1,2], [2]) // => true
     *
     * @param {any} arr Target array
     * @param {any} val Required values
     * @returns {boolean} True if contains
     */
    static contains(arr, val)
    {
        let result = true;

        for ( let key of Mix.vals(val) ) {
            result &&= Mix.vals(arr).indexOf(key) !== -1;
        }

        return result;
    }

    /**
     * Check arrays match (set-like)
     *
     * @example Arr.matches([1,2], [2,1]) // => true
     *
     * @param {any} value Target list
     * @param {any} search Search spec
     * @returns {boolean} True if matches
     */
    static matches(value, search)
    {
        if ( Mix.isObj(search) ) {
            return Obj.matches(value, search);
        }

        if ( ! Mix.isArr(value) ) {
            return value === search;
        }

        search = this.unique(search);

        let [result, length] = [
            true, search.length,
        ];

        if ( value.length !== search.length ) {
            return false;
        }

        for ( let i = 0; result === true && i < length; i++) {
            result &&= this.has(value, search[i]);
        }

        return result;
    }

}

/**
 * @see PicoArray.unset
 */
PicoArray.removeIndex = (...args) => {
    console.warn('Arr.removeIndex() is deprecated, use Arr.unset() instead.');
    return Arr.unset(...args);
};

/**
 * @see PicoArray.sortPrim
 */
PicoArray.sortString = (...args) => {
    console.warn('Arr.sortString() is deprecated, use Arr.sortPrim() instead.');
    return Arr.sortPrim(...args);
};

/**
 * @see PicoArray.append
 */
PicoArray.push = (...args) => {
    console.warn('Arr.push() is deprecated, use Arr.append() instead.');
    return Arr.append(...args);
};

/**
 * @see PicoArray.merge
 */
PicoArray.concat = (...args) => {
    console.warn('Arr.concat() is deprecated, use Arr.merge() instead.');
    return Arr.merge(...args);
};

/**
 * @see PicoArray.matches
 */
PicoArray.equal = (...args) => {
    console.warn('Arr.equal() is deprecated, use Arr.matches() instead.');
    return Arr.matches(...args);
};

/**
 * @see PicoArray.diff
 */
PicoArray.diffrence = (...args) => {
    console.warn('Arr.diffrence() is deprecated, use Arr.diff() instead.');
    return Arr.diff(...args);
};

/**
 * @see PicoArray.isect
 */
PicoArray.intersect = (...args) => {
    console.warn('Arr.intersect() is deprecated, use Arr.isect() instead.');
    return Arr.isect(...args);
};

export default PicoArray;