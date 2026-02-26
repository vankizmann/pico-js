import { Run, Dom, Hash } from "../index.esm.ts";
import { PicoDom, PicoDomInterface } from "../utils/Dom.ts";

export interface PicoDomGlobal extends PicoDomInterface
{
    //
}

/**
 * @memberof PicoDom
 */
export class PicoDomGlobal
{
    /**
     * Get document ready state
     *
     * @example Dom.getDomState() // => "complete"
     *
     * @returns {string} State string
     */
    static getDomState() : string
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
    static isDomReady() : boolean
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
    static isDomComplete() : boolean
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
     * @param {Function} cb Callback fn
     * @param {number} [delay] Execution delay
     * @param {number} [limit] Wait limit
     * @returns {PicoDom} Static class
     */
    static ready(cb : Function, delay : number = 0, limit : number = 6000) : PicoDom
    {
        let [id, el, event] = [
            Hash.make(), Dom.find(document), 'DOMContentLoaded'
        ];

        let fn = () => {
            (Run.delay(cb, delay), el.off(event, null, { id }));
        };

        let ready = Dom.isDomReady;

        if ( !ready() ) {
            // @ts-ignore
            return (el.on(event, fn, { id }), this);
        }

        Run.wait(() => {
            if ( ready() ) return (fn(), true);
        }, 10, limit);

        return <PicoDom> <unknown> this;
    }

    /**
     * Run callback when complete
     *
     * @example Dom.complete(cb)
     *
     * @param {Function} cb Callback fn
     * @param {number} [delay] Execution delay
     * @param {number} [limit] Wait limit
     * @returns {PicoDom} Static class
     */
    static complete(cb : Function, delay : number = 0, limit : number = 6000) : PicoDom
    {
        let fn = () => {
            Run.delay(cb, delay);
        };

        let [el, event] = [
            Dom.find(document), 'load'
        ];

        let ready = Dom.isDomComplete;

        if ( !ready() ) {
            // @ts-ignore
            return (el.on(event, fn), this);
        }

        Run.wait(() => {
            if ( ready() ) fn();
        }, 10, limit);

        return <PicoDom> <unknown> this;
    }

    /**
     * Check if node is complete
     *
     * @example Dom.find("img").isNodeComplete() // => true
     *
     * @returns {boolean} True if complete
     */
    isNodeComplete() : boolean
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

        return !!this.el.complete;
    }

    /**
     * Run callback when loaded
     *
     * @example Dom.find("img").loaded(cb)
     *
     * @param {Function} cb Callback fn
     * @param {number} [limit] Wait limit
     * @returns {PicoDom} Current instance
     */
    loaded(cb : Function, limit : number = 6000) : PicoDom
    {
        if ( !this.el ) {
            return <PicoDom> <unknown> this;
        }

        let ready = this.isNodeComplete;

        Run.wait(() => {
            if ( ready.call(this) ) return (cb(), true);
        }, 10, limit);

        return <PicoDom> <unknown> this;
    }
}

// @ts-ignore
PicoDomGlobal.required = () => {
    console.error('Dom.required() is not implemented anymore.');
}

export default PicoDomGlobal;