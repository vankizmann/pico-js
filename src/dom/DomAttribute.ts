import { Arr, Dom, For, Mix, Obj } from "../index.esm.ts";
import { PicoDom, PicoDomInterface } from "../utils/Dom.ts";
import PicoDomFinder from "./DomFinder.js";

export interface PicoDomAttribute extends PicoDomInterface,
    PicoDomFinder
{
    //
}

/**
 * @memberof PicoDom
 */
export class PicoDomAttribute
{
    /**
     * Get or set attribute
     *
     * @example Dom.find("div").attr("id")
     *
     * @param {string} key Attr key
     * @param {any} [value] Attr value
     * @param {any} [fallback] Fallback value
     * @returns {any} Attr value or instance
     */
    attr(key : string, value : any = undefined, fallback : any = null) : any
    {
        if ( this.el == null ) {
            return value ? this : fallback;
        }

        let attr = this.el.getAttribute(key);

        if ( Mix.isUndef(value) ) {
            return attr || fallback;
        }

        if ( value === null ) {
            return (this.el.removeAttribute(key), attr);
        }

        if ( Mix.isArr(value) ) {
            value = value.join(' ');
        }

        if ( Mix.isObj(value) ) {
            value = For.castOptions(value);
        }

        this.el.setAttribute(key, value);

        return this;
    }

    /**
     * Get or set data attribute
     *
     * @example Dom.find("div").data("id")
     *
     * @param {string} key Data key
     * @param {any} [value] Data value
     * @param {any} [fallback] Fallback value
     * @returns {any} Data value or instance
     */
    data(key : string, value : any = undefined, fallback : any = null) : any
    {
        return this.attr('data-' + key, value, fallback);
    }

    /**
     * Get computed style
     *
     * @example Dom.find("div").computed("width")
     *
     * @param {any} [key] Style key
     * @param {any} [fallback] Fallback value
     * @returns {any} Computed style
     */
    computed(key : any = null, fallback : any = null) : any
    {
        if ( this.el == null ) {
            return fallback;
        }

        if ( this.getNodeType() !== 1 ) {
            return fallback;
        }

        let computed = getComputedStyle(this.el);

        if ( key == null ) {
            return computed;
        }

        return Obj.get(computed, key, fallback);
    }

    /**
     * Get or set style
     *
     * @example Dom.find("div").style({ color: "red" })
     *
     * @param {any} [value] Style value
     * @param {boolean} [combine] Combine style
     * @returns {any} Style or instance
     */
    style(value : any = undefined, combine : boolean = true) : any
    {
        if ( this.el == null ) {
            return this;
        }

        if ( value === null ) {
            return this.attr('style', null);
        }

        let styles = this.attr('style', undefined, {});

        if ( Mix.isStr(styles) ) {
            styles = For.parseOptions(styles);
        }

        if ( Mix.isUndef(value) ) {
            return styles;
        }

        if ( combine ) {
            value = { ...styles, ...value };
        }

        if ( value.translate ) {
            value.transform = `translate3d(${value.translate.join(',')}, 0)`;
        }

        delete value.translate;

        if ( Mix.isNum(value.top) ) {
            value.top += 'px';
        }

        if ( Mix.isNum(value.left) ) {
            value.left += 'px';
        }

        if ( Mix.isNum(value.width) ) {
            value.width += 'px';
        }

        if ( Mix.isNum(value.height) ) {
            value.height += 'px';
        }

        this.attr('style', value);

        return this;
    }

    /**
     * Get or set classes
     *
     * @example Dom.find("div").class(["active"])
     *
     * @param {any} [value] Class value
     * @param {boolean} [combine] Combine classes
     * @returns {any} Classes or instance
     */
    class(value : any = undefined, combine : boolean = false) : any
    {
        if ( this.el == null ) {
            return this;
        }

        if ( value === null ) {
            return this.attr('class', '');
        }

        let classes = this.attr('class', undefined, []);

        if ( Mix.isStr(classes) ) {
            classes = classes.split(' ');
        }

        if ( Mix.isUndef(value) ) {
            return classes;
        }

        if ( combine ) {
            value = [...classes, ...value];
        }

        this.attr('class', value);

        return this;
    }

    /**
     * Get or set inner HTML
     *
     * @example Dom.find("div").html("<span></span>")
     *
     * @param {any} [html] HTML content
     * @returns {any} HTML or instance
     */
    html(html : any = undefined) : any
    {
        if ( html === undefined ) {
            return this.el.innerHTML;
        }

        this.each((el : any) => {
            el.innerHTML = html;
        });

        return this;
    }

    /**
     * Get actual style value
     *
     * @example Dom.find("div").actual((el) => el.offsetWidth, { display: "block" })
     *
     * @param {Function} cb Callback fn
     * @param {any} [style] Temp style
     * @returns {any} Callback result
     */
    actual(cb : Function, style : any = null) : any
    {
        let backup = this.attr('style');

        this.style(style);

        let result = cb(this.el, this.el);

        this.attr('style', backup);

        return result;
    }

    /**
     * Check if has class
     *
     * @example Dom.find("div").hasClass("active") // => true
     *
     * @param {any} cls Class name
     * @returns {boolean} True if has class
     */
    hasClass(cls : any) : boolean
    {
        if ( !Mix.isArr(cls) ) {
            cls = [cls];
        }

        return Arr.isect(this.class(), cls).length > 0;
    }

    /**
     * Add class to element
     *
     * @example Dom.find("div").addClass("active")
     *
     * @param {any} cls Class name
     * @returns {PicoDom} Current instance
     */
    addClass(cls : any) : PicoDom
    {
        if ( this.el == null ) {
            return <PicoDom> <unknown> this;
        }

        if ( this.els.length > 1 ) {
            return this.each((el : any) => Dom.find(el).addClass(cls));
        }

        let result = this.el.className.split(' ');

        if ( Mix.isStr(cls) ) {
            cls = cls.split(' ');
        }

        result = Arr.append(result, ...cls);

        this.el.className = Arr.unique(result).join(' ');

        return <PicoDom> <unknown> this;
    }

    /**
     * Remove class from element
     *
     * @example Dom.find("div").remClass("active")
     *
     * @param {any} cls Class name
     * @returns {PicoDom} Current instance
     */
    remClass(cls : any) : PicoDom
    {
        if ( this.el == null ) {
            return <PicoDom> <unknown> this;
        }

        if ( this.els.length > 1 ) {
            return this.each((el : any) => Dom.find(el).remClass(cls));
        }

        let result = this.el.className.split(' ');

        if ( Mix.isStr(cls) ) {
            cls = cls.split(' ');
        }

        result = Arr.diff(result, cls);

        this.el.className = Arr.unique(result).join(' ');

        return <PicoDom> <unknown> this;
    }

    /**
     * Toggle class on element
     *
     * @example Dom.find("div").toggleClass("active")
     *
     * @param {any} cls Class name
     * @returns {PicoDom} Current instance
     */
    toggleClass(cls : any) : PicoDom
    {
        if ( this.els.length > 1 ) {
            return this.each((el : any) => Dom.find(el).toggleClass(cls));
        }

        if ( this.hasClass(cls) ) {
            return this.remClass(cls);
        }

        return this.addClass(cls);
    }

    /**
     * Set class by state
     *
     * @example Dom.find("div").stateClass("active", true)
     *
     * @param {any} cls Class name
     * @param {boolean} [state] Target state
     * @returns {PicoDom} Current instance
     */
    stateClass(cls : any, state : boolean = true) : PicoDom
    {
        if ( this.els.length > 1 ) {
            return this.each((el : any) => Dom.find(el).stateClass(cls));
        }

        if ( !state ) {
            return this.remClass(cls);
        }

        return this.addClass(cls);
    }

}

/**
 * @deprecated use Dom.style instead
 */
// @ts-ignore
PicoDomAttribute.prototype.css = function(...args : Parameters<typeof PicoDomAttribute.prototype.style>) : any {
    console.warn('Dom.css() is deprecated, use Dom.style() instead.');
    return this.style(...args);
};

/**
 * @deprecated use Dom.remClass instead
 */
// @ts-ignore
PicoDomAttribute.prototype.removeClass = function(...args : Parameters<typeof PicoDomAttribute.prototype.remClass>) : any {
    console.warn('Dom.removeClass() is deprecated, use Dom.remClass() instead.');
    return this.remClass(...args);
};

export default PicoDomAttribute;