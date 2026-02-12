import { Arr, Mix, Obj, Dom } from "#src/index.esm.js";

/**
 * @memberof PicoDom
 */
export class PicoDomFinderStatic
{

    static filterNodes(nodes, filter = 1)
    {
        return Arr.filter(Mix.nodes(nodes), (el) => {
            return el.nodeType === filter;
        });
    }

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
    static constructor(el)
    {
        if ( typeof el === 'string' ) {
            el = document.querySelectorAll(el);
        }

        if ( el instanceof NodeList ) {
            el = Mix.nodes(el);
        }

        return el;
    }

    getNodeType(fallback = -1)
    {
        if ( ! this.el ) {
            return fallback;
        }

        return this.el.nodeType;
    }

    getNodeParent(fallback = null)
    {
        if ( ! this.el ) {
            return fallback;
        }

        return Dom.find(this.el.parentNode);
    }

    getNodePrev(fallback = null)
    {
        if ( ! this.el ) {
            return fallback;
        }

        return Dom.find(this.el.previousSibling);
    }

    getNodeNext(fallback = null)
    {
        if ( ! this.el ) {
            return fallback;
        }

        return Dom.find(this.el.nextSibling);
    }

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

    sanatize(filter = 1)
    {
        this.els = Dom.filterNodes(this.els, filter);

        return this;
    }

    filter(selector)
    {
        if ( typeof selector !== 'function' ) {
            selector = (el) => Dom.find(el).is(selector);
        }

        return Arr.filter(this.els, selector);
    }

    except(selector)
    {
        if ( typeof selector !== 'function' ) {
            selector = (el) => ! Dom.find(el).is(selector);
        }

        return Arr.filter(this.els, selector);
    }

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

    get(index = - 1)
    {
        let nodes = this.els;

        if ( index === - 1 ) {
            return nodes;
        }

        return Arr.get(nodes, index);
    }

    first(offset = 0)
    {
        return this.get(offset);
    }

    last(offset = 1)
    {
        return Arr.get(this.els, this.els.length - offset);
    }

    each(cb)
    {
        return (this, Arr.each(this.els, cb));
    }

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

    parent()
    {
        let parent = this.getNodeParent();

        if ( parent == null ) {
            return Dom.find(null);
        }

        return parent;
    }

    child(selector, filter = 1)
    {
        for ( let el of this.els ) {
            if ( el.nodeType === filter ) {
                return Dom.find(el);
            }
        }

        return Dom.find(null);
    }

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

    prev(type = 1)
    {
        let el = this.getNodePrev();

        for ( el; el != null; el = el.getNodePrev() ) {
            if ( el.getNodeType() === type ) return Dom.find(el);
        }

        return Dom.find(null);
    }

    next(type = 1)
    {
        let el = this.getNodeNext();

        for ( el; el != null; el = el.getNodeNext() ) {
            if ( el.getNodeType() === type ) return Dom.find(el);
        }

        return Dom.find(null);
    }

    length()
    {
        return this.els.length;
    }

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

    empty()
    {
        return this.length() < 1 || this.el == null;
    }

    visible()
    {
        if ( this.el == null ) {
            return false;
        }

        return this.el.is(':visible');
    }

    above(selector)
    {
        // Parent is exacly selector
        return this.parent().is(selector);
    }

    inside(selector)
    {
        // Has parent of selector
        return this.closest(selector) != null;
    }

    contains(selector)
    {
        // Has child of selector
        return this.find(selector) != null;
    }

}

PicoDomFinderInstance.prototype.getNot = () => {
    console.error('Dom.getNot() is not implemented anymore.');
};

PicoDomFinderInstance.prototype.isParent = function (...args) {
    console.warn('Dom.isParent() is deprecated, use Dom.above() instead.');
    return this.above(...args);
};

PicoDomFinderInstance.prototype.previous = function () {
    console.warn('Dom.previous() is deprecated, use Dom.prev() instead.');
    return this.prev();
};

PicoDomFinderInstance.prototype.where = function (...args) {
    console.warn('Dom.where() is deprecated, use Dom.filter() instead.');
    return this.filter(...args);
};

PicoDomFinderInstance.prototype.not = function (...args) {
    console.warn('Dom.not() is deprecated, use Dom.except() instead.');
    return this.except(...args);
};

export const PicoDomFinderPlugin = function (self) {

    Obj.each(Mix.class(PicoDomFinderStatic), (fn, id) => {
        self[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomFinderInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    self.init.push(PicoDomFinderInstance.constructor);

    return self;
}