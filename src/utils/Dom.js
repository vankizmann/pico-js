import { Arr, Mix, Dom } from "#src/index.esm.js";
import { PicoDomFinderStatic, PicoDomFinderInstance, PicoDomFinderPlugin } from "#src/dom/DomFinder.js";
import { PicoDomFormStatic, PicoDomFormInstance, PicoDomFormPlugin } from "#src/dom/DomForm.js";
import { PicoDomEventStatic, PicoDomEventInstance, PicoDomEventPlugin } from "#src/dom/DomEvent.js";
import { PicoDomBuilderStatic, PicoDomBuilderInstance, PicoDomBuilderPlugin } from "#src/dom/DomBuilder.js";
import { PicoDomGlobalStatic, PicoDomGlobalInstance, PicoDomGlobalPlugin } from "#src/dom/DomGlobal.js";
import { PicoDomRectangleStatic, PicoDomRectangleInstance, PicoDomRectanglePlugin } from "#src/dom/DomRectangle.js";
import { PicoDomAttributeStatic, PicoDomAttributeInstance, PicoDomAttributePlugin } from "#src/dom/DomAttribute.js";
import { PicoDomInviewStatic, PicoDomInviewInstance, PicoDomInviewPlugin } from "#src/dom/DomInview.js";
import { PicoDomMetaStatic, PicoDomMetaInstance, PicoDomMetaPlugin } from "#src/dom/DomMeta.js";
import { PicoDomObserverStatic, PicoDomObserverInstance, PicoDomObserverPlugin } from "#src/dom/DomObserver.js";

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
 * @mixes PicoDomFinderStatic
 * @extends PicoDomFinderInstance
 * @mixes PicoDomGlobalStatic
 * @extends PicoDomGlobalInstance
 * @mixes PicoDomFormStatic
 * @extends PicoDomFormInstance
 * @mixes PicoDomEventStatic
 * @extends PicoDomEventInstance
 * @mixes PicoDomBuilderStatic
 * @extends PicoDomBuilderInstance
 * @mixes PicoDomRectangleStatic
 * @extends PicoDomRectangleInstance
 * @mixes PicoDomAttributeStatic
 * @extends PicoDomAttributeInstance
 * @mixes PicoDomInviewStatic
 * @extends PicoDomInviewInstance
 * @mixes PicoDomMetaStatic
 * @extends PicoDomMetaInstance
 * @mixes PicoDomObserverStatic
 * @extends PicoDomObserverInstance
 */
export class PicoDom {

    /**
     * @type {Array<function>}
     */
    static init = [];

    /**
     * @type {HTMLElement}
     */
    el = null;

    /**
     * @type {Array<HTMLElement>}
     */
    els = [];

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

    static find(el, ...args)
    {
        return new Dom(el, ...args);
    }

    static extend(plugin)
    {
        plugin.call({}, this);
    }

    static win()
    {
        if ( globalThis.window == null ) {
            return {};
        }

        return window;
    }

    static doc()
    {
        if ( globalThis.document == null ) {
            return {};
        }

        return document;
    }

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