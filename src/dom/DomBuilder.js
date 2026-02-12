import { Arr, Dom, Mix, Obj } from "../index.esm.js";
import { PicoDom } from "../utils/Dom.js";

/**
 * @memberof PicoDom
 */
export class PicoDomBuilderStatic
{
    /**
     * Create element from tag
     *
     * @example Dom.make("div", { class: "active" })
     *
     * @param {any} el Tag or element
     * @param {any} [options] Attr options
     * @returns {PicoDom} Dom instance
     */
    static make(el, options = {})
    {
        if ( el instanceof Dom ) {
            el = el.el;
        }

        if ( Mix.isStr(el) ) {
            el = document.createElement(el);
        }

        el = Obj.assign(el, options);

        let ini = new Dom(el);

        if ( options.class ) {
            ini.class(options.class);
        }

        if ( options.html ) {
            ini.html(options.html);
        }

        return ini;
    }
}

/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomBuilderInstance
{
    /**
     * Prepend value to element
     *
     * @example Dom.find("div").prepend("<span></span>")
     *
     * @param {any} value Prepend value
     * @returns {PicoDom} Current instance
     */
    prepend(value)
    {
        this.each((el) => {
            if ( el.prepend != null ) el.prepend(value);
        });

        return this;
    }

    /**
     * Prepend element to value
     *
     * @example Dom.find("span").prependTo("div")
     *
     * @param {any} value Target element
     * @returns {PicoDom} Current instance
     */
    prependTo(value)
    {
        Dom.find(value).each((el) => {
            if ( el.prepend != null ) el.prepend(this.el);
        });

        return this;
    }

    /**
     * Append value to element
     *
     * @example Dom.find("div").append("<span></span>")
     *
     * @param {any} value Append value
     * @returns {PicoDom} Current instance
     */
    append(value)
    {
        this.each((el) => {
            if ( el.append != null ) el.append(value);
        });

        return this;
    }

    /**
     * Append element to value
     *
     * @example Dom.find("span").appendTo("div")
     *
     * @param {any} value Target element
     * @returns {PicoDom} Current instance
     */
    appendTo(value)
    {
        Dom.find(value).each((el) => {
            if ( el.append != null ) el.append(this.el);
        });

        return this;
    }

    /**
     * Replace element with value
     *
     * @example Dom.find("div").replace("<span></span>")
     *
     * @param {any} value Replacement value
     * @returns {PicoDom} Current instance
     */
    replace(value)
    {
        this.parent().each(el, (el) => {
            (el.insertBefore(value, el), el.removeChild(el));
        });

        return this;
    }

}

/**
 * @param {typeof PicoDom} self
 * @returns {typeof PicoDom}
 */
export const PicoDomBuilderPlugin = function (self) {

    Obj.each(Mix.class(PicoDomBuilderStatic), (fn, id) => {
        self[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomBuilderInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    // self.init.push(PicoDomBuilderInstance.constructor);

    return self;
}