import { Obj, Num, Any } from "../index"

export class Arr
{
    static make(count)
    {
        return Arr.map(Array(count).fill(null), (val, key) => {
            return Num.int(key) + 1;
        });
    }

    static all(arr)
    {
        return Array.isArray(arr) ? arr : [arr];
    }

    static get(arr, index, fallback = null)
    {
        return arr[index] || fallback;
    }

    static set(arr, index, value)
    {
        return arr[index] = value;
    }

    static first(arr)
    {
        return Array.isArray(arr) ? arr[0] : arr;
    }

    static second(arr)
    {
        return Array.isArray(arr) ? arr[1] || arr[0] : arr;
    }

    static third(arr)
    {
        return Array.isArray(arr) ? arr[2] || arr[1] || arr[0] : arr;
    }

    static last(arr)
    {
        return Array.isArray(arr) ? arr[arr.length - 1] : arr;
    }

    static prepend(arr, val)
    {
        arr.splice(0, 0, val);
        return arr;
    }

    static append(arr, val)
    {
        arr.splice(arr.length, 0, val);
        return arr;
    }

    static sort(obj, key)
    {
        let keys = Any.keys(obj).sort((a, b) => {
            return Any.integer(Obj.get(obj[a], key)) - Any.integer(Obj.get(obj[b], key));
        });

        let result = [];

        Arr.each(keys, (key, index) => {
            obj[key]['_key'] = key;
            result[index] = obj[key];
        });

        return result;
    }

    static filter(arr, filter)
    {
        return Arr.each(Arr.filterIndex(arr, filter), (key) => {
            return arr[key];
        });
    }

    static filterIndex(arr, filter)
    {
        return Any.keys(arr).filter((key) => {

            if ( Any.isFunction(filter) ) {
                return filter.call({}, arr[key], key);
            }

            if ( Any.isPlain(filter) ) {
                return Obj.includes(filter, arr[key]);
            }

            if ( Any.isArray(filter) ) {
                return Arr.includes(filter, arr[key]);
            }

            return filter === arr[key];
        });
    }

    static find(arr, val, fallback = null)
    {
        return Arr.first(Arr.filter(arr, val)) || fallback;
    }

    static findIndex(arr, val, fallback = -1)
    {
        return Any.integer(Arr.first(Arr.filterIndex(arr, val)) || fallback);
    }

    static has(arr, val)
    {
        return this.findIndex(arr, val) !== - 1;
    }

    static add(arr, val, finder = null)
    {
        let index = this.findIndex(arr, finder || val);

        if ( index === - 1 ) {
            arr.push(val);
        }

        return arr;
    }

    static remove(arr, val)
    {
        let index = this.findIndex(arr, val);

        if ( index !== - 1 ) {
            arr.splice(index, 1);
        }

        return arr;
    }

    static toggle(arr, val)
    {
        let index = this.findIndex(arr, val);

        if ( index !== - 1 ) {
            arr.splice(index, 1);
        } else {
            arr.push(val);
        }

        return arr;
    }

    static removeIndex(arr, val)
    {
        if ( val < arr.length ) {
            arr.splice(Num.int(val), 1);
        }

        return arr;
    }

    static insert(arr, key, val)
    {
        arr.splice(Num.int(key), 0, val);

        return arr;
    }

    static slice(arr, key, count = 1)
    {
        return arr.slice(Num.int(key), count);
    }

    static splice(arr, key, count = 1)
    {
        return arr.splice(Num.int(key), count);
    }

    static includes(arr, val)
    {
        let result = false;

        for ( let key of Any.vals(arr) ) {
            result = val.indexOf(key) !== -1 || result;
        }

        return result;
    }

    static concat(arr, ...args)
    {
        return arr.concat(...args);
    }

    static clone(arr)
    {
        let clone;

        if ( Any.isPlain(arr) ){
            return Obj.clone(arr);
        }

        if ( Any.isArray(arr) ){

            clone = [];

            for ( let key of Any.keys(arr) ) {
                clone[key] = Obj.clone(arr[key]);
            }

            return clone;
        }

        return clone || arr;
    }

    static merge(arr, ...args)
    {
        return arr.concat(...args);
    }

    static push(arr, ...args)
    {
        arr.push(...args);

        return arr;
    }

    static diff(arr, val)
    {
        return arr.filter((diff) => val.indexOf(diff) < 0);
    }

    static intersect(...args)
    {
        return args.reduce((a, c) => a.filter(i => c.includes(i)));
    }

    static chunk(arr, chunk = 10)
    {
        let res = [];

        for ( let i = 0; i < arr.length; i += chunk ) {
            res.push(arr.slice(i, i + chunk));
        }

        return res;
    }

    static reduce(arr, callback, accumulator)
    {
        return Object.values(arr).reduce(callback, accumulator);
    }

    static each(arr, callback)
    {
        let result = Arr.clone(arr);

        for ( let key of Any.keys(result) ) {
            result[key] = callback(result[key], Any.isNumber(key) ?
                Any.integer(key) : key);
        }

        return Any.vals(result);
    }

    static map(arr, callback)
    {
        let result = Arr.clone(arr);

        for ( let key of Any.keys(result) ) {
            result[key] = arr[key] = callback(result[key], Any.isNumber(key) ?
                Any.integer(key) : key);
        }

        return result;
    }

    static recursive(arr, key, callback, cascade = [])
    {
        if ( Any.isArray(arr) === true ) {
            return this.map(arr, (val) => {
                return this.recursive(val, key, callback, cascade);
            });
        }

        if ( Any.isObject(arr) === true ) {

            let res = callback(arr, cascade);

            arr = res !== undefined ?
                res : arr;
        }

        if ( Any.isArray(arr[key]) === true ) {

            cascade = Arr.clone(cascade);

            Arr.push(cascade, arr);

            arr[key] = this.map(arr[key], (val) => {
                return this.recursive(val, key, callback, cascade);
            });

            return arr;
        }

        if ( Any.isEmpty(arr[key]) === false ) {

            cascade = Arr.clone(cascade);

            Arr.push(cascade, arr);

            arr[key] = this.recursive(arr[key], key, callback, cascade);

            return arr;
        }

        return arr;
    }

}

export default Arr;
