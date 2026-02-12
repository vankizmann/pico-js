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

    data(key, value = undefined, fallback = null)
    {
        return this.attr('data-' + key, value, fallback);
    }

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

    actual(cb, style = null)
    {
        let backup = this.attr('style');

        this.style(style);

        let result = cb(this.el, this.el);

        this.attr('style', backup);

        return result;
    }

    hasClass(cls)
    {
        if ( ! Mix.isArr(cls) ) {
            cls = [cls];
        }

        return Arr.isect(this.class(), cls).length > 0;
    }

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

PicoDomAttributeInstance.prototype.css = function (...args) {
    console.warn('Dom.css() is deprecated, use Dom.style() instead.');
    return this.style(...args);
};

PicoDomAttributeInstance.prototype.removeClass = function (...args) {
    console.warn('Dom.removeClass() is deprecated, use Dom.remClass() instead.');
    return this.remClass(...args);
};

export const PicoDomAttributePlugin = function () {

    Obj.each(Mix.class(PicoDomAttributeStatic), (fn, id) => {
        this[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomAttributeInstance), (fn, id) => {
        this.prototype[id] = fn;
    });

    // this.init.push(PicoDomAttributeInstance.constructor);

    return this;
}