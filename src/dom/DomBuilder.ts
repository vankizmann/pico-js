import { Dom, Mix, Obj } from "../index.esm.ts";
import { PicoDom, PicoDomInterface } from "../utils/Dom.ts";
import PicoDomFinder from "./DomFinder.js";

export interface PicoDomBuilder extends PicoDomInterface,
    PicoDomFinder
{
    //
}

/**
 * @memberof PicoDom
 */
export class PicoDomBuilder
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
    static make(el : any, options : any = {}) : PicoDom
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

    /**
     * Prepend value to element
     *
     * @example Dom.find("div").prepend("<span></span>")
     *
     * @param {any} value Prepend value
     * @returns {PicoDom} Current instance
     */
    prepend(value : any) : PicoDom
    {
        this.each((el : any) => {
            if ( el.prepend != null ) el.prepend(value);
        });

        return <PicoDom> <unknown> this;
    }

    /**
     * Prepend element to value
     *
     * @example Dom.find("span").prependTo("div")
     *
     * @param {any} value Target element
     * @returns {PicoDom} Current instance
     */
    prependTo(value : any) : PicoDom
    {
        Dom.find(value).each((el : any) => {
            if ( el.prepend != null ) el.prepend(this.el);
        });

        return <PicoDom> <unknown> this;
    }

    /**
     * Append value to element
     *
     * @example Dom.find("div").append("<span></span>")
     *
     * @param {any} value Append value
     * @returns {PicoDom} Current instance
     */
    append(value : any) : PicoDom
    {
        this.each((el : any) => {
            if ( el.append != null ) el.append(value);
        });

        return <PicoDom> <unknown> this;
    }

    /**
     * Append element to value
     *
     * @example Dom.find("span").appendTo("div")
     *
     * @param {any} value Target element
     * @returns {PicoDom} Current instance
     */
    appendTo(value : any) : PicoDom
    {
        Dom.find(value).each((el : any) => {
            if ( el.append != null ) el.append(this.el);
        });

        return <PicoDom> <unknown> this;
    }

    /**
     * Replace element with value
     *
     * @example Dom.find("div").replace("<span></span>")
     *
     * @param {any} value Replacement value
     * @returns {PicoDom} Current instance
     */
    replace(value : any) : PicoDom
    {
        this.parent().each((el : any) => {
            (el.insertBefore(value, el), el.removeChild(el));
        });

        return <PicoDom> <unknown> this;
    }

}

export default PicoDomBuilder;