import { Run, Mix, Obj, Dom } from "#src/index.esm.js";

/**
 * @memberof PicoDom
 */
export class PicoDomGlobalStatic
{
    /**
     * Get document ready state
     *
     * @example Dom.getDomState() // => "complete"
     *
     * @returns {string} State string
     */
    static getDomState()
    {
        return document.readyState;
    }

    /**
     * Check if DOM is ready
     *
     * @example Dom.isDomReady() // => true
     *
     * @returns {boolean} True if ready
     */
    static isDomReady()
    {
        return Dom.getDomState() === 'complete';
    }

    /**
     * Check if DOM is complete
     *
     * @example Dom.isDomComplete() // => true
     *
     * @returns {boolean} True if complete
     */
    static isDomComplete()
    {
        let state = Dom.getDomState();

        if ( state === 'complete' ) {
            return true;
        }

        return state === 'interactive';
    }

    /**
     * Run callback when ready
     *
     * @example Dom.ready(cb)
     *
     * @param {function} cb Callback fn
     * @param {number} [delay] Execution delay
     * @param {number} [limit] Wait limit
     * @returns {this} Static class
     */
    static ready(cb, delay = 0, limit = 6000)
    {
        let fn = () => {
            Run.delay(cb, delay);
        };

        let [el, event] = [
            Dom.find(document), 'DOMContentLoaded'
        ];

        let ready = Dom.isDomReady;

        if ( ! ready() ) {
            return (el.on(event, fn), this);
        }

        Run.wait(() => {
            if ( ready() ) return (fn(), true);
        }, 10, limit);

        return this;
    }

    /**
     * Run callback when complete
     *
     * @example Dom.complete(cb)
     *
     * @param {function} cb Callback fn
     * @param {number} [delay] Execution delay
     * @param {number} [limit] Wait limit
     * @returns {this} Static class
     */
    static complete(cb, delay = 0, limit = 6000)
    {
        let fn = () => {
            Run.delay(cb, delay);
        };

        let [el, event] = [
            Dom.find(document), 'load'
        ];

        let ready = Dom.isDomComplete;

        if ( ! ready() ) {
            return (el.on(event, fn), this);
        }

        Run.wait(() => {
            if ( ready() ) return (fn(), true);
        }, 10, limit);

        return this;
    }

}

PicoDomGlobalStatic.required = () => {
    console.error('Dom.required() is not implemented anymore.');
}

/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomGlobalInstance
{
    /**
     * Check if node is complete
     *
     * @example Dom.find("img").isNodeComplete() // => true
     *
     * @returns {boolean} True if complete
     */
    isNodeComplete()
    {
        if ( this.el == null ) {
            return false;
        }

        if ( this.el.naturalWidth ) {
            return true;
        }

        if ( this.el.naturalHeight ) {
            return true;
        }

        return !! this.el.complete;
    }

    /**
     * Run callback when loaded
     *
     * @example Dom.find("img").loaded(cb)
     *
     * @param {function} cb Callback fn
     * @param {number} [limit] Wait limit
     * @returns {this} Current instance
     */
    loaded(cb, limit = 6000)
    {
        if ( ! this.el ) {
            return this;
        }

        let ready = this.isNodeComplete;

        Run.wait(() => {
            if ( ready.call(this) ) return (cb(), true);
        }, 10, limit);

        return this;
    }
}

/**
 * @returns {typeof import('#src/utils/Dom.js').PicoDom}
 */
export const PicoDomGlobalPlugin = function (self) {

    Obj.each(Mix.class(PicoDomGlobalStatic), (fn, id) => {
        self[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomGlobalInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    // self.init.push(PicoDomGlobalInstance.constructor);

    return self;
}