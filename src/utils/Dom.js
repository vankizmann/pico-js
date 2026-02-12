import { Arr, Mix, Dom } from "#src/index.esm.js";
import { PicoDomFinderPlugin } from "#src/dom/DomFinder.js";
import { PicoDomFormPlugin } from "#src/dom/DomForm.js";
import { PicoDomEventPlugin } from "#src/dom/DomEvent.js";
import { PicoDomBuilderPlugin } from "#src/dom/DomBuilder.js";
import { PicoDomGlobalPlugin } from "#src/dom/DomGlobal.js";
import { PicoDomRectanglePlugin } from "#src/dom/DomRectangle.js";
import { PicoDomAttributePlugin } from "#src/dom/DomAttribute.js";
import { PicoDomInviewPlugin } from "#src/dom/DomInview.js";
import { PicoDomMetaPlugin } from "#src/dom/DomMeta.js";
import { PicoDomObserverPlugin } from "#src/dom/DomObserver.js";

export const PicoDomPlugins = [
    PicoDomFinderPlugin,
    PicoDomGlobalPlugin,
    PicoDomFormPlugin,
    PicoDomEventPlugin,
    PicoDomBuilderPlugin,
    PicoDomRectanglePlugin,
    PicoDomAttributePlugin,
    PicoDomInviewPlugin,
    PicoDomMetaPlugin,
    PicoDomObserverPlugin,
];

/**
 * @class PicoDom
 *
 * @typedef {import('#src/dom/DomFinder.js').PicoDomFinderInstance} PicoDomFinderInstance
 * @typedef {import('#src/dom/DomGlobal.js').PicoDomGlobalStatic} PicoDomGlobalStatic
 * @typedef {import('#src/dom/DomGlobal.js').PicoDomGlobalInstance} PicoDomGlobalInstance
 * @typedef {import('#src/dom/DomEvent.js').PicoDomEventStatic} PicoDomEventStatic
 * @typedef {import('#src/dom/DomEvent.js').PicoDomEventInstance} PicoDomEventInstance
 * @typedef {import('#src/dom/DomBuilder.js').PicoDomBuilderStatic} PicoDomBuilderStatic
 * @typedef {import('#src/dom/DomBuilder.js').PicoDomBuilderInstance} PicoDomBuilderInstance
 * @typedef {import('#src/dom/DomRectangle.js').PicoDomRectangleStatic} PicoDomRectangleStatic
 * @typedef {import('#src/dom/DomRectangle.js').PicoDomRectangleInstance} PicoDomRectangleInstance
 * @typedef {import('#src/dom/DomAttribute.js').PicoDomAttributeStatic} PicoDomAttributeStatic
 * @typedef {import('#src/dom/DomAttribute.js').PicoDomAttributeInstance} PicoDomAttributeInstance
 * @typedef {import('#src/dom/DomInview.js').PicoDomInviewStatic} PicoDomInviewStatic
 * @typedef {import('#src/dom/DomInview.js').PicoDomInviewInstance} PicoDomInviewInstance
 * @typedef {import('#src/dom/DomMeta.js').PicoDomMetaStatic} PicoDomMetaStatic
 * @typedef {import('#src/dom/DomMeta.js').PicoDomMetaInstance} PicoDomMetaInstance
 * @typedef {import('#src/dom/DomObserver.js').PicoDomObserverStatic} PicoDomObserverStatic
 * @typedef {import('#src/dom/DomObserver.js').PicoDomObserverInstance} PicoDomObserverInstance
 *
 * @mixes PicoDomFinderStatic
 * @mixes PicoDomGlobalStatic
 * @mixes PicoDomFormStatic
 * @mixes PicoDomEventStatic
 * @mixes PicoDomBuilderStatic
 * @mixes PicoDomRectangleStatic
 * @mixes PicoDomAttributeStatic
 * @mixes PicoDomInviewStatic
 * @mixes PicoDomMetaStatic
 * @mixes PicoDomObserverStatic
 *
 * @extends PicoDomFinderInstance
 * @extends PicoDomGlobalInstance
 * @extends PicoDomFormInstance
 * @extends PicoDomEventInstance
 * @extends PicoDomBuilderInstance
 * @extends PicoDomRectangleInstance
 * @extends PicoDomAttributeInstance
 * @extends PicoDomInviewInstance
 * @extends PicoDomMetaInstance
 * @extends PicoDomObserverInstance
 */
export class PicoDom {

    /**
     * Init hooks for constructor
     *
     * @type {Array<function>}
     */
    static init = [];

    /**
     * First selected element
     *
     * @type {HTMLElement}
     */
    el = null;

    /**
     * All selected elements
     *
     * @type {Array<HTMLElement>}
     */
    els = [];

    /**
     * Create Dom wrapper from input
     *
     * @example new Dom("body").get(0) // => HTMLElement
     *
     * @param {any} el Element or selector
     * @param {...any} args Plugin args
     */
    constructor(el, ...args)
    {
        Arr.each(Dom.init, (fn) => {
            el = fn.call(this, el, ...args);
        });

        if ( el instanceof Dom ) {
            el = el.el;
        }

        if ( ! Mix.isArr(el) ) {
            el = [el];
        }

        (this.el = el[0], this.els = el);
    }

    /**
     * Create new Dom wrapper
     *
     * @example Dom.find("body") // => Dom
     *
     * @param {any} el Element or selector
     * @param {...any} args Plugin args
     * @returns {PicoDom} Dom wrapper
     */
    static find(el, ...args)
    {
        return new Dom(el, ...args);
    }

    /**
     * Extend Dom with a plugin
     *
     * @example Dom.extend(fn)
     *
     * @param {function} plugin Plugin function
     * @returns {void} No return value
     */
    static extend(plugin)
    {
        plugin.call({}, this);
    }

    /**
     * Get window or empty object
     *
     * @example Dom.win().innerWidth // => number|undefined
     *
     * @returns {any} Window or {}
     */
    static win()
    {
        if ( globalThis.window == null ) {
            return {};
        }

        return window;
    }

    /**
     * Get document or empty object
     *
     * @example Dom.doc().body // => HTMLElement|undefined
     *
     * @returns {any} Document or {}
     */
    static doc()
    {
        if ( globalThis.document == null ) {
            return {};
        }

        return document;
    }

    /**
     * Get document.body or empty
     *
     * @example Dom.body().nodeType // => 1|undefined
     *
     * @returns {any} Body or {}
     */
    static body()
    {
        if ( ! this.doc().body ) {
            return {};
        }

        return this.doc().body;
    }

}

/**
 * @returns {typeof PicoDom}
 */
export function PicoDomBuilder() {

    let cls = PicoDom;

    for ( const plugin of PicoDomPlugins ) {
        cls = plugin.call(cls, cls);
    }

    return cls;
}

export default PicoDomBuilder;