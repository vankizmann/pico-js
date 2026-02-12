/**
 * @returns {typeof PicoDom}
 */
export function PicoDomBuilder(): typeof PicoDom;
export const PicoDomPlugins: ((self: any) => typeof import("./Dom.js").PicoDom)[];
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
    static init: Array<Function>;
    /**
     * Create new Dom wrapper
     *
     * @example Dom.find("body") // => Dom
     *
     * @param {any} el Element or selector
     * @param {...any} args Plugin args
     * @returns {PicoDom} Dom wrapper
     */
    static find(el: any, ...args: any[]): PicoDom;
    /**
     * Extend Dom with a plugin
     *
     * @example Dom.extend(fn)
     *
     * @param {function} plugin Plugin function
     * @returns {void} No return value
     */
    static extend(plugin: Function): void;
    /**
     * Get window or empty object
     *
     * @example Dom.win().innerWidth // => number|undefined
     *
     * @returns {any} Window or {}
     */
    static win(): any;
    /**
     * Get document or empty object
     *
     * @example Dom.doc().body // => HTMLElement|undefined
     *
     * @returns {any} Document or {}
     */
    static doc(): any;
    /**
     * Get document.body or empty
     *
     * @example Dom.body().nodeType // => 1|undefined
     *
     * @returns {any} Body or {}
     */
    static body(): any;
    /**
     * Create Dom wrapper from input
     *
     * @example new Dom("body").get(0) // => HTMLElement
     *
     * @param {any} el Element or selector
     * @param {...any} args Plugin args
     */
    constructor(el: any, ...args: any[]);
    /**
     * First selected element
     *
     * @type {HTMLElement}
     */
    el: HTMLElement;
    /**
     * All selected elements
     *
     * @type {Array<HTMLElement>}
     */
    els: Array<HTMLElement>;
}
export default PicoDomBuilder;
export type PicoDomFinderInstance = import("#src/dom/DomFinder.js").PicoDomFinderInstance;
export type PicoDomGlobalStatic = import("#src/dom/DomGlobal.js").PicoDomGlobalStatic;
export type PicoDomGlobalInstance = import("#src/dom/DomGlobal.js").PicoDomGlobalInstance;
export type PicoDomEventStatic = import("#src/dom/DomEvent.js").PicoDomEventStatic;
export type PicoDomEventInstance = import("#src/dom/DomEvent.js").PicoDomEventInstance;
export type PicoDomBuilderStatic = import("#src/dom/DomBuilder.js").PicoDomBuilderStatic;
export type PicoDomBuilderInstance = import("#src/dom/DomBuilder.js").PicoDomBuilderInstance;
export type PicoDomRectangleStatic = import("#src/dom/DomRectangle.js").PicoDomRectangleStatic;
export type PicoDomRectangleInstance = import("#src/dom/DomRectangle.js").PicoDomRectangleInstance;
export type PicoDomAttributeStatic = import("#src/dom/DomAttribute.js").PicoDomAttributeStatic;
export type PicoDomAttributeInstance = import("#src/dom/DomAttribute.js").PicoDomAttributeInstance;
export type PicoDomInviewStatic = import("#src/dom/DomInview.js").PicoDomInviewStatic;
export type PicoDomInviewInstance = import("#src/dom/DomInview.js").PicoDomInviewInstance;
export type PicoDomMetaStatic = import("#src/dom/DomMeta.js").PicoDomMetaStatic;
export type PicoDomMetaInstance = import("#src/dom/DomMeta.js").PicoDomMetaInstance;
export type PicoDomObserverStatic = import("#src/dom/DomObserver.js").PicoDomObserverStatic;
export type PicoDomObserverInstance = import("#src/dom/DomObserver.js").PicoDomObserverInstance;
