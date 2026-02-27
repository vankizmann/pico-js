import { Arr, Mix, Dom } from "../index.esm.ts";
import { PicoDomInterface, PicoDom } from "../utils/Dom.ts";

export interface PicoDomFinder extends PicoDomInterface
{
    //
}

/**
 * @memberof PicoDom
 */
export class PicoDomFinder
{
    /**
     * Filter nodes by type
     *
     * @example Dom.filterNodes(nodes, 1)
     *
     * @param {any} nodes Source nodes
     * @param {number} [filter] Node type
     * @returns {Array<any>} Filtered nodes
     */
    static filterNodes(nodes : any, filter : number = 1) : Array<any>
    {
        return Arr.filter(Mix.nodes(nodes), (el : any) => {
            return el.nodeType === filter;
        });
    }

    /**
     * Get nodes at point
     *
     * @example Dom.getNodePoint(100, 100)
     *
     * @param {any} event Event data
     * @returns {Array<any>} Nodes at point
     */
    static getNodePoint(event : any) : Array<any>
    {
        if ( event.touches?.[0] ) {
            event = event.touches[0];
        }

        let [el, src] = [
            null, [event.clientX, event.clientY]
        ];

        if ( Dom.doc().elementsFromPoint != null ) {
            el = document.elementsFromPoint(src[0], src[1]);
        }

        if ( Dom.doc().msElementsFromPoint != null ) {
            // @ts-ignore
            el = document.msElementsFromPoint(src[0], src[1]);
        }

        return el;
    }

    /**
     * Get target by selector
     *
     * @example Dom.getNodeEvent(".item", event)
     *
     * @param {string} selector Node selector
     * @param {any} [event] Event object
     * @returns {any} Found element
     */
    static getNodeEvent(selector : string, event : any = {}) : any
    {
        let target = event.srcElement;

        if ( target == null ) {
            target = event.target;
        }

        let { type } = event;

        if ( /^(drag[a-z]*|drop$)/.test(type) ) {
            target = Dom.getNodePoint(event);
        }

        if ( Mix.isArr(target) ) {
            target = Arr.first(target);
        }

        if ( target == null ) {
            target = event.target;
        }

        return target.closest(selector);
    }

    /**
     * Get node type
     *
     * @example Dom.find("div").getNodeType() // => 1
     *
     * @param {number} [fallback] Fallback value
     * @returns {number} Node type
     */
    getNodeType(fallback : number = -1) : number
    {
        if ( !this.el ) {
            return fallback;
        }

        return this.el.nodeType;
    }

    /**
     * Get parent node
     *
     * @example Dom.find("div").getNodeParent() // => PicoDom
     *
     * @param {any} [fallback] Fallback value
     * @returns {PicoDom} Parent instance
     */
    getNodeParent(fallback : any = null) : PicoDom
    {
        if ( !this.el ) {
            return fallback;
        }

        return Dom.find(this.el.parentNode);
    }

    /**
     * Get previous node
     *
     * @example Dom.find("div").getNodePrev() // => PicoDom
     *
     * @param {any} [fallback] Fallback value
     * @returns {PicoDom} Prev instance
     */
    getNodePrev(fallback : any = null) : PicoDom
    {
        if ( !this.el ) {
            return fallback;
        }

        return Dom.find(this.el.previousSibling);
    }

    /**
     * Get next node
     *
     * @example Dom.find("div").getNodeNext() // => PicoDom
     *
     * @param {any} [fallback] Fallback value
     * @returns {PicoDom} Next instance
     */
    getNodeNext(fallback : any = null) : PicoDom
    {
        if ( !this.el ) {
            return fallback;
        }

        return Dom.find(this.el.nextSibling);
    }

    /**
     * Get child nodes
     *
     * @example Dom.find("div").getNodeChilds(1)
     *
     * @param {number} [type] Node type
     * @param {any} [fallback] Fallback value
     * @returns {Array<any>} Child nodes
     */
    getNodeChilds(type : number = -1, fallback : any = []) : Array<any>
    {
        if ( !this.el ) {
            return fallback;
        }

        let childs = Mix.nodes(this.el.childNodes);

        if ( type === -1 ) {
            return childs;
        }

        return Arr.filter(childs, (el : any) => {
            return el.nodeType === type;
        });
    }

    /**
     * Filter instances nodes
     *
     * @example Dom.find("div").sanatize(1)
     *
     * @param {number} [filter] Node type
     * @returns {PicoDom} Current instance
     */
    sanatize(filter : number = 1) : PicoDom
    {
        this.els = Dom.filterNodes(this.els, filter);

        return <PicoDom> <unknown> this;
    }

    /**
     * Filter elements by selector
     *
     * @example Dom.find("div").filter(".active")
     *
     * @param {any} selector Filter selector
     * @returns {Array<any>} Filtered nodes
     */
    filter(selector : any) : Array<any>
    {
        if ( typeof selector !== 'function' ) {
            selector = (el : any) => Dom.find(el).is(selector);
        }

        return Arr.filter(this.els, selector);
    }

    /**
     * Exclude elements by selector
     *
     * @example Dom.find("div").except(".active")
     *
     * @param {any} selector Exclude selector
     * @returns {Array<any>} Filtered nodes
     */
    except(selector : any) : Array<any>
    {
        if ( typeof selector !== 'function' ) {
            selector = (el : any) => !Dom.find(el).is(selector);
        }

        return Arr.filter(this.els, selector);
    }

    /**
     * Find elements in instance
     *
     * @example Dom.find("div").find(".item")
     *
     * @param {any} selector Search selector
     * @returns {PicoDom} Dom instance
     */
    find(selector : any) : PicoDom
    {
        if ( this.el == null ) {
            return Dom.find(null);
        }

        let el = this.el;

        if ( el instanceof Window ) {
            el = document.body;
        }

        let nodes = selector;

        if ( Mix.isStr(nodes) ) {
            nodes = el.querySelectorAll(selector);
        }

        return Dom.find(nodes);
    }

    /**
     * Get element by index
     *
     * @example Dom.find("div").get(0) // => HTMLElement
     *
     * @param {number} [index] Node index
     * @returns {any} Found element
     */
    get(index : number = -1) : any
    {
        let nodes = this.els;

        if ( index === -1 ) {
            return nodes;
        }

        return Arr.get(nodes, index);
    }

    /**
     * Get first element
     *
     * @example Dom.find("div").first() // => HTMLElement
     *
     * @param {number} [offset] Node offset
     * @returns {any} Found element
     */
    first(offset : number = 0) : any
    {
        return this.get(offset);
    }

    /**
     * Get last element
     *
     * @example Dom.find("div").last() // => HTMLElement
     *
     * @param {number} [offset] Node offset
     * @returns {any} Found element
     */
    last(offset : number = 1) : any
    {
        return Arr.get(this.els, this.els.length - offset);
    }

    /**
     * Iterate over elements
     *
     * @example Dom.find("div").each((el) => console.log(el))
     *
     * @param {Function} cb Callback fn
     * @returns {PicoDom} Current instance
     */
    each(cb : Function) : PicoDom
    {
        return (this, Arr.each(this.els, cb));
    }

    /**
     * Loop through parent nodes
     *
     * @example Dom.find("div").loopParent((el) => console.log(el))
     *
     * @param {Function} cb Callback fn
     * @param {any} [boundry] Loop limit
     * @returns {PicoDom} Current instance
     */
    loopParent(cb : Function, boundry : any = null) : PicoDom
    {
        if ( boundry == null ) {
            boundry = Dom.win();
        }

        for ( let el : any = this.el; el && el !== boundry; el = el.parentNode ) {
            cb.call({}, el);
        }

        return <PicoDom> <unknown> this;
    }

    /**
     * Get parent instance
     *
     * @example Dom.find("div").parent() // => PicoDom
     *
     * @returns {PicoDom} Parent instance
     */
    parent() : PicoDom
    {
        let parent = this.getNodeParent();

        if ( parent == null ) {
            return Dom.find(null);
        }

        return parent;
    }

    /**
     * Get first child match
     *
     * @example Dom.find("div").child(".item")
     *
     * @param {any} selector Child selector
     * @param {number} [filter] Node type
     * @returns {PicoDom} Child instance
     */
    child(selector : any = null, filter : number = 1) : PicoDom
    {
        for ( let el of this.childs(selector, filter) ) {
            return Dom.find(el);
        }

        return Dom.find(null);
    }

    /**
     * Get child elements
     *
     * @example Dom.find("div").childs(".item")
     *
     * @param {any} [selector] Child selector
     * @param {number} [filter] Node type
     * @returns {Array<any>} Child elements
     */
    childs(selector : any = null, filter : number = 1) : Array<any>
    {
        let childs = this.getNodeChilds(filter);

        if ( selector == null ) {
            return childs;
        }

        return Arr.filter(childs, (el) => {
            return Dom.find(el).is(selector);
        });
    }

    /**
     * Get closest element
     *
     * @example Dom.find("div").closest(".container")
     *
     * @param {any} selector Target selector
     * @returns {any} Found element
     */
    closest(selector : any) : any
    {
        if ( this.el === selector ) {
            return this.el;
        }

        for ( let el : any = this; el.el != null; el = el.getNodeParent() ) {
            if ( el.is(selector) ) return el.el;
        }

        return null;
    }

    /**
     * Get closest instance
     *
     * @example Dom.find("div").upnode(".container")
     *
     * @param {any} selector
     * @returns {PicoDom}
     */
    upnode(selector : any) : PicoDom
    {
        return Dom.find(...[
            this.closest(selector)
        ]);
    }

    /**
     * Get previous element
     *
     * @example Dom.find("div").prev() // => PicoDom
     *
     * @param {number} [type] Node type
     * @returns {PicoDom} Prev instance
     */
    prev(type : number = 1) : PicoDom
    {
        let el = this.getNodePrev();

        for ( el; el != null; el = el.getNodePrev() ) {
            if ( el.getNodeType() === type ) return Dom.find(el);
        }

        return Dom.find(null);
    }

    /**
     * Get next element
     *
     * @example Dom.find("div").next() // => PicoDom
     *
     * @param {number} [type] Node type
     * @returns {PicoDom} Next instance
     */
    next(type : number = 1) : PicoDom
    {
        let el = this.getNodeNext();

        for ( el; el != null; el = el.getNodeNext() ) {
            if ( el.getNodeType() === type ) return Dom.find(el);
        }

        return Dom.find(null);
    }

    /**
     * Get number of elements
     *
     * @example Dom.find("div").length() // => 1
     *
     * @returns {number} Count value
     */
    length() : number
    {
        return this.els.length;
    }

    /**
     * Check if element matches
     *
     * @example Dom.find("div").is(".active") // => true
     *
     * @param {any} selector Test selector
     * @param {boolean} [empty] Test selector
     * @returns {boolean} True if matches
     */
    is(selector : any, empty : boolean = false) : boolean
    {
        if ( this.el === selector ) {
            return true;
        }

        if ( this.el == null ) {
            return empty;
        }

        for ( let el of this.parent().find(selector).get() ) {
            if ( el === this.el ) return true;
        }

        return false;
    }

    /**
     * Check if contains match
     *
     * @example Dom.find("div").matches(".active")
     *
     * @param {any} selector Test selector
     * @returns {boolean} True if matches
     */
    matches(selector : any) : boolean
    {
        if ( this.el === selector ) {
            return true;
        }

        if ( this.el == null ) {
            return false;
        }

        for ( let el of this.find(selector).get() ) {
            if ( el === this.el ) return true;
        }

        return false;
    }

    /**
     * Check if instance is empty
     *
     * @example Dom.find(".none").empty() // => true
     *
     * @returns {boolean} True if empty
     */
    empty() : boolean
    {
        return this.length() < 1 || this.el == null;
    }

    /**
     * Check if element is visible
     *
     * @example Dom.find("div").visible() // => true
     *
     * @returns {boolean} True if visible
     */
    visible() : boolean
    {
        if ( this.el == null ) {
            return false;
        }

        return this.el.is(':visible');
    }

    /**
     * Check if parent matches
     *
     * @example Dom.find("div").above(".container")
     *
     * @param {any} selector Parent selector
     * @returns {boolean} True if matches
     */
    above(selector : any) : boolean
    {
        // Parent is exacly selector
        return this.parent().is(selector);
    }

    /**
     * Check if inside match
     *
     * @example Dom.find("div").inside(".container")
     *
     * @param {any} selector Target selector
     * @returns {boolean} True if inside
     */
    inside(selector : any) : boolean
    {
        // Has parent of selector
        return this.closest(selector) != null;
    }

    /**
     * Check if contains match
     *
     * @example Dom.find("div").contains(".item")
     *
     * @param {any} selector Target selector
     * @returns {boolean} True if contains
     */
    contains(selector : any) : boolean
    {
        // Has child of selector
        return this.el.contains(selector);
    }

}

/**
 * @deprecated use Dom.above instead
 */
// @ts-ignore
PicoDomFinder.prototype.isParent = function(...args : Parameters<typeof PicoDomFinder.prototype.above>) : any {
    console.warn('Dom.isParent() is deprecated, use Dom.above() instead.');
    return this.above(...args);
};

/**
 * @deprecated use Dom.prev instead
 */
// @ts-ignore
PicoDomFinder.prototype.previous = function() : any {
    console.warn('Dom.previous() is deprecated, use Dom.prev() instead.');
    return this.prev();
};

/**
 * @deprecated use Dom.filter instead
 */
// @ts-ignore
PicoDomFinder.prototype.where = function(...args : Parameters<typeof PicoDomFinder.prototype.filter>) : any {
    console.warn('Dom.where() is deprecated, use Dom.filter() instead.');
    return this.filter(...args);
};

/**
 * @deprecated use Dom.except instead
 */
// @ts-ignore
PicoDomFinder.prototype.not = function(...args : Parameters<typeof PicoDomFinder.prototype.except>) : any {
    console.warn('Dom.not() is deprecated, use Dom.except() instead.');
    return this.except(...args);
};

/**
 * @deprecated not implemented anymore
 */
// @ts-ignore
PicoDomFinder.prototype.getNot = function() : void {
    console.error('Dom.getNot() is not implemented anymore.');
};

export default PicoDomFinder;