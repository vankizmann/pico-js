import { Dom, Locale } from "../index.esm.ts";
import { PicoDom, PicoDomInterface } from "../utils/Dom.ts";

export interface PicoDomMeta extends PicoDomInterface
{
    //
}

/**
 * @memberof PicoDom
 */
export class PicoDomMeta
{
    /**
     * @type {any}
     */
    static $meta : any = {};

    /**
     * Set document title
     *
     * @example Dom.setMetaTitle("Home")
     *
     * @param {string} value New title
     * @param {string} [glue] Title glue
     * @returns {PicoDom} Static class
     */
    static setMetaTitle(value : string, glue : string = ':value - :title') : PicoDom
    {
        if ( !this.$meta.title ) {
            this.$meta.title = Dom.doc().title;
        }

        document.title = Locale.replace(glue, {
            value, title: this.$meta.title
        });

        return <PicoDom> <unknown> this;
    }
}

// @ts-ignore
PicoDomMeta.title = (value : string) => {
    console.warn('Dom.title() is deprecated, use Dom.setMetaTitle() instead.');
    return Dom.setMetaTitle(value);
};

export default PicoDomMeta;