import { Dom, Mix, Obj } from "../index.esm.ts";
import { PicoDom, PicoDomInterface } from "../utils/Dom.ts";
import PicoDomFinder from "./DomFinder.js";
import PicoDomAttribute from "./DomAttribute.js";

export interface PicoDomRectangle extends PicoDomInterface,
    PicoDomFinder,
    PicoDomAttribute
{
    //
}

/**
 * @memberof PicoDom
 */
export class PicoDomRectangle
{
    /**
     * Cast value to number
     *
     * @example Dom.num("10px") // => 10
     *
     * @param {any} value Input value
     * @returns {number} Number value
     */
    static num(value : any) : number
    {
        if ( typeof value === 'string' ) {
            value = value.replace(/(^\s+|\s$|px)/g, '');
        }

        return Mix.num(value, 0);
    }

    /**
     * Get bounding rectangle
     *
     * @example Dom.find("div").rect()
     *
     * @param {any} [fallback] Fallback value
     * @returns {any} Rect object
     */
    rect(fallback : any = { left: 0, top: 0, width: 0, height: 0 })
    {
        if ( !this.el.getBoundingClientRect ) {
            return fallback;
        }

        const rect = this.el.getBoundingClientRect();

        if ( rect == null ) {
            return fallback;
        }

        return rect.toJSON();
    }

    /**
     * Get margin values
     *
     * @example Dom.find("div").margin()
     *
     * @param {string} [key] Margin key
     * @param {number} [fallback] Fallback value
     * @returns {any} Margin values
     */
    margin(key : string = null, fallback : number = 0) : any
    {
        let computed = this.computed();

        let result = {
            top: Dom.num(computed.marginTop),
            right: Dom.num(computed.marginRight),
            bottom: Dom.num(computed.marginBottom),
            left: Dom.num(computed.marginLeft)
        };

        if ( key == null ) {
            return result;
        }

        return Obj.get(result, key, fallback);
    }

    /**
     * Get padding values
     *
     * @example Dom.find("div").padding()
     *
     * @param {string} [key] Padding key
     * @param {number} [fallback] Fallback value
     * @returns {any} Padding values
     */
    padding(key : string = null, fallback : number = 0) : any
    {
        let computed = this.computed();

        let result = {
            top: Dom.num(computed.paddingTop),
            right: Dom.num(computed.paddingRight),
            bottom: Dom.num(computed.paddingBottom),
            left: Dom.num(computed.paddingLeft)
        };

        if ( key == null ) {
            return result;
        }

        return Obj.get(result, key, fallback);
    }

    /**
     * Get element height
     *
     * @example Dom.find("div").height() // => 100
     *
     * @returns {number} Height value
     */
    height() : number
    {
        if ( this.el == null ) {
            return 0;
        }

        if ( this.el instanceof Window ) {
            return this.el.innerHeight;
        }

        return this.el.offsetHeight;
    }

    /**
     * Get client height
     *
     * @example Dom.find("div").clientHeight()
     *
     * @returns {number} Height value
     */
    clientHeight() : number
    {
        if ( this.el == null ) {
            return 0;
        }

        return Dom.num(this.computed('height', 0));
    }

    /**
     * Get scroll height
     *
     * @example Dom.find("div").scrollHeight()
     *
     * @returns {number} Height value
     */
    scrollHeight() : number
    {
        if ( this.el == null ) {
            return 0;
        }

        return this.el.scrollHeight;
    }

    /**
     * Get inner height
     *
     * @example Dom.find("div").innerHeight()
     *
     * @returns {number} Height value
     */
    innerHeight() : number
    {
        if ( this.el == null ) {
            return 0;
        }

        if ( this.el instanceof Window ) {
            return this.el.innerHeight;
        }

        let pad = this.padding();

        return this.el.offsetHeight - pad.top - pad.bottom;
    }

    /**
     * Get real height
     *
     * @example Dom.find("div").realHeight({ display: "block" })
     *
     * @param {any} [style] Temp style
     * @returns {any} Height value
     */
    realHeight(style : any = {}) : any
    {
        let height : number | string = 'auto';

        this.actual(() => {
            return height = this.height();
        }, style);

        return height;
    }

    /**
     * Evaluate target height
     *
     * @example Dom.find("div").evaluateHeight(".container")
     *
     * @param {any} [target] Target element
     * @param {boolean} [apply] Apply style
     * @returns {any} Height value
     */
    evaluateHeight(target : any = null, apply : boolean = true) : any
    {
        target = Dom.find(target);

        if ( target === null ) {
            target = this.parent();
        }

        let height : number | string = 'auto';

        this.actual(() => {
            height = target.innerHeight();
        }, { display: 'none' });

        if ( apply === true ) {
            this.style({ height: height + 'px' });
        }

        return height;
    }

    /**
     * Get element width
     *
     * @example Dom.find("div").width() // => 100
     *
     * @returns {number} Width value
     */
    width() : number
    {
        if ( this.el == null ) {
            return 0;
        }

        if ( this.el instanceof Window ) {
            return this.el.innerWidth;
        }

        return this.el.offsetWidth;
    }

    /**
     * Get client width
     *
     * @example Dom.find("div").clientWidth()
     *
     * @returns {number} Width value
     */
    clientWidth() : number
    {
        if ( this.el == null ) {
            return 0;
        }

        return Dom.num(this.computed('width', 0));
    }

    /**
     * Get scroll width
     *
     * @example Dom.find("div").scrollWidth()
     *
     * @returns {number} Width value
     */
    scrollWidth() : number
    {
        if ( this.el == null ) {
            return 0;
        }

        return this.el.scrollWidth;
    }

    /**
     * Get inner width
     *
     * @example Dom.find("div").innerWidth()
     *
     * @returns {number} Width value
     */
    innerWidth() : number
    {
        if ( this.el == null ) {
            return 0;
        }

        if ( this.el instanceof Window ) {
            return this.el.innerWidth;
        }

        let pad = this.padding();

        return this.el.offsetWidth - pad.left - pad.right;
    }

    /**
     * Get real width
     *
     * @example Dom.find("div").realWidth({ display: "block" })
     *
     * @param {any} [style] Temp style
     * @returns {any} Width value
     */
    realWidth(style = {}) : any
    {
        let width : number | string = 'auto';

        this.actual(() => {
            return width = this.width();
        }, style);

        return width;
    }

    /**
     * Evaluate target width
     *
     * @example Dom.find("div").evaluateWidth(".container")
     *
     * @param {any} [target] Target element
     * @param {boolean} [apply] Apply style
     * @returns {any} Width value
     */
    evaluateWidth(target : any = null, apply : boolean = true) : any
    {
        target = Dom.find(target);

        if ( target === null ) {
            target = this.parent();
        }

        let width : number | string = 'auto';

        this.actual(() => {
            width = target.innerWidth();
        }, { display: 'none' });

        if ( apply === true ) {
            this.style({ width: width + 'px' });
        }

        return width;
    }

    /**
     * Get element offset
     *
     * @example Dom.find("div").offset()
     *
     * @param {string} [key] Offset key
     * @param {any} [boundry] View boundry
     * @returns {any} Offset values
     */
    offset(key : string = null, boundry : any = null) : any
    {
        let offset = this.getOffset(boundry);

        if ( key == null ) {
            return offset;
        }

        return Obj.get(offset, key, 0);
    }

    /**
     * Get top offset
     *
     * @example Dom.find("div").offsetTop()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Top offset
     */
    offsetTop(boundry : any = null) : number
    {
        return this.offset('top', boundry);
    }

    /**
     * Get bottom offset
     *
     * @example Dom.find("div").offsetBottom()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Bottom offset
     */
    offsetBottom(boundry : any = null) : number
    {
        return this.offset('bottom', boundry);
    }

    /**
     * Get left offset
     *
     * @example Dom.find("div").offsetLeft()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Left offset
     */
    offsetLeft(boundry : any = null) : number
    {
        return this.offset('left', boundry);
    }

    /**
     * Get right offset
     *
     * @example Dom.find("div").offsetRight()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Right offset
     */
    offsetRight(boundry : any = null) : number
    {
        return this.offset('right', boundry);
    }

    /**
     * Loop through offset parents
     *
     * @example Dom.find("div").loopOffset((el) => console.log(el))
     *
     * @param {Function} cb Callback fn
     * @param {any} [boundry] Loop limit
     * @returns {PicoDom} Current instance
     */
    loopOffset(cb : Function, boundry : any = null) : PicoDom
    {
        if ( boundry == null ) {
            boundry = Dom.body();
        }

        for ( let el = this.el; el && el !== boundry; el = el.offsetParent ) {
            cb.call({}, el);
        }

        return <PicoDom> <unknown> this;
    }

    /**
     * Calculate relative offset
     *
     * @example Dom.calcOffset(offset, 100, 100)
     *
     * @param {any} offset Base offset
     * @param {number} width Element width
     * @param {number} height Element height
     * @returns {any} Calculated offset
     */
    calcOffset(offset : any, width : number, height : number) : any
    {
        let size = {
            right: Dom.body().scrollWidth - offset.left - width,
            bottom: Dom.body().scrollHeight - offset.top - height,
        };

        return { ...offset, ...size };
    }

    /**
     * Get relative offset
     *
     * @example Dom.find("div").getOffset()
     *
     * @param {any} [boundry] View boundry
     * @returns {any} Offset values
     */
    getOffset(boundry : any = null) : any
    {
        if ( boundry == null ) {
            boundry = Dom.body();
        }

        let cb, source = {
            top: 0, left: 0, bottom: 0, right: 0
        };

        if ( this.el == null ) {
            return source;
        }

        cb = (el : any) => {
            source.top += Dom.num(el.offsetTop, 0);
            source.left += Dom.num(el.offsetLeft, 0);
        };

        this.loopOffset(cb);

        source = this.calcOffset(...[
            source, this.width(), this.height()
        ]);

        let body = Dom.find(boundry);

        let target = {
            top: 0, left: 0, bottom: 0, right: 0
        };

        cb = (el : any) => {
            target.top += Dom.num(el.offsetTop, 0);
            target.left += Dom.num(el.offsetLeft, 0);
        };

        body.loopOffset(cb);

        target = this.calcOffset(...[
            target, body.scrollWidth(), body.scrollHeight()
        ]);

        return {
            top: source.top - target.top,
            bottom: source.bottom - target.bottom,
            left: source.left - target.left,
            right: source.right - target.right
        };
    }

    /**
     * Get element scroll
     *
     * @example Dom.find("div").scroll()
     *
     * @param {any} [key] Scroll key
     * @param {any} [boundry] View boundry
     * @returns {any} Scroll values
     */
    scroll(key : any = null, boundry : any = null) : any
    {
        let scroll = this.getScroll(boundry);

        if ( key == null ) {
            return scroll;
        }

        return Obj.get(scroll, key, 0);
    }

    /**
     * Get or set scroll top
     *
     * @example Dom.find("div").scrollTop(100)
     *
     * @param {any} [value] Scroll value
     * @param {any} [boundry] View boundry
     * @returns {any} Value or instance
     */
    scrollTop(value : any = null, boundry : any = null) : any
    {
        if ( value == null ) {
            return this.scroll('top', boundry);
        }

        this.each((el : any) => {
            el.scrollTop = value;
        });

        return this;
    }

    /**
     * Get or set scroll left
     *
     * @example Dom.find("div").scrollLeft(100)
     *
     * @param {any} [value] Scroll value
     * @param {any} [boundry] View boundry
     * @returns {any} Value or instance
     */
    scrollLeft(value : any = null, boundry : any = null) : any
    {
        if ( value == null ) {
            return this.scroll('left', boundry);
        }

        this.each((el : any) => {
            el.scrollLeft = value;
        });

        return this.scroll('left', boundry);
    }

    /**
     * Get relative scroll
     *
     * @example Dom.find("div").getScroll()
     *
     * @param {any} [boundry] View boundry
     * @returns {any} Scroll values
     */
    getScroll(boundry : any = null) : any
    {
        if ( boundry == null ) {
            boundry = Dom.win();
        }

        let cb, source = {
            top: 0, left: 0
        };

        if ( this.el == null ) {
            return source;
        }

        cb = (el : any) => {
            source.top += Dom.num(el.scrollTop || el.pageYOffset || 0);
            source.left += Dom.num(el.scrollLeft || el.pageXOffset || 0);
        }

        this.loopParent(cb);

        let target = {
            top: 0, left: 0
        };

        cb = (el : any) => {
            target.top += Dom.num(el.scrollTop || el.pageYOffset || 0);
            target.left += Dom.num(el.scrollLeft || el.pageXOffset || 0);
        };

        Dom.find(boundry).loopParent(cb);

        return {
            top: source.top - target.top,
            left: source.left - target.left
        };
    }

}

// @ts-ignore
PicoDomRectangle.prototype.loopOffsetParent = function (...args : Parameters<typeof PicoDomRectangle.prototype.loopOffset>) {
    console.warn('Dom.loopOffsetParent() is deprecated, use Dom.loopOffset() instead.');
    return this.loopOffset(...args);
};

// @ts-ignore
PicoDomRectangle.prototype.scrollTopGlobal = function () {
    console.warn('Dom.scrollTopGlobal() is deprecated, use Dom.scroll(\'top\') instead.');
    return this.scroll('top', null);
};

// @ts-ignore
PicoDomRectangle.prototype.scrollLeftGlobal = function () {
    console.warn('Dom.scrollLeftGlobal() is deprecated, use Dom.scroll(\'left\') instead.');
    return this.scroll('left', null);
};

export default PicoDomRectangle;