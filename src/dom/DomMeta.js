import { Arr, Mix, Obj, Dom, Locale } from "#src/index.esm.js";

/**
 * @memberof PicoDom
 */
export class PicoDomMetaStatic
{
    static $meta = {};

    /**
     * Set document title
     *
     * @example Dom.setMetaTitle("Home")
     *
     * @param {string} value New title
     * @param {string} [glue] Title glue
     * @returns {this} Static class
     */
    static setMetaTitle(value, glue = ':value - :title')
    {
        if ( ! this.$meta.title ) {
            this.$meta.title = Dom.doc().title;
        }

        document.title = Locale.replace(glue, {
            value, title: this.$meta.title
        });

        return this;
    }
}

/**
 * @see PicoDom.setMetaTitle
 */
PicoDomMetaStatic.title = (value) => {
    console.warn('Dom.title() is deprecated, use Dom.setMetaTitle() instead.');
    return Dom.setMetaTitle(value);
};

/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomMetaInstance
{

}

/**
 * @returns {typeof import('#src/utils/Dom.js').PicoDom}
 */
export const PicoDomMetaPlugin = function (self) {

    Obj.each(Mix.class(PicoDomMetaStatic), (fn, id) => {
        self[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomMetaInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    // self.init.push(PicoDomMetaInstance.constructor);

    return self;
}