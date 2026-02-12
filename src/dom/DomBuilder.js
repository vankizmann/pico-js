import { Arr, Dom, Mix, Obj } from "#src/index.esm.js";

/**
 * @memberof PicoDom
 */
export class PicoDomBuilderStatic
{
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
    prepend(value)
    {
        this.each((el) => {
            if ( el.prepend != null ) el.prepend(value);
        });

        return this;
    }

    prependTo(value)
    {
        Dom.find(value).each((el) => {
            if ( el.prepend != null ) el.prepend(this.el);
        });

        return this;
    }

    append(value)
    {
        this.each((el) => {
            if ( el.append != null ) el.append(value);
        });

        return this;
    }

    appendTo(value)
    {
        Dom.find(value).each((el) => {
            if ( el.append != null ) el.append(this.el);
        });

        return this;
    }

    replace(value)
    {
        this.parent().each(el, (el) => {
            (el.insertBefore(value, el), el.removeChild(el));
        });

        return this;
    }

}

export const PicoDomBuilderPlugin = function () {

    Obj.each(Mix.class(PicoDomBuilderStatic), (fn, id) => {
        this[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomBuilderInstance), (fn, id) => {
        this.prototype[id] = fn;
    });

    // this.init.push(PicoDomBuilderInstance.constructor);

    return this;
}