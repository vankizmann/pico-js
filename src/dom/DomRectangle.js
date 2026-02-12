import { Arr, Dom, Mix, Obj } from "#src/index.esm.js";


/**
 * @memberof PicoDom
 */
export class PicoDomRectangleStatic
{
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

    clientHeight()
    {
        if ( this.el == null ) {
            return 0;
        }

        return Dom.num(this.computed('height', 0));
    }

    scrollHeight()
    {
        if ( this.el == null ) {
            return 0;
        }

        return this.el.scrollHeight;
    }

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

    realHeight(style = {})
    {
        let height = 'auto';

        this.actual(() => {
            return height = this.height();
        }, style);

        return height;
    }

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

    clientWidth()
    {
        if ( this.el == null ) {
            return 0;
        }

        return Dom.num(this.computed('width', 0));
    }

    scrollWidth()
    {
        if ( this.el == null ) {
            return 0;
        }

        return this.el.scrollWidth;
    }

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

    realWidth(style = {})
    {
        let width = 'auto';

        this.actual(() => {
            return width = this.width();
        }, style);

        return width;
    }

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

    offset(key = null, boundry = null)
    {
        let offset = this.getOffset(boundry);

        if ( key == null ) {
            return offset;
        }

        return Obj.get(offset, key, 0);
    }

    offsetTop(boundry = null)
    {
        return this.offset('top', boundry);
    }

    offsetBottom(boundry = null)
    {
        return this.offset('bottom', boundry);
    }

    offsetLeft(boundry = null)
    {
        return this.offset('left', boundry);
    }

    offsetRight(boundry = null)
    {
        return this.offset('right', boundry);
    }

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

    calcOffset(offset, width, height)
    {
        let size = {
            right: Dom.body().scrollWidth - offset.left - width,
            bottom: Dom.body().scrollHeight - offset.top - height,
        };

        return { ...offset, ...size };
    }

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

    scroll(key = null, boundry = null)
    {
        let scroll = this.getScroll(boundry);

        if ( key == null ) {
            return scroll;
        }

        return Obj.get(scroll, key, 0);
    }

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
            source.top += Dom.num(el.scrollTop || el.pageYOffset, 0);
            source.left += Dom.num(el.scrollLeft || el.pageXOffset, 0);
        }

        this.loopParent(cb);

        let target = {
            top: 0, left: 0
        };

        cb = (el) => {
            target.top += Dom.num(el.scrollTop || el.pageYOffset, 0);
            target.left += Dom.num(el.scrollLeft || el.pageXOffset, 0);
        };

        Dom.find(boundry).loopParent(cb);

        return {
            top: source.top - target.top,
            left: source.left - target.left
        };
    }

}

PicoDomRectangleInstance.prototype.loopOffsetParent = function (...args) {
    console.warn('Dom.loopOffsetParent() is deprecated, use Dom.loopOffset() instead.');
    return this.loopOffset(...args);
};

PicoDomRectangleInstance.prototype.scrollTopGlobal = function (...args) {
    console.warn('Dom.scrollTopGlobal() is deprecated, use Dom.scroll(\'top\') instead.');
    return this.scroll('top', null, ...args);
};

PicoDomRectangleInstance.prototype.scrollLeftGlobal = function (...args) {
    console.warn('Dom.scrollLeftGlobal() is deprecated, use Dom.scroll(\'left\') instead.');
    return this.scroll('left', null, ...args);
};


export const PicoDomRectanglePlugin = function () {

    Obj.each(Mix.class(PicoDomRectangleStatic), (fn, id) => {
        this[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomRectangleInstance), (fn, id) => {
        this.prototype[id] = fn;
    });

    // this.init.push(PicoDomRectangleInstance.constructor);

    return this;
}