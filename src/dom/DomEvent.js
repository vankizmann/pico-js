import { Arr, Hash, Mix, Obj, Dom } from "#src/index.esm.js";

/**
 * @memberof PicoDom
 */
export class PicoDomEventStatic
{
    static events = [];
}

/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomEventInstance
{

    bind(el, event, cb, selector = null, pause = false, options = {})
    {
        if ( Mix.isPrim(options) ) {
            options = { id: options };
        }

        Dom.events = Arr.append(Dom.events, {
            el, event, cb, selector, pause, options
        });

        el.addEventListener(event, cb, options);

        return this;
    }

    unbind(el, event, selector = null, options = {})
    {
        if ( Mix.isPrim(options) ) {
            options = { id: options };
        }

        let indexes = Arr.filterIndex(Dom.events, {
            el, event, selector, options
        });

        if ( indexes.length === 0 ) {
            return;
        }

        let args = (val) => {
            return [event, val.cb, val.options];
        };

        Arr.each(indexes.reverse(), (index) => {
            el.removeEventListener(...args(Dom.events[index]));
        });

        Arr.splices(Dom.events, indexes);

        return this;
    }

    on(event, cb, options = {}, pause = false, selector = null)
    {
        if ( Mix.isPrim(options) ) {
            options = { id: options };
        }

        if ( Mix.isArr(event) ) {
            return (Arr.each(event, (e) => this.on(e, ...arguments)), this);
        }

        let fn = (e) => {
            cb.call(e.target, e, e.target);
        };

        this.each((el) => {
            this.bind(el, event, fn, selector, pause, options);
        });

        return this;
    }

    off(event, selector = null, options = {})
    {
        if ( Mix.isArr(event) ) {
            return (Arr.each(event, (e) => this.off(e, ...arguments)), this);
        }

        if ( Mix.isObj(selector) ) {
            (options = selector, selector = null);
        }

        this.each((el) => {
            this.unbind(el, event, selector, options);
        });

        return this;
    }

    once(event, cb, options = {})
    {
        options.id = Hash.make(24);

        this.on(event, (e) => {
            cb(e); this.off(event, options);
        }, options);

        return this;
    }

    live(event, selector, cb, options = {}, pause = false)
    {
        let fn = function (event) {

            let target = Dom.getNodeEvent(selector, event);

            if ( target == null ) {
                return;
            }

            cb.call({}, event, target);
        };

        this.on(event, fn, options, pause, selector);

        return this;
    }

    fire(event)
    {
        let callback = new Event(event);

        this.each((el) => {
            el.dispatchEvent(callback);
        });

        return this;
    }

}

PicoDomEventInstance.prototype.one = function (...args) {
    console.warn('Dom.one() is deprecated, use Dom.once() instead.');
    return this.once(...args);
};

PicoDomEventInstance.prototype.delayed = function () {
    console.error('Dom.delayed() is not implemented anymore.');
};

PicoDomEventInstance.prototype.pause = function () {
    console.error('Dom.pause() is not implemented anymore.');
};

PicoDomEventInstance.prototype.unpause = function () {
    console.error('Dom.unpause() is not implemented anymore.');
};

export const PicoDomEventPlugin = function () {

    Obj.each(Mix.class(PicoDomEventStatic), (fn, id) => {
        this[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomEventInstance), (fn, id) => {
        this.prototype[id] = fn;
    });

    // this.init.push(PicoDomEventInstance.constructor);

    return this;
}