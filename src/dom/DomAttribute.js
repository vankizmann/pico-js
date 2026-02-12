import { Arr, Dom, For, Mix, Obj } from "#src/index.esm.js";

/**
 * @memberof PicoDom
 */
export class PicoDomAttributeStatic
{
    //
}

/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomAttributeInstance
{
    /**
     * Get or set attribute
     *
     * @example Dom.find("div").attr("id")
     *
     * @param {string} key Attr key
     * @param {any} [value] Attr value
     * @param {any} [fallback] Fallback value
     * @returns {any|this} Attr value or instance
     */
    attr(key, value = undefined, fallback = null)
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
     * @returns {any|this} Data value or instance
     */
    data(key, value = undefined, fallback = null)
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
    computed(key = null, fallback = null)
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
     * @returns {any|this} Style or instance
     */
    style(value = undefined, combine = true)
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
     * @returns {any|this} Classes or instance
     */
    class(value = undefined, combine = false)
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
     * @returns {string|this} HTML or instance
     */
    html(html = undefined)
    {
        if ( html === undefined ) {
            return this.el.innerHTML;
        }

        this.each((el) => {
            el.innerHTML = html;
        });

        return this;
    }

    /**
     * Get actual style value
     *
     * @example Dom.find("div").actual((el) => el.offsetWidth, { display: "block" })
     *
     * @param {function} cb Callback fn
     * @param {any} [style] Temp style
     * @returns {any} Callback result
     */
    actual(cb, style = null)
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
    hasClass(cls)
    {
        if ( ! Mix.isArr(cls) ) {
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
     * @returns {this} Current instance
     */
    addClass(cls)
    {
        if ( this.el == null ) {
            return this;
        }

        if ( this.els.length > 1 ) {
            return this.each((el) => Dom.find(el).addClass(cls));
        }

        let result = this.el.className.split(' ');

        if ( Mix.isStr(cls) ) {
            cls = cls.split(' ');
        }

        result = Arr.append(result, ...cls);

        this.el.className = Arr.unique(result).join(' ');

        return this;
    }

    /**
     * Remove class from element
     *
     * @example Dom.find("div").remClass("active")
     *
     * @param {any} cls Class name
     * @returns {this} Current instance
     */
    remClass(cls)
    {
        if ( this.el == null ) {
            return this;
        }

        if ( this.els.length > 1 ) {
            return this.each((el) => Dom.find(el).remClass(cls));
        }

        let result = this.el.className.split(' ');

        if ( Mix.isStr(cls) ) {
            cls = cls.split(' ');
        }

        result = Arr.diff(result, cls);

        this.el.className = Arr.unique(result).join(' ');

        return this;
    }

    /**
     * Toggle class on element
     *
     * @example Dom.find("div").toggleClass("active")
     *
     * @param {any} cls Class name
     * @returns {this} Current instance
     */
    toggleClass(cls)
    {
        if ( this.els.length > 1 ) {
            return this.each((el) => Dom.find(el).toggleClass(cls));
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
     * @returns {this} Current instance
     */
    stateClass(cls, state = true)
    {
        if ( this.els.length > 1 ) {
            return this.each((el) => Dom.find(el).stateClass(cls));
        }

        if ( ! state ) {
            return this.remClass(cls);
        }

        return this.addClass(cls);
    }

}

/**
 * @see PicoDom.style
 */
PicoDomAttributeInstance.prototype.css = function (...args) {
    console.warn('Dom.css() is deprecated, use Dom.style() instead.');
    return this.style(...args);
};

/**
 * @see PicoDom.remClass
 */
PicoDomAttributeInstance.prototype.removeClass = function (...args) {
    console.warn('Dom.removeClass() is deprecated, use Dom.remClass() instead.');
    return this.remClass(...args);
};

/**
 * @returns {typeof import('#src/utils/Dom.js').PicoDom}
 */
export const PicoDomAttributePlugin = function (self) {

    Obj.each(Mix.class(PicoDomAttributeStatic), (fn, id) => {
        self[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomAttributeInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    // self.init.push(PicoDomAttributeInstance.constructor);

    return self;
}