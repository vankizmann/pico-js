import { Arr, Dom, Mix } from "../index.esm.ts";
import { PicoDomInterface } from "../utils/Dom.ts";
import PicoDomFinder from "./DomFinder.js";
import PicoDomRectangle from "./DomRectangle.js";

export interface PicoDomInview extends PicoDomInterface,
    PicoDomFinder,
    PicoDomRectangle
{
    //
}

/**
 * @memberof PicoDom
 */
export class PicoDomInview
{

    /**
     * Get first inview element Y
     *
     * @example Dom.inviewMaxY(".item")
     *
     * @param {any} options Find options
     * @param {Function} [cb] Success callback
     * @returns {any} Found element
     */
    static inviewMaxY(options : any, cb : Function = null) : any
    {
        let defaults = {
            boundry: null, multiple: false, threshold: 0, mode: 'ratio'
        };

        if ( Mix.isString(options) ) {
            options = { el: options };
        }

        options = {
            ...defaults, ...options
        };

        if ( !options.el ) {
            throw new Error('Dom.inviewY() requires an element.');
        }

        let args = [
            options.threshold, options.mode, options.boundry
        ];

        let fn = (el : any) => {
            return Dom.find(el).isInviewY(...args);
        };

        let els = [];

        Dom.find(options.el).each((el : any) => {
            if ( fn(el) ) (cb ? cb(el) : null, els.push(el));
        });

        if ( options.multiple ) {
            return els;
        }

        return Arr.first(els);
    }

    /**
     * Get first inview element X
     *
     * @example Dom.inviewMaxX(".item")
     *
     * @param {any} options Find options
     * @param {Function} [cb] Success callback
     * @returns {any} Found element
     */
    static inviewMaxX(options : any, cb : Function = null) : any
    {
        let defaults = {
            boundry: null, multiple: false, threshold: 0, mode: 'ratio'
        };

        if ( Mix.isString(options) ) {
            options = { el: options };
        }

        options = {
            ...defaults, ...options
        };

        if ( !options.el ) {
            throw new Error('Dom.inviewX() requires an element.');
        }

        let args = [
            options.threshold, options.mode, options.boundry
        ];

        let fn = (el : any) => {
            return Dom.find(el).isInviewX(...args);
        };

        let els = [];

        Dom.find(options.el).each((el : any) => {
            if ( fn(el) ) (cb ? cb(el) : null, els.push(el));
        });

        if ( options.multiple ) {
            return els;
        }

        return Arr.first(els);
    }

    /**
     * Get X view offset
     *
     * @example Dom.find("div").viewoffX()
     *
     * @returns {any} Offset object
     */
    viewoffX() : any
    {
        if ( this.el == null ) {
            return { top: 0, bot: 0 };
        }

        let [viewport, width] = [
            Dom.win().innerWidth, this.width()
        ];

        let [offset, scroll] = [
            this.offset('left'), this.parent().scroll('left')
        ];

        let left = Math.max(...[
            0, offset - scroll
        ]);

        let right = Math.max(...[
            0, viewport - (offset + width - scroll)
        ]);

        return { left, right };
    }

    /**
     * Get X inview pixels
     *
     * @example Dom.find("div").inviewX()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Inview pixels
     */
    inviewX(boundry : any = null) : number
    {
        let { left, right } : any = Dom.find(boundry).viewoffY();

        let [viewport, height] = [
            Dom.win().innerHeight - right - left, this.height()
        ];

        let [offset, scroll] = [
            this.offset('left') + left, this.scroll('left') + left
        ];

        let inview = Math.max(0, scroll + viewport - offset + left);

        if ( inview > height ) {
            inview = Math.min(height, viewport + height - inview);
        }

        return Math.max(0, inview);
    }

    /**
     * Get X inview ratio
     *
     * @example Dom.find("div").inratioX()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Inview ratio
     */
    inratioX(boundry : any = null) : number
    {
        return 1 / this.width() * this.inviewX(boundry);
    }

    /**
     * Check if is inview X
     *
     * @example Dom.find("div").isInviewX(0.5)
     *
     * @param {number} [threshold] View threshold
     * @param {string} [mode] View mode
     * @param {any} [boundry] View boundry
     * @returns {boolean} True if inview
     */
    isInviewX(threshold : number = 0.1, mode : string = 'ratio', boundry : any = null) : boolean
    {
        if ( mode === 'pixel' ) {
            return this.inviewX(boundry) > threshold;
        }

        return this.inratioX(boundry) > threshold;
    }

    /**
     * Get Y view offset
     *
     * @example Dom.find("div").viewoffY()
     *
     * @returns {any} Offset object
     */
    viewoffY() : any
    {
        if ( this.el == null ) {
            return { top: 0, bottom: 0 };
        }

        let [viewport, height] = [
            Dom.win().innerHeight, this.height()
        ];

        let [offset, scroll] = [
            this.offset('top'), this.parent().scroll('top')
        ];

        let top = Math.max(...[
            0, offset - scroll
        ]);

        let bottom = Math.max(...[
            0, viewport - (offset + height - scroll)
        ]);

        return { top, bottom };
    }

    /**
     * Get Y inview pixels
     *
     * @example Dom.find("div").inviewY()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Inview pixels
     */
    inviewY(boundry : any = null) : number
    {
        let { top, bottom } : any = Dom.find(boundry).viewoffY();

        let [viewport, height] = [
            Dom.win().innerHeight - bottom - top, this.height()
        ];

        let [offset, scroll] = [
            this.offset('top') + top, this.scroll('top') + top
        ];

        let inview = Math.max(0, scroll + viewport - offset + top);

        if ( inview > height ) {
            inview = Math.min(height, viewport + height - inview);
        }

        return Math.min(Math.max(0, inview), viewport);
    }

    /**
     * Get Y inview ratio
     *
     * @example Dom.find("div").inratioY()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Inview ratio
     */
    inratioY(boundry : any = null) : number
    {
        return 1 / this.height() * this.inviewY(boundry);
    }

    /**
     * Check if is inview Y
     *
     * @example Dom.find("div").isInviewY(0.5)
     *
     * @param {number} [threshold] View threshold
     * @param {string} [mode] View mode
     * @param {any} [boundry] View boundry
     * @returns {boolean} True if inview
     */
    isInviewY(threshold : number = 0.1, mode : string = 'ratio', boundry : any = null) : boolean
    {
        if ( mode === 'pixel' ) {
            return this.inviewY(boundry) > threshold;
        }

        return this.inratioY(boundry) > threshold;
    }
}

// @ts-ignore
PicoDomInview.prototype.inviewHeight = function (...args : Parameters<typeof PicoDomInview.prototype.inviewY>) {
    console.warn('Dom.inviewHeight() is deprecated, use Dom.inviewY() instead.');
    return this.inviewY(...args);
}

// @ts-ignore
PicoDomInview.prototype.inviewWidth = function (...args : Parameters<typeof PicoDomInview.prototype.inviewX>) {
    console.warn('Dom.inviewWidth() is deprecated, use Dom.inviewX() instead.');
    return this.inviewX(...args);
}

export default PicoDomInview;