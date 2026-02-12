import { Arr, Num, Event, Mix, Obj } from "../index.esm.js";

export class PicoData
{
    /**
     * In-memory data store
     *
     * @type {Record<string, any>}
     */
    static $data = {};

    /**
     * Check if store key exists
     *
     * @example Data.has(["x"]) // => true|false
     *
     * @param {any} input Store key input
     * @returns {boolean} True if exists
     */
    static has(input)
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

    /**
     * Remove store key
     *
     * @example Data.unset(["x"])
     *
     * @param {any} input Store key input
     * @returns {void} No return value
     */
    static unset(input)
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

    /**
     * Replace item by id in array store
     *
     * @example Data.replace(["list"], {id:1})
     *
     * @param {any} input Store key input
     * @param {any} value Item to replace
     * @returns {void} No return value
     */
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

    /**
     * Add items to array store
     *
     * @example Data.add(["list"], 1, 2)
     *
     * @param {any} input Store key input
     * @param {...any} args Items to add
     * @returns {void} No return value
     */
    static add(input, ...args)
    {
        this.set(input, Arr.concat(this.get(input, []), args));
    }

    /**
     * Remove items from array store
     *
     * @example Data.remove(["list"], 1)
     *
     * @param {any} input Store key input
     * @param {...any} args Items to remove
     * @returns {void} No return value
     */
    static remove(input, ...args)
    {
        this.set(input, Arr.diff(this.get(input, []), args));
    }

}

export default PicoData;