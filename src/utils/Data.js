import { Arr, Num, Event, Mix, Obj } from "#src/index.esm.js";

export class PicoData
{
    static $data = {};

    static has(input)
    {
        return Obj.has(this.$data, ...[
            Arr.first(input)
        ]);
    }

    static set(input, value)
    {
        let [stored, key] = [
            null, Arr.first(input)
        ];

        if ( Obj.has(this.$data, key) ) {
            stored = Obj.get(this.$data, key);
        }

        if ( Mix.isEqual(stored, value) ) {
            return;
        }

        Obj.set(...[
            this.$data, key, value
        ]);

        Event.fire('store:' + key, value, key);
    }

    static unset(input)
    {
        Obj.unset(this.$data, [
            ...Arr.first(input)
        ]);
    }

    static get(input, fallback = null, forceSet = false)
    {
        let key = Arr.first(input);

        if ( !Obj.has(this.$data, key) && !forceSet ) {
            return fallback;
        }

        if ( Obj.has(this.$data, key) && forceSet ) {
            Obj.set(this.$data, key, fallback);
        }

        let value = Obj.get(this.$data, key, fallback);

        if ( !Mix.isObj(value) ) {
            return value;
        }

        return Obj.clone(value);
    }

    static find(input, value, fallback = null)
    {
        let key = Arr.first(input);

        if ( Obj.has(this.$data, key) === false ) {
            return fallback;
        }

        if ( Obj.has(value, 'id') === false ) {
            return fallback;
        }

        let index = Arr.findIndex(this.get(key), {
            id: value.id
        });

        if ( index === - 1 ) {
            return fallback;
        }

        return this.get(key + '.' + index);
    }

    static replace(input, value)
    {
        let key = Arr.first(input);

        if ( Obj.has(this.$data, key) === false ) {
            return;
        }

        if ( Obj.has(value, 'id') === false ) {
            return;
        }

        let index = Arr.findIndex(this.get(key), {
            id: Num.int(value.id)
        });

        if ( index === - 1 ) {
            return;
        }

        this.set(key + '.' + index, value);
    }

    static add(input, ...args)
    {
        this.set(input, Arr.concat(this.get(input, []), args));
    }

    static remove(input, ...args)
    {
        this.set(input, Arr.diff(this.get(input, []), args));
    }

}

export default PicoData;