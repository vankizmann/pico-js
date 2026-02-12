export class PicoData {
    /**
     * In-memory data store
     *
     * @type {Record<string, any>}
     */
    static $data: Record<string, any>;
    /**
     * Check if store key exists
     *
     * @example Data.has(["x"]) // => true|false
     *
     * @param {any} input Store key input
     * @returns {boolean} True if exists
     */
    static has(input: any): boolean;
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
    static set(input: any, value: any): void;
    /**
     * Remove store key
     *
     * @example Data.unset(["x"])
     *
     * @param {any} input Store key input
     * @returns {void} No return value
     */
    static unset(input: any): void;
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
    static get(input: any, fallback?: any, forceSet?: boolean): any;
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
    static find(input: any, value: any, fallback?: any): any;
    /**
     * Replace item by id in array store
     *
     * @example Data.replace(["list"], {id:1})
     *
     * @param {any} input Store key input
     * @param {any} value Item to replace
     * @returns {void} No return value
     */
    static replace(input: any, value: any): void;
    /**
     * Add items to array store
     *
     * @example Data.add(["list"], 1, 2)
     *
     * @param {any} input Store key input
     * @param {...any} args Items to add
     * @returns {void} No return value
     */
    static add(input: any, ...args: any[]): void;
    /**
     * Remove items from array store
     *
     * @example Data.remove(["list"], 1)
     *
     * @param {any} input Store key input
     * @param {...any} args Items to remove
     * @returns {void} No return value
     */
    static remove(input: any, ...args: any[]): void;
}
export default PicoData;
