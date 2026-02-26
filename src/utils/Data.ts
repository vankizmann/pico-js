import { Arr, Num, Signal, Mix, Obj } from "../index.esm.ts";

export class PicoData
{
    /**
     * In-memory data store
     *
     * @type {any}
     */
    static $data : any = {};

    /**
     * Check if store key exists
     *
     * @example Data.has(["x"]) // => true|false
     *
     * @param {any} input Store key input
     * @returns {boolean} True if exists
     */
    static has(input : any) : boolean
    {
        return Obj.has(this.$data, ...[
            Arr.first(input)
        ]);
    }

    /**
     * Set store key and fire event
     *
     * @example Data.set(["x"], 1)
     * @example Data.set(["x"], {a:1})
     *
     * @param {any} input Store key input
     * @param {any} value Value to set
     * @returns {void} No return value
     */
    static set(input : any, value : any) : void
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

        Signal.fire('store:' + key, value, key);
    }

    /**
     * Remove store key
     *
     * @example Data.unset(["x"])
     *
     * @param {any} input Store key input
     * @returns {void} No return value
     */
    static unset(input : any) : void
    {
        Obj.unset(this.$data, [
            ...Arr.first(input)
        ]);
    }

    /**
     * Get stored value (cloned)
     *
     * @example Data.get(["x"], null) // => value
     * @example Data.get(["x"], 1, true) // set+get
     *
     * @param {any} input Store key input
     * @param {any} [fallback] Fallback value
     * @param {boolean} [forceSet] Set if missing
     * @returns {any} Stored value
     */
    static get(input : any, fallback : any = null, forceSet : boolean = false) : any
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

    /**
     * Find item by id in array store
     *
     * @example Data.find(["list"], {id:1})
     *
     * @param {any} input Store key input
     * @param {any} value Search value
     * @param {any} [fallback] Fallback value
     * @returns {any} Found item
     */
    static find(input : any, value : any, fallback : any = null) : any
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

        if ( index === -1 ) {
            return fallback;
        }

        return this.get(key + '.' + index);
    }

    /**
     * Replace item by id in array store
     *
     * @example Data.replace(["list"], {id:1})
     *
     * @param {any} input Store key input
     * @param {any} value Item to replace
     * @returns {void} No return value
     */
    static replace(input : any, value : any) : void
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

        if ( index === -1 ) {
            return;
        }

        this.set(key + '.' + index, value);
    }

    /**
     * Add items to array store
     *
     * @example Data.add(["list"], 1, 2)
     *
     * @param {any} input Store key input
     * @param {[...any]} args Items to add
     * @returns {void} No return value
     */
    static add(input : any, ...args : [...any]) : void
    {
        this.set(input, Arr.merge(this.get(input, []), args));
    }

    /**
     * Remove items from array store
     *
     * @example Data.remove(["list"], 1)
     *
     * @param {any} input Store key input
     * @param {[...any]} args Items to remove
     * @returns {void} No return value
     */
    static remove(input : any, ...args : [...any]) : void
    {
        this.set(input, Arr.diff(this.get(input, []), args));
    }

}

export default PicoData;