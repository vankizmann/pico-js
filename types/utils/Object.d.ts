export class PicoObject {
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
    static keyoptim(keys: any, flatten?: boolean, isstr?: boolean | null): Array<any>;
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
    static has(target: any, keys: any, flatten?: boolean): boolean;
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
    static get(target: any, keys: any, fallback?: any, flatten?: boolean): any;
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
    static set(target: any, keys: any, value: any, flatten?: boolean): any;
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
    static unset(target: any, keys: any, flatten?: boolean): any;
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
    static empty(target: any, key: any): boolean;
    /**
     * Unset multiple keys (mutates)
     *
     * @example Obj.remove({a:1,b:2}, ["a"]) // => object
     *
     * @param {any} target Target object
     * @param {any} keys Keys list
     * @returns {any} Mutated target
     */
    static remove(target: any, keys: any): any;
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
    static each(value: any, cb: Function, retval?: any): any;
    /**
     * Map object values to object
     *
     * @example Obj.map({a:1}, v => v+1) // => {a:2}
     *
     * @param {any} value Source object
     * @param {function} cb Map callback
     * @returns {Record<string, any>} Mapped object
     */
    static map(value: any, cb: Function): Record<string, any>;
    /**
     * Get filtered key indexes
     *
     * @example Obj.filterIndex({a:1,b:null}) // => ["a"]
     *
     * @param {any} value Source object
     * @param {any} [filter] Filter spec
     * @returns {Array<any>} Key list
     */
    static filterIndex(value: any, filter?: any): Array<any>;
    /**
     * Filter object by key filter
     *
     * @example Obj.filter({a:1,b:null}) // => {a:1}
     *
     * @param {any} value Source object
     * @param {any} [filter] Filter spec
     * @returns {Record<string, any>} Filtered object
     */
    static filter(value: any, filter?: any): Record<string, any>;
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
    static flatten(value: any, prefix?: string, result?: Record<string, any>): Record<string, any>;
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
    static flattenForm(value: any, prefix?: string, result?: Record<string, any>): Record<string, any>;
    /**
     * Unpack dotted keys into object
     *
     * @example Obj.unpack({"a.b":1}) // => {a:{b:1}}
     *
     * @param {any} value Flat key map
     * @param {Record<string, any>} [result] Result object
     * @returns {Record<string, any>} Unpacked object
     */
    static unpack(value: any, result?: Record<string, any>): Record<string, any>;
    /**
     * Assign objects (Object.assign)
     *
     * @example Obj.assign({}, {a:1}) // => {a:1}
     *
     * @param {...any} args Assign args
     * @returns {any} Assigned object
     */
    static assign(...args: any[]): any;
    /**
     * Deep clone primitive/array/object
     *
     * @example Obj.clone({a:{b:1}}) // => new object
     *
     * @param {any} value Value to clone
     * @param {any} [merge] Merge values
     * @returns {any} Cloned value
     */
    static clone(value: any, merge?: any): any;
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
    static pluck(value: any, key: any, fallback?: any): any;
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
    static only(value: any, keys: Array<any>, merge?: any): Record<string, any>;
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
    static except(value: any, keys: Array<any>, merge?: any): Record<string, any>;
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
    static includes(value: any, search: any): boolean;
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
    static matches(value: any, search: any): boolean;
}
export namespace PicoObject {
    /**
     * @see PicoMixed.vals
     */
    function values(...args: any[]): any[];
    /**
     * @see PicoArray.find
     */
    function find(...args: any[]): any;
    /**
     * @see PicoArray.findIndex
     */
    function findIndex(...args: any[]): number;
    /**
     * @see PicoArray.sort
     */
    function sort(...args: any[]): any[];
    /**
     * @see PicoArray.sortDeep
     */
    function sortString(...args: any[]): any[];
}
export default PicoObject;
