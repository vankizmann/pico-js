import { Arr, Dom, Mix, Obj } from "../index.esm.js";
import { PicoDom } from "../utils/Dom.js";

/**
 * @memberof PicoDom
 */
export class PicoDomRectangleStatic
{
    /**
     * Cast value to number
     *
     * @example Dom.num("10px") // => 10
     *
     * @param {any} value Input value
     * @returns {number} Number value
     */
    static num(value)
    {
        if ( typeof value === 'string' ) {
            value = value.replace(/(^\s+|\s$|px)/g, '');
        }

        return Mix.num(value, 0);
    }
}

/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomRectangleInstance
{
    rect(fallback = { left: 0, top: 0, width: 0, height: 0 })
    {
        if ( ! this.el.getBoundingClientRect ) {
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
    margin(key = null, fallback = 0)
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
    padding(key = null, fallback = 0)
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
    height()
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
    clientHeight()
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
    scrollHeight()
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
    innerHeight()
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
     * @returns {number} Height value
     */
    realHeight(style = {})
    {
        let height = 'auto';

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
     * @returns {number} Height value
     */
    evaluateHeight(target = null, apply = true)
    {
        target = Dom.find(target);

        if ( target === null ) {
            target = this.parent();
        }

        let height = 'auto';

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
    width()
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
    clientWidth()
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
    scrollWidth()
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
    innerWidth()
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
     * @returns {number} Width value
     */
    realWidth(style = {})
    {
        let width = 'auto';

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
     * @returns {number} Width value
     */
    evaluateWidth(target = null, apply = true)
    {
        target = Dom.find(target);

        if ( target === null ) {
            target = this.parent();
        }

        let width = 'auto';

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
    offset(key = null, boundry = null)
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
    offsetTop(boundry = null)
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
    offsetBottom(boundry = null)
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
    offsetLeft(boundry = null)
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
    offsetRight(boundry = null)
    {
        return this.offset('right', boundry);
    }

    /**
     * Loop through offset parents
     *
     * @example Dom.find("div").loopOffset((el) => console.log(el))
     *
     * @param {function} cb Callback fn
     * @param {any} [boundry] Loop limit
     * @returns {PicoDom} Current instance
     */
    loopOffset(cb, boundry = null)
    {
        if ( boundry == null ) {
            boundry = Dom.body();
        }

        for ( let el = this.el; el && el !== boundry; el = el.offsetParent ) {
            cb.call({}, el);
        }

        return this;
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
    calcOffset(offset, width, height)
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
    getOffset(boundry = null)
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

        cb = (el) => {
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

        cb = (el) => {
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
    scroll(key = null, boundry = null)
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
     * @returns {number|PicoDom} Value or instance
     */
    scrollTop(value = null, boundry = null)
    {
        if ( value == null ) {
            return this.scroll('top', boundry);
        }

        this.each((el) => {
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
     * @returns {number|PicoDom} Value or instance
     */
    scrollLeft(value = null, boundry = null)
    {
        if ( value == null ) {
            return this.scroll('left', boundry);
        }

        this.each((el) => {
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
    getScroll(boundry = null)
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

        cb = (el) => {
            source.top += Dom.num(el.scrollTop || el.pageYOffset || 0);
            source.left += Dom.num(el.scrollLeft || el.pageXOffset || 0);
        }

        this.loopParent(cb);

        let target = {
            top: 0, left: 0
        };

        cb = (el) => {
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

/**
 * @see PicoDom.loopOffsetParent
 */
PicoDomRectangleInstance.prototype.loopOffsetParent = function (...args) {
    console.warn('Dom.loopOffsetParent() is deprecated, use Dom.loopOffset() instead.');
    return this.loopOffset(...args);
};

/**
 * @see PicoDom.scrollTopGlobal
 */
PicoDomRectangleInstance.prototype.scrollTopGlobal = function () {
    console.warn('Dom.scrollTopGlobal() is deprecated, use Dom.scroll(\'top\') instead.');
    return this.scroll('top', null);
};

/**
 * @see PicoDom.scrollLeftGlobal
 */
PicoDomRectangleInstance.prototype.scrollLeftGlobal = function () {
    console.warn('Dom.scrollLeftGlobal() is deprecated, use Dom.scroll(\'left\') instead.');
    return this.scroll('left', null);
};

/**
 * @param {typeof PicoDom} self
 * @returns {typeof PicoDom}
 */
export const PicoDomRectanglePlugin = function (self) {

    Obj.each(Mix.class(PicoDomRectangleStatic), (fn, id) => {
        self[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomRectangleInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    // self.init.push(PicoDomRectangleInstance.constructor);

    return self;
}