import { Arr, Mix, Obj, Dom } from "../index.esm.js";
import { PicoDom } from "../utils/Dom.js";

/**
 * @memberof PicoDom
 */
export class PicoDomFinderStatic
{

    /**
     * Filter nodes by type
     *
     * @example Dom.filterNodes(nodes, 1)
     *
     * @param {any} nodes Source nodes
     * @param {number} [filter] Node type
     * @returns {Array<Element>} Filtered nodes
     */
    static filterNodes(nodes, filter = 1)
    {
        return Arr.filter(Mix.nodes(nodes), (el) => {
            return el.nodeType === filter;
        });
    }

    /**
     * Get nodes at point
     *
     * @example Dom.getNodePoint(100, 100)
     *
     * @param {number} posx X position
     * @param {number} posy Y position
     * @returns {Array<Element>} Nodes at point
     */
    static getNodePoint(posx, posy)
    {
        let el = null;

        if ( Dom.doc().elementsFromPoint != null ) {
            el = document.elementsFromPoint(posx, posy);
        }

        if ( Dom.doc().msElementsFromPoint != null ) {
            el = document.msElementsFromPoint(posx, posy);
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
     * @returns {Element} Found element
     */
    static getNodeEvent(selector, event = {})
    {
        let target = event.srcElement;

        if ( target == null ) {
            target = event.target;
        }

        let { type, clientX, clientY } = event;

        if ( /^(drag[a-z]*|drop$)/.test(type) ) {
            target = Dom.getNodePoint(clientX, clientY);
        }

        if ( Mix.isArr(target) ) {
            target = Arr.first(target);
        }

        if ( target == null ) {
            target = event.target;
        }

        return target.closest(selector);
    }

}

/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomFinderInstance
{
    /**
     * Resolve input elements
     *
     * @example Dom._constructFinder(".item")
     *
     * @param {any} el Input value
     * @returns {any} Resolved elements
     */
    static _constructFinder(el)
    {
        if ( typeof el === 'string' ) {
            el = document.querySelectorAll(el);
        }

        if ( el instanceof NodeList ) {
            el = Mix.nodes(el);
        }

        return el;
    }

    /**
     * Get node type
     *
     * @example Dom.find("div").getNodeType() // => 1
     *
     * @param {number} [fallback] Fallback value
     * @returns {number} Node type
     */
    getNodeType(fallback = -1)
    {
        if ( ! this.el ) {
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
    getNodeParent(fallback = null)
    {
        if ( ! this.el ) {
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
    getNodePrev(fallback = null)
    {
        if ( ! this.el ) {
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
    getNodeNext(fallback = null)
    {
        if ( ! this.el ) {
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
     * @returns {Array<Element>} Child nodes
     */
    getNodeChilds(type = -1, fallback = [])
    {
        if ( ! this.el ) {
            return fallback;
        }

        let childs = Mix.nodes(this.el.childNodes);

        if ( type === -1 ) {
            return childs;
        }

        return Arr.filter(childs, (el) => {
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
    sanatize(filter = 1)
    {
        this.els = Dom.filterNodes(this.els, filter);

        return this;
    }

    /**
     * Filter elements by selector
     *
     * @example Dom.find("div").filter(".active")
     *
     * @param {any} selector Filter selector
     * @returns {Array<Element>} Filtered nodes
     */
    filter(selector)
    {
        if ( typeof selector !== 'function' ) {
            selector = (el) => Dom.find(el).is(selector);
        }

        return Arr.filter(this.els, selector);
    }

    /**
     * Exclude elements by selector
     *
     * @example Dom.find("div").except(".active")
     *
     * @param {any} selector Exclude selector
     * @returns {Array<Element>} Filtered nodes
     */
    except(selector)
    {
        if ( typeof selector !== 'function' ) {
            selector = (el) => ! Dom.find(el).is(selector);
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
    find(selector)
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
     * @example Dom.find("div").get(0) // => Element
     *
     * @param {number} [index] Node index
     * @returns {any} Found element
     */
    get(index = - 1)
    {
        let nodes = this.els;

        if ( index === - 1 ) {
            return nodes;
        }

        return Arr.get(nodes, index);
    }

    /**
     * Get first element
     *
     * @example Dom.find("div").first() // => Element
     *
     * @param {number} [offset] Node offset
     * @returns {any} Found element
     */
    first(offset = 0)
    {
        return this.get(offset);
    }

    /**
     * Get last element
     *
     * @example Dom.find("div").last() // => Element
     *
     * @param {number} [offset] Node offset
     * @returns {any} Found element
     */
    last(offset = 1)
    {
        return Arr.get(this.els, this.els.length - offset);
    }

    /**
     * Iterate over elements
     *
     * @example Dom.find("div").each((el) => console.log(el))
     *
     * @param {function} cb Callback fn
     * @returns {PicoDom} Current instance
     */
    each(cb)
    {
        return (this, Arr.each(this.els, cb));
    }

    /**
     * Loop through parent nodes
     *
     * @example Dom.find("div").loopParent((el) => console.log(el))
     *
     * @param {function} cb Callback fn
     * @param {any} [boundry] Loop limit
     * @returns {PicoDom} Current instance
     */
    loopParent(cb, boundry = null)
    {
        if ( boundry == null ) {
            boundry = Dom.win();
        }

        for ( let el = this.el; el && el !== boundry; el = el.parentNode ) {
            cb.call({}, el);
        }

        return this;
    }

    /**
     * Get parent instance
     *
     * @example Dom.find("div").parent() // => PicoDom
     *
     * @returns {PicoDom} Parent instance
     */
    parent()
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
    child(selector, filter = 1)
    {
        for ( let el of this.els ) {
            if ( el.nodeType === filter ) {
                return Dom.find(el);
            }
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
     * @returns {Array<Element>} Child elements
     */
    childs(selector = null, filter = 1)
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
     * @returns {Element} Found element
     */
    closest(selector)
    {
        if ( this.el === selector ) {
            return this.el;
        }

        for ( let el = this; el.el != null; el = el.getNodeParent() ) {
            if ( el.is(selector) ) return el.el;
        }

        return null;
    }

    upnode(selector)
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
    prev(type = 1)
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
    next(type = 1)
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
    length()
    {
        return this.els.length;
    }

    /**
     * Check if element matches
     *
     * @example Dom.find("div").is(".active") // => true
     *
     * @param {any} selector Test selector
     * @returns {boolean} True if matches
     */
    is(selector)
    {
        if ( this.el === selector ) {
            return true;
        }

        if ( this.el == null ) {
            return false;
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
    matches(selector)
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
    empty()
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
    visible()
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
    above(selector)
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
    inside(selector)
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
    contains(selector)
    {
        // Has child of selector
        return this.el.contains(selector);
    }

}

/**
 * @see PicoDom.above
 */
PicoDomFinderInstance.prototype.isParent = function (...args) {
    console.warn('Dom.isParent() is deprecated, use Dom.above() instead.');
    return this.above(...args);
};

/**
 * @see PicoDom.prev
 */
PicoDomFinderInstance.prototype.previous = function () {
    console.warn('Dom.previous() is deprecated, use Dom.prev() instead.');
    return this.prev();
};

/**
 * @see PicoDom.filter
 */
PicoDomFinderInstance.prototype.where = function (...args) {
    console.warn('Dom.where() is deprecated, use Dom.filter() instead.');
    return this.filter(...args);
};

/**
 * @see PicoDom.except
 */
PicoDomFinderInstance.prototype.not = function (...args) {
    console.warn('Dom.not() is deprecated, use Dom.except() instead.');
    return this.except(...args);
};

PicoDomFinderInstance.prototype.getNot = () => {
    console.error('Dom.getNot() is not implemented anymore.');
};

/**
 * @param {typeof PicoDom} self
 * @returns {typeof PicoDom}
 */
export const PicoDomFinderPlugin = function (self) {

    Obj.each(Mix.class(PicoDomFinderStatic), (fn, id) => {
        self[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomFinderInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    self.init.push(PicoDomFinderInstance._constructFinder);

    return self;
}