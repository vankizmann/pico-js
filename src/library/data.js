import { Arr, Obj, Num, Any, Event } from "../index.js";

export class Data
{
    static data = Obj.get(Any.global(), '_data', {});

    static has(input)
    {
        return Obj.has(this.data, Arr.first(input));
    }

    static set(input, value)
    {
        let clone = value, key = Arr.first(input);

        if ( Any.isEqual(Obj.get(this.data, key), clone) ) {
            return;
        }

        Obj.set(this.data, key, clone);

        Event.fire('store:' + key, clone, key);
    }

    static unset(input)
    {
        let key = Arr.first(input);

        Obj.unset(this.data, key);
    }

    static get (input, fallback = null, forceSet = false)
    {
        let key = Arr.first(input);

        if ( ! Obj.has(this.data, key) && ! forceSet ) {
            return fallback;
        }

        if ( Obj.has(this.data, key) && forceSet ) {
            Obj.set(this.data, key, fallback);
        }

        let value = Obj.get(this.data, key, fallback);

        if ( ! Any.isPlain(value) ) {
            return value;
        }

        return Obj.clone(value);
    }

    static find (input, value, fallback = null)
    {
        let key = Arr.first(input);

        if ( Obj.has(this.data, key) === false ) {
            return fallback;
        }

        if ( Obj.has(value, 'id') === false  ) {
            return fallback;
        }

        let index = Arr.findIndex(this.get(key), {
            id: value.id
        });

        if ( index === -1 ) {
            return fallback;
        }

        return this.get(key + '.' + index);
    }

    static replace (input, value)
    {
        let key = Arr.first(input);

        if ( Obj.has(this.data, key) === false ) {
            return;
        }

        if ( Obj.has(value, 'id') === false  ) {
            return;
        }

        let index = Arr.findIndex(this.get(key), {
            id: Num.int(value.id)
        });

        if ( index === -1 ) {
            return;
        }

        this.set(key + '.' + index, value);
    }

    static add (input, ...args)
    {
        this.set(input, Arr.concat(this.get(input, []), args));
    }

    static remove (input, ...args)
    {
        this.set(input, Arr.diff(this.get(input, []), args));
    }

}

export default Data;
