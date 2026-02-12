/**
 * @memberof PicoDom
 */
export class PicoDomFinderStatic {
    /**
     * Filter nodes by type
     *
     * @example Dom.filterNodes(nodes, 1)
     *
     * @param {any} nodes Source nodes
     * @param {number} [filter] Node type
     * @returns {Array<Element>} Filtered nodes
     */
    static filterNodes(nodes: any, filter?: number): Array<Element>;
    /**
     * Get nodes at point
     *
     * @example Dom.getNodePoint(100, 100)
     *
     * @param {number} posx X position
     * @param {number} posy Y position
     * @returns {Array<Element>} Nodes at point
     */
    static getNodePoint(posx: number, posy: number): Array<Element>;
    /**
     * Get target by selector
     *
     * @example Dom.getNodeEvent(".item", event)
     *
     * @param {string} selector Node selector
     * @param {any} [event] Event object
     * @returns {Element} Found element
     */
    static getNodeEvent(selector: string, event?: any): Element;
}
/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomFinderInstance {
    /**
     * Resolve input elements
     *
     * @example Dom._constructFinder(".item")
     *
     * @param {any} el Input value
     * @returns {any} Resolved elements
     */
    static _constructFinder(el: any): any;
    /**
     * Get node type
     *
     * @example Dom.find("div").getNodeType() // => 1
     *
     * @param {number} [fallback] Fallback value
     * @returns {number} Node type
     */
    getNodeType(fallback?: number): number;
    /**
     * Get parent node
     *
     * @example Dom.find("div").getNodeParent() // => PicoDom
     *
     * @param {any} [fallback] Fallback value
     * @returns {PicoDom} Parent instance
     */
    getNodeParent(fallback?: any): PicoDom;
    /**
     * Get previous node
     *
     * @example Dom.find("div").getNodePrev() // => PicoDom
     *
     * @param {any} [fallback] Fallback value
     * @returns {PicoDom} Prev instance
     */
    getNodePrev(fallback?: any): PicoDom;
    /**
     * Get next node
     *
     * @example Dom.find("div").getNodeNext() // => PicoDom
     *
     * @param {any} [fallback] Fallback value
     * @returns {PicoDom} Next instance
     */
    getNodeNext(fallback?: any): PicoDom;
    /**
     * Get child nodes
     *
     * @example Dom.find("div").getNodeChilds(1)
     *
     * @param {number} [type] Node type
     * @param {any} [fallback] Fallback value
     * @returns {Array<Element>} Child nodes
     */
    getNodeChilds(type?: number, fallback?: any): Array<Element>;
    /**
     * Filter instances nodes
     *
     * @example Dom.find("div").sanatize(1)
     *
     * @param {number} [filter] Node type
     * @returns {this} Current instance
     */
    sanatize(filter?: number): this;
    els: any;
    /**
     * Filter elements by selector
     *
     * @example Dom.find("div").filter(".active")
     *
     * @param {any} selector Filter selector
     * @returns {Array<Element>} Filtered nodes
     */
    filter(selector: any): Array<Element>;
    /**
     * Exclude elements by selector
     *
     * @example Dom.find("div").except(".active")
     *
     * @param {any} selector Exclude selector
     * @returns {Array<Element>} Filtered nodes
     */
    except(selector: any): Array<Element>;
    /**
     * Find elements in instance
     *
     * @example Dom.find("div").find(".item")
     *
     * @param {any} selector Search selector
     * @returns {PicoDom} Dom instance
     */
    find(selector: any): PicoDom;
    /**
     * Get element by index
     *
     * @example Dom.find("div").get(0) // => Element
     *
     * @param {number} [index] Node index
     * @returns {any} Found element
     */
    get(index?: number): any;
    /**
     * Get first element
     *
     * @example Dom.find("div").first() // => Element
     *
     * @param {number} [offset] Node offset
     * @returns {any} Found element
     */
    first(offset?: number): any;
    /**
     * Get last element
     *
     * @example Dom.find("div").last() // => Element
     *
     * @param {number} [offset] Node offset
     * @returns {any} Found element
     */
    last(offset?: number): any;
    /**
     * Iterate over elements
     *
     * @example Dom.find("div").each((el) => console.log(el))
     *
     * @param {function} cb Callback fn
     * @returns {this} Current instance
     */
    each(cb: Function): this;
    /**
     * Loop through parent nodes
     *
     * @example Dom.find("div").loopParent((el) => console.log(el))
     *
     * @param {function} cb Callback fn
     * @param {any} [boundry] Loop limit
     * @returns {this} Current instance
     */
    loopParent(cb: Function, boundry?: any): this;
    /**
     * Get parent instance
     *
     * @example Dom.find("div").parent() // => PicoDom
     *
     * @returns {PicoDom} Parent instance
     */
    parent(): PicoDom;
    /**
     * Get first child match
     *
     * @example Dom.find("div").child(".item")
     *
     * @param {any} selector Child selector
     * @param {number} [filter] Node type
     * @returns {PicoDom} Child instance
     */
    child(selector: any, filter?: number): PicoDom;
    /**
     * Get child elements
     *
     * @example Dom.find("div").childs(".item")
     *
     * @param {any} [selector] Child selector
     * @param {number} [filter] Node type
     * @returns {Array<Element>} Child elements
     */
    childs(selector?: any, filter?: number): Array<Element>;
    /**
     * Get closest element
     *
     * @example Dom.find("div").closest(".container")
     *
     * @param {any} selector Target selector
     * @returns {Element} Found element
     */
    closest(selector: any): Element;
    /**
     * Get previous element
     *
     * @example Dom.find("div").prev() // => PicoDom
     *
     * @param {number} [type] Node type
     * @returns {PicoDom} Prev instance
     */
    prev(type?: number): PicoDom;
    /**
     * Get next element
     *
     * @example Dom.find("div").next() // => PicoDom
     *
     * @param {number} [type] Node type
     * @returns {PicoDom} Next instance
     */
    next(type?: number): PicoDom;
    /**
     * Get number of elements
     *
     * @example Dom.find("div").length() // => 1
     *
     * @returns {number} Count value
     */
    length(): number;
    /**
     * Check if element matches
     *
     * @example Dom.find("div").is(".active") // => true
     *
     * @param {any} selector Test selector
     * @returns {boolean} True if matches
     */
    is(selector: any): boolean;
    /**
     * Check if contains match
     *
     * @example Dom.find("div").matches(".active")
     *
     * @param {any} selector Test selector
     * @returns {boolean} True if matches
     */
    matches(selector: any): boolean;
    /**
     * Check if instance is empty
     *
     * @example Dom.find(".none").empty() // => true
     *
     * @returns {boolean} True if empty
     */
    empty(): boolean;
    /**
     * Check if element is visible
     *
     * @example Dom.find("div").visible() // => true
     *
     * @returns {boolean} True if visible
     */
    visible(): boolean;
    /**
     * Check if parent matches
     *
     * @example Dom.find("div").above(".container")
     *
     * @param {any} selector Parent selector
     * @returns {boolean} True if matches
     */
    above(selector: any): boolean;
    /**
     * Check if inside match
     *
     * @example Dom.find("div").inside(".container")
     *
     * @param {any} selector Target selector
     * @returns {boolean} True if inside
     */
    inside(selector: any): boolean;
    /**
     * Check if contains match
     *
     * @example Dom.find("div").contains(".item")
     *
     * @param {any} selector Target selector
     * @returns {boolean} True if contains
     */
    contains(selector: any): boolean;
    /**
     * @see PicoDom.above
     */
    isParent(...args: any[]): boolean;
    /**
     * @see PicoDom.prev
     */
    previous(): PicoDom;
    /**
     * @see PicoDom.filter
     */
    where(...args: any[]): Element[];
    /**
     * @see PicoDom.except
     */
    not(...args: any[]): Element[];
    getNot(): void;
}
export function PicoDomFinderPlugin(self: any): typeof import("#src/utils/Dom.js").PicoDom;
