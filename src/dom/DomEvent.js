import { Arr, Hash, Mix, Obj, Dom, Run } from "../index.esm.js";
import { PicoDom } from "../utils/Dom.js";

/**
 * @memberof PicoDom
 */
export class PicoDomEventStatic
{
    static $events = [];
}

/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomEventInstance
{

    /**
     * Bind event listener
     *
     * @example Dom.bind(el, "click", cb)
     *
     * @param {Element} el Target element
     * @param {string} event Event name
     * @param {function} cb Callback fn
     * @param {string} [selector] Event selector
     * @param {boolean} [pause] Pause listener
     * @param {any} [options] Listener options
     * @returns {PicoDom} Current instance
     */
    bind(el, event, cb, selector = null, pause = false, options = {})
    {
        if ( Mix.isPrim(options) ) {
            options = { id: options };
        }

        Dom.$events = Arr.append(Dom.$events, {
            el, event, cb, selector, pause, options
        });

        el.addEventListener(event, cb, options);

        return this;
    }

    /**
     * Unbind event listener
     *
     * @example Dom.unbind(el, "click")
     *
     * @param {Element} el Target element
     * @param {string} event Event name
     * @param {string} [selector] Event selector
     * @param {any} [options] Listener options
     * @returns {PicoDom} Current instance
     */
    unbind(el, event, selector = null, options = {})
    {
        if ( Mix.isPrim(options) ) {
            options = { id: options };
        }

        let indexes = Arr.filterIndex(Dom.$events, {
            el, event, selector, options
        });

        if ( indexes.length === 0 ) {
            return;
        }

        let args = (val) => {
            return [event, val.cb, val.options];
        };

        Arr.each(indexes.reverse(), (index) => {
            el.removeEventListener(...args(Dom.$events[index]));
        });

        Arr.splices(Dom.$events, indexes);

        return this;
    }

    /**
     * Listen to event
     *
     * @example Dom.find("div").on("click", cb)
     *
     * @param {any} event Event name
     * @param {function} cb Callback fn
     * @param {any} [options] Listener options
     * @param {boolean} [pause] Pause listener
     * @param {string} [selector] Event selector
     * @returns {PicoDom} Current instance
     */
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

    /**
     * Stop listening to event
     *
     * @example Dom.find("div").off("click")
     *
     * @param {any} event Event name
     * @param {string} [selector] Event selector
     * @param {any} [options] Listener options
     * @returns {PicoDom} Current instance
     */
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

    /**
     * Stop listening to event with specific options
     *
     * @example Dom.find("div").optoff({ id: "my-id" })
     *
     * @param {any} [options] Listener options
     * @returns {PicoDom} Current instance
     */
    optoff(options = {})
    {
        Run.idle(() => {
            Arr.filterRemove(Dom.$events, { options });
        });

        this.each((el) => {
            el && el.removeAllListeners();
        });

        return this;
    }

    /**
     * Listen to event once
     *
     * @example Dom.find("div").once("click", cb)
     *
     * @param {any} event Event name
     * @param {function} cb Callback fn
     * @param {any} [options] Listener options
     * @returns {PicoDom} Current instance
     */
    once(event, cb, options = {})
    {
        options.id = Hash.make(24);

        this.on(event, (e) => {
            cb(e); this.off(event, options);
        }, options);

        return this;
    }

    /**
     * Listen to live event
     *
     * @example Dom.find("div").live("click", "span", cb)
     *
     * @param {any} event Event name
     * @param {string} selector Event selector
     * @param {function} cb Callback fn
     * @param {any} [options] Listener options
     * @param {boolean} [pause] Pause listener
     * @returns {PicoDom} Current instance
     */
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

    /**
     * Fire event on element
     *
     * @example Dom.find("div").fire("click")
     *
     * @param {string} event Event name
     * @returns {PicoDom} Current instance
     */
    fire(event)
    {
        let callback = new Event(event);

        this.each((el) => {
            el.dispatchEvent(callback);
        });

        return this;
    }

}

/**
 * @see PicoDom.once
 */
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

/**
 * @param {typeof PicoDom} self
 * @returns {typeof PicoDom}
 */
export const PicoDomEventPlugin = function (self) {

    Obj.each(Mix.class(PicoDomEventStatic), (fn, id) => {
        self[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomEventInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    // self.init.push(PicoDomEventInstance.constructor);

    return self;
}