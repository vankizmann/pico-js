import { Arr, Hash, Mix, Obj, Dom, Run } from "../index.esm.ts";
import { PicoDom, PicoDomInterface } from "../utils/Dom.ts";
import PicoDomFinder from "./DomFinder.js";
import PicoDomRectangle from "./DomRectangle.js";

export interface PicoDomEvent extends PicoDomInterface,
    PicoDomFinder,
    PicoDomRectangle
{
    //
}

/**
 * @memberof PicoDom
 */
export class PicoDomEvent
{
    /**
     * @type {any[]}
     */
    static $events : any[] = [];

    /**
     * Bind event listener
     *
     * @example Dom.bind(el, "click", cb)
     *
     * @param {any} el Target element
     * @param {string} event Event name
     * @param {function} cb Callback fn
     * @param {string} [selector] Event selector
     * @param {boolean} [pause] Pause listener
     * @param {any} [options] Listener options
     * @returns {PicoDom} Current instance
     */
    bind(el : any, event : string, cb : Function, selector : string = null, pause : boolean = false, options : any = {}) : PicoDom
    {
        if ( Mix.isPrim(options) ) {
            options = { id: options };
        }

        Dom.$events = Arr.append(Dom.$events, {
            el, event, cb, selector, pause, options
        });

        el.addEventListener(event, cb, options);

        return <PicoDom> <unknown> this;
    }

    /**
     * Unbind event listener
     *
     * @example Dom.unbind(el, "click")
     *
     * @param {any} el Target element
     * @param {string} event Event name
     * @param {string} [selector] Event selector
     * @param {any} [options] Listener options
     * @returns {PicoDom} Current instance
     */
    unbind(el : any, event : string, selector : string = null, options : any = {}) : PicoDom
    {
        if ( Mix.isPrim(options) ) {
            options = { id: options };
        }

        let indexes = Arr.filterIndex(Dom.$events, {
            el, event, selector, options
        });

        if ( indexes.length === 0 ) {
            return <PicoDom> <unknown> this;
        }

        let args = (val : any) => {
            return [event, val.cb, val.options];
        };

        Arr.each(indexes.reverse(), (index : any) => {
            el.removeEventListener(...args(Dom.$events[index]));
        });

        Arr.splices(Dom.$events, indexes);

        return <PicoDom> <unknown> this;
    }

    /**
     * Listen to event
     *
     * @example Dom.find("div").on("click", cb)
     *
     * @param {any} event Event name
     * @param {Function} cb Callback fn
     * @param {any} [options] Listener options
     * @param {boolean} [pause] Pause listener
     * @param {string} [selector] Event selector
     * @returns {PicoDom} Current instance
     */
    on(event : any, cb : Function, options : any = {}, pause : boolean = false, selector : string = null) : PicoDom
    {
        if ( Mix.isPrim(options) ) {
            options = { id: options };
        }

        const args = [
            cb, options, pause, selector
        ];

        if ( Mix.isArr(event) ) {
            // @ts-ignore
            return (Arr.each(event, (e : any) => this.on(e, ...args)), this);
        }

        let fn = (e : any) => {
            cb.call(e.target, e, e.target);
        };

        this.each((el : any) => {
            this.bind(el, event, fn, selector, pause, options);
        });

        return <PicoDom> <unknown> this;
    }

    /**
     * Stop listening to event
     *
     * @example Dom.find("div").off("click")
     *
     * @param {any} event Event name
     * @param {any} [selector] Event selector
     * @param {any} [options] Listener options
     * @returns {PicoDom} Current instance
     */
    off(event : any, selector : string = null, options : any = {}) : PicoDom
    {
        if ( Mix.isPrim(options) ) {
            options = { id: options };
        }

        const args = [
            selector, options
        ];

        if ( Mix.isArr(event) ) {
            // @ts-ignore
            return (Arr.each(event, (e : any) => this.off(e, ...args)), this);
        }

        if ( Mix.isObj(selector) ) {
            (options = selector, selector = null);
        }

        this.each((el : any) => {
            this.unbind(el, event, selector, options);
        });

        return <PicoDom> <unknown> this;
    }

    /**
     * Stop listening to event with specific options
     *
     * @example Dom.find("div").optoff({ id: "my-id" })
     *
     * @param {any} [options] Listener options
     * @returns {PicoDom} Current instance
     */
    optoff(options : any = {}) : PicoDom
    {
        Run.async(() => {
            Arr.filterRemove(Dom.$events, { options });
        });

        this.each((el : any) => {
            el && el.removeAllListeners();
        });

        return <PicoDom> <unknown> this;
    }

    /**
     * Listen to event once
     *
     * @example Dom.find("div").once("click", cb)
     *
     * @param {any} event Event name
     * @param {Function} cb Callback fn
     * @param {any} [options] Listener options
     * @returns {PicoDom} Current instance
     */
    once(event : any, cb : Function, options : any = {}) : PicoDom
    {
        options.id = Hash.make(24);

        this.on(event, (e) => {
            cb(e);
            this.off(event, options);
        }, options);

        return <PicoDom> <unknown> this;
    }

    /**
     * Listen to live event
     *
     * @example Dom.find("div").live("click", "span", cb)
     *
     * @param {any} event Event name
     * @param {string} selector Event selector
     * @param {Function} cb Callback fn
     * @param {any} [options] Listener options
     * @param {boolean} [pause] Pause listener
     * @returns {PicoDom} Current instance
     */
    live(event : any, selector : string, cb : Function, options : any = {}, pause : boolean = false) : PicoDom
    {
        let fn = function (event : any) {

            let target = Dom.getNodeEvent(selector, event);

            if ( target == null ) {
                return;
            }

            cb.call({}, event, target);
        };

        this.on(event, fn, options, pause, selector);

        return <PicoDom> <unknown> this;
    }

    /**
     * Fire event on element
     *
     * @example Dom.find("div").fire("click")
     *
     * @param {string} event Event name
     * @param {object} [detail] Event detail
     * @returns {PicoDom} Current instance
     */
    fire(event : string, detail : any = {}) : PicoDom
    {
        let callback = new CustomEvent(event, { detail });

        this.each((el : any) => {
            el.dispatchEvent(callback);
        });

        return <PicoDom> <unknown> this;
    }

    pointerdown(button : number = 1)
    {
        const rect = this.rect();

        const [x, y] = [
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
        ];

        const event = new PointerEvent('pointerdown', {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1,
            clientX: x, clientY: y
        });

        this.each((el : any) => {
            el.dispatchEvent(event);
        });

        return this;
    }

}

// @ts-ignore
PicoDomEvent.prototype.one = function (...args : Parameters<typeof PicoDomEvent.prototype.once>) {
    console.warn('Dom.one() is deprecated, use Dom.once() instead.');
    return this.once(...args);
};

// @ts-ignore
PicoDomEvent.prototype.delayed = function () {
    console.error('Dom.delayed() is not implemented anymore.');
};

// @ts-ignore
PicoDomEvent.prototype.pause = function () {
    console.error('Dom.pause() is not implemented anymore.');
};

// @ts-ignore
PicoDomEvent.prototype.unpause = function () {
    console.error('Dom.unpause() is not implemented anymore.');
};

export default PicoDomEvent;