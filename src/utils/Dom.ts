import { trait } from "../tool/scope.ts";
import { Mix, Dom, Arr } from "../index.esm.ts";
import { PicoDomFinder } from "../dom/DomFinder.ts";
import { PicoDomForm } from "../dom/DomForm.ts";
import { PicoDomEvent } from "../dom/DomEvent.ts";
import { PicoDomBuilder } from "../dom/DomBuilder.ts";
import { PicoDomGlobal } from "../dom/DomGlobal.ts";
import { PicoDomRectangle } from "../dom/DomRectangle.ts";
import { PicoDomAttribute } from "../dom/DomAttribute.ts";
import { PicoDomInview } from "../dom/DomInview.ts";
import { PicoDomMeta } from "../dom/DomMeta.ts";
import { PicoDomObserver } from "../dom/DomObserver.ts";
import { PicoDomPopover } from "../dom/DomPopover.ts";

export const PicoDomPlugins = [
    PicoDomFinder,
    PicoDomGlobal,
    PicoDomForm,
    PicoDomEvent,
    PicoDomBuilder,
    PicoDomRectangle,
    PicoDomAttribute,
    PicoDomInview,
    PicoDomMeta,
    PicoDomObserver,
    PicoDomPopover,
];

export interface PicoDomInterface
{
    el: any;
    els: any[];
    extend(plugin : Function) : void;
    win() : any;
    doc() : any;
    body() : any;
}

export interface PicoDom extends
    PicoDomFinder,
    PicoDomGlobal,
    PicoDomForm,
    PicoDomEvent,
    PicoDomBuilder,
    PicoDomRectangle,
    PicoDomAttribute,
    PicoDomInview,
    PicoDomMeta,
    PicoDomObserver,
    PicoDomPopover
{
    //
}

/**
 * @class PicoDom
 *
 * @mixes PicoDomFinder
 * @mixes PicoDomGlobal
 * @mixes PicoDomForm
 * @mixes PicoDomEvent
 * @mixes PicoDomBuilder
 * @mixes PicoDomRectangle
 * @mixes PicoDomAttribute
 * @mixes PicoDomInview
 * @mixes PicoDomMeta
 * @mixes PicoDomObserver
 * @mixes PicoDomPopover
 */
export class PicoDom extends trait(PicoDomPlugins)
{

    /**
     * Init hooks for constructor
     *
     * @type {Function[]}
     */
    static init : Function[] = [];

    /**
     * First selected element
     *
     * @type {any}
     */
    el : any = null;

    /**
     * All selected elements
     *
     * @type {any[]}
     */
    els : any[] = [];

    /**
     * Create Dom wrapper from input
     *
     * @example new Dom("body").get(0) // => HTMLElement
     *
     * @param {any} el Element or selector
     * @param {[...any]} args Plugin args
     */
    constructor(el : any, ...args : [...any])
    {
        super(el, ...args);

        if ( typeof el === 'string' ) {
            el = document.querySelectorAll(el);
        }

        if ( el instanceof NodeList ) {
            el = Mix.nodes(el);
        }

        if ( el instanceof Dom ) {
            el = el.el;
        }

        if ( !Mix.isArr(el) ) {
            el = [el];
        }

        (this.el = el[0], this.els = el);

        return this;
    }

    /**
     * Create new Dom wrapper
     *
     * @example Dom.find("body") // => Dom
     *
     * @param {any} el Element or selector
     * @param {[...any]} args Plugin args
     * @returns {PicoDom} Dom wrapper
     */
    static find(el : any, ...args : [...any]) : PicoDom
    {
        return new Dom(el, ...args);
    }

    /**
     * Extend Dom with a plugin
     *
     * @example Dom.extend(fn)
     *
     * @param {Function} plugin Plugin function
     * @returns {void} No return value
     */
    static extend(plugin : Function) : void
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
    static win() : any
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
    static doc() : any
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
    static body() : any
    {
        if ( !this.doc().body ) {
            return {};
        }

        return this.doc().body;
    }

}

export default PicoDom;