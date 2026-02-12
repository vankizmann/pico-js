import { Obj, Mix, Arr } from "#src/index.esm.js";

export class PicoArray
{

    static all(value)
    {
        return Mix.isArr(value) ? value : [value];
    }

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

    static set(target, index, value)
    {
        return this.splice(target, index, 1, value);
    }

    static unset(target, index)
    {
        return this.splice(target, index, 1);
    }

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

    static unique(value)
    {
        let buffer = {};

        for ( const val of value ) {
            buffer[val] = true;
        }

        return Mix.keys(buffer);
    }

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

    static first(value, fallback = null)
    {
        return this.get(value, 0, fallback);
    }

    static second(value, fallback = null)
    {
        return this.get(value, 2, fallback);
    }

    static third(value, fallback = null)
    {
        return this.get(value, 2, fallback);
    }

    static last(value, fallback = null)
    {
        return this.get(value, value.length - 1, fallback);
    }

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

    static find(value, filter = null, fallback = null)
    {
        let index = this.findIndex(value, filter);

        if ( index === - 1 ) {
            return fallback;
        }

        return value[index];
    }

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

    static merge(value, ...args)
    {
        return value.concat(...args);
    }

    static prepend(value, ...args)
    {
        return (value.unshift(...args), value);
    }

    static append(value, ...args)
    {
        return (value.push(...args), value);
    }

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

    static insert(value, index, target)
    {
        return (this.splice(value, index, 0, target), value);
    }

    static slice(value, index, length = 1)
    {
        return value.slice(parseInt(index), length);
    }

    static splice(value, index, length = 1, ...args)
    {
        return value.splice(parseInt(index), length, ...args);
    }

    static splices(value, indexies, length = 1)
    {
        this.each(indexies, (index) => {
            this.splice(value, index, length);
        });

        return value;
    }

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

    static diff(...args)
    {
        return args.reduce((a, c) => {
            return a.filter(i => !c.includes(i))
        });
    }

    static isect(...args)
    {
        return args.reduce((a, c) => {
            return a.filter(i => c.includes(i))
        });
    }

    static extract(value, key)
    {
        let result = new Array(value.length);

        for ( let i = 0; i < value.length; i ++ ) {
            result[i] = Obj.get(value[i], key);
        }

        return result;
    }

    static reduce(value, callback, accumulator)
    {
        return Mix.vals(value).reduce(callback, accumulator);
    }

    static chunk(value, chunk = 10)
    {
        let res = [];

        for ( let i = 0; i < value.length; i += chunk ) {
            res.push(value.slice(i, i + chunk));
        }

        return res;
    }

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

    static contains(arr, val)
    {
        let result = true;

        for ( let key of Mix.vals(val) ) {
            result &&= Mix.vals(arr).indexOf(key) !== -1;
        }

        return result;
    }

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

PicoArray.removeIndex = (...args) => {
    console.warn('Arr.removeIndex() is deprecated, use Arr.unset() instead.');
    return Arr.unset(...args);
};

PicoArray.sortString = (...args) => {
    console.warn('Arr.sortString() is deprecated, use Arr.sortPrim() instead.');
    return Arr.sortPrim(...args);
};

PicoArray.push = (...args) => {
    console.warn('Arr.push() is deprecated, use Arr.append() instead.');
    return Arr.append(...args);
};

PicoArray.concat = (...args) => {
    console.warn('Arr.concat() is deprecated, use Arr.merge() instead.');
    return Arr.merge(...args);
};

PicoArray.equal = (...args) => {
    console.warn('Arr.equal() is deprecated, use Arr.matches() instead.');
    return Arr.matches(...args);
};

// PicoArray.contains = (...args) => {
//     console.warn('Arr.contains() is deprecated, use Arr.includes() instead.');
//     return PicoArray.includes(...args);
// };

PicoArray.diffrence = (...args) => {
    console.warn('Arr.diffrence() is deprecated, use Arr.diff() instead.');
    return Arr.diff(...args);
};

PicoArray.intersect = (...args) => {
    console.warn('Arr.intersect() is deprecated, use Arr.isect() instead.');
    return Arr.isect(...args);
};

export default PicoArray;