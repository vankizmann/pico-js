export class PicoArray {
    /**
     * Wrap value into an array
     *
     * @example Arr.all(1) // => [1]
     * @example Arr.all([1]) // => [1]
     *
     * @param {any} value Value to wrap
     * @returns {Array<any>} Wrapped array
     */
    static all(value: any): Array<any>;
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
    static get(value: any, index: number, fallback?: any): any;
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
    static set(target: Array<any>, index: number, value: any): any;
    /**
     * Remove item at index (mutates)
     *
     * @example Arr.unset([1,2], 0) // => [1]
     *
     * @param {Array<any>} target Target array
     * @param {number} index Index to remove
     * @returns {any} Splice result
     */
    static unset(target: Array<any>, index: number): any;
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
    static make(length: number, cb?: any): Array<any>;
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
    static has(value: any, search: any): boolean;
    /**
     * Get unique values as strings
     *
     * @example Arr.unique(["a","a"]) // => ["a"]
     *
     * @param {Array<any>} value Input list
     * @returns {Array<any>} Unique list
     */
    static unique(value: Array<any>): Array<any>;
    /**
     * Check equal lengths for arrays
     *
     * @example Arr.lengths([1],[2]) // => true
     *
     * @param {Array<any>} value Base array
     * @param {...Array<any>} args Other arrays
     * @returns {boolean} True if equal
     */
    static lengths(value: Array<any>, ...args: Array<any>[]): boolean;
    /**
     * Get first item or fallback
     *
     * @example Arr.first([1,2]) // => 1
     *
     * @param {Array<any>} value Input array
     * @param {any} [fallback] Fallback value
     * @returns {any} First item
     */
    static first(value: Array<any>, fallback?: any): any;
    /**
     * Get second item or fallback
     *
     * @example Arr.second([1,2]) // => 2
     *
     * @param {Array<any>} value Input array
     * @param {any} [fallback] Fallback value
     * @returns {any} Second item
     */
    static second(value: Array<any>, fallback?: any): any;
    /**
     * Get third item or fallback
     *
     * @example Arr.third([1,2,3]) // => 3
     *
     * @param {Array<any>} value Input array
     * @param {any} [fallback] Fallback value
     * @returns {any} Third item
     */
    static third(value: Array<any>, fallback?: any): any;
    /**
     * Get last item or fallback
     *
     * @example Arr.last([1,2]) // => 2
     *
     * @param {Array<any>} value Input array
     * @param {any} [fallback] Fallback value
     * @returns {any} Last item
     */
    static last(value: Array<any>, fallback?: any): any;
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
    static each(value: any, cb: Function, retval?: any): any;
    /**
     * Map values in place (mutates)
     *
     * @example Arr.map([1], v => v+1) // => [2]
     *
     * @param {any} value Input list
     * @param {function} cb Map callback
     * @returns {any} Mutated input
     */
    static map(value: any, cb: Function): any;
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
    static recursive(value: any, key: string, cb: Function, cascade?: Array<any>): any;
    /**
     * Get matching indexes by filter
     *
     * @example Arr.filterIndex([0,1], v => v) // => ["1"]
     *
     * @param {any} value Input list
     * @param {any} [filter] Filter spec
     * @returns {Array<string>} Matching keys
     */
    static filterIndex(value: any, filter?: any): Array<string>;
    /**
     * Filter values by filter
     *
     * @example Arr.filter([0,1], v => v) // => [1]
     *
     * @param {any} value Input list
     * @param {any} [filter] Filter spec
     * @returns {Array<any>} Filtered values
     */
    static filter(value: any, filter?: any): Array<any>;
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
    static findIndex(value: Array<any>, filter?: any, fallback?: number): number;
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
    static find(value: Array<any>, filter?: any, fallback?: any): any;
    /**
     * Sort array by key or callback
     *
     * @example Arr.sort([{n:2},{n:1}], "n") // => list
     *
     * @param {any} value Input list
     * @param {any} [key] Key or compare fn
     * @returns {Array<any>} Sorted list
     */
    static sort(value: any, key?: any): Array<any>;
    /**
     * Sort by compare callback
     *
     * @example Arr.sortFunc([2,1], (a,b)=>a-b) // => [1,2]
     *
     * @param {any} value Input list
     * @param {function} cb Compare callback
     * @returns {Array<any>} Sorted list
     */
    static sortFunc(value: any, cb: Function): Array<any>;
    /**
     * Sort by nested key value
     *
     * @example Arr.sortDeep([{a:{n:2}},{a:{n:1}}], "a.n") // => list
     *
     * @param {any} value Input list
     * @param {any} key Key path
     * @returns {Array<any>} Sorted list
     */
    static sortDeep(value: any, key: any): Array<any>;
    /**
     * Sort by primitive key order
     *
     * @example Arr.sortPrim(["b","a"]) // => ["a","b"]
     *
     * @param {any} value Input list
     * @returns {Array<any>} Sorted list
     */
    static sortPrim(value: any): Array<any>;
    /**
     * Merge arrays (concat)
     *
     * @example Arr.merge([1],[2]) // => [1,2]
     *
     * @param {Array<any>} value Base array
     * @param {...any} args Arrays to add
     * @returns {Array<any>} Merged array
     */
    static merge(value: Array<any>, ...args: any[]): Array<any>;
    /**
     * Prepend items (mutates)
     *
     * @example Arr.prepend([2], 1) // => [1,2]
     *
     * @param {Array<any>} value Target array
     * @param {...any} args Items to add
     * @returns {Array<any>} Mutated array
     */
    static prepend(value: Array<any>, ...args: any[]): Array<any>;
    /**
     * Append items (mutates)
     *
     * @example Arr.append([1], 2) // => [1,2]
     *
     * @param {Array<any>} value Target array
     * @param {...any} args Items to add
     * @returns {Array<any>} Mutated array
     */
    static append(value: Array<any>, ...args: any[]): Array<any>;
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
    static add(value: Array<any>, target: any, finder?: any): Array<any>;
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
    static replace(value: Array<any>, target: any, finder?: any): Array<any>;
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
    static remove(value: Array<any>, target: any, finder?: any): Array<any>;
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
    static toggle(value: Array<any>, target: any, finder?: any): Array<any>;
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
    static insert(value: Array<any>, index: number, target: any): Array<any>;
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
    static slice(value: Array<any>, index: number, length?: number): Array<any>;
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
    static splice(value: Array<any>, index: number, length?: number, ...args: any[]): any;
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
    static splices(value: Array<any>, indexies: Array<number>, length?: number): Array<any>;
    /**
     * Deep clone array/object
     *
     * @example Arr.clone([1,{a:1}]) // => new array
     *
     * @param {any} value Value to clone
     * @returns {any} Cloned value
     */
    static clone(value: any): any;
    /**
     * Get items not in others
     *
     * @example Arr.diff([1,2],[2]) // => [1]
     *
     * @param {...Array<any>} args Arrays to diff
     * @returns {Array<any>} Difference list
     */
    static diff(...args: Array<any>[]): Array<any>;
    /**
     * Get intersecting items
     *
     * @example Arr.isect([1,2],[2,3]) // => [2]
     *
     * @param {...Array<any>} args Arrays to intersect
     * @returns {Array<any>} Intersection list
     */
    static isect(...args: Array<any>[]): Array<any>;
    /**
     * Extract property values from list
     *
     * @example Arr.extract([{id:1}], "id") // => [1]
     *
     * @param {Array<any>} value Input list
     * @param {any} key Key path
     * @returns {Array<any>} Extracted list
     */
    static extract(value: Array<any>, key: any): Array<any>;
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
    static reduce(value: any, callback: Function, accumulator: any): any;
    /**
     * Split array into chunks
     *
     * @example Arr.chunk([1,2,3], 2) // => [[1,2],[3]]
     *
     * @param {Array<any>} value Source array
     * @param {number} [chunk] Chunk size
     * @returns {Array<Array<any>>} Chunked list
     */
    static chunk(value: Array<any>, chunk?: number): Array<Array<any>>;
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
    static includes(value: any, search: any): boolean;
    /**
     * Check array contains all values
     *
     * @example Arr.contains([1,2], [2]) // => true
     *
     * @param {any} arr Target array
     * @param {any} val Required values
     * @returns {boolean} True if contains
     */
    static contains(arr: any, val: any): boolean;
    /**
     * Check arrays match (set-like)
     *
     * @example Arr.matches([1,2], [2,1]) // => true
     *
     * @param {any} value Target list
     * @param {any} search Search spec
     * @returns {boolean} True if matches
     */
    static matches(value: any, search: any): boolean;
}
export namespace PicoArray {
    /**
     * @see PicoArray.unset
     */
    function removeIndex(...args: any[]): any;
    /**
     * @see PicoArray.sortPrim
     */
    function sortString(...args: any[]): any[];
    /**
     * @see PicoArray.append
     */
    function push(...args: any[]): any[];
    /**
     * @see PicoArray.merge
     */
    function concat(...args: any[]): any[];
    /**
     * @see PicoArray.matches
     */
    function equal(...args: any[]): boolean;
    /**
     * @see PicoArray.diff
     */
    function diffrence(...args: any[]): any[];
    /**
     * @see PicoArray.isect
     */
    function intersect(...args: any[]): any[];
}
export default PicoArray;
