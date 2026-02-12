import { Run, Mix, Obj, Dom } from "#src/index.esm.js";

/**
 * @memberof PicoDom
 */
export class PicoDomGlobalStatic
{
    static getDomState()
    {
        return document.readyState;
    }

    static isDomReady()
    {
        return Dom.getDomState() === 'complete';
    }

    static isDomComplete()
    {
        let state = Dom.getDomState();

        if ( state === 'complete' ) {
            return true;
        }

        return state === 'interactive';
    }

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

export const PicoDomGlobalPlugin = function () {

    Obj.each(Mix.class(PicoDomGlobalStatic), (fn, id) => {
        this[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomGlobalInstance), (fn, id) => {
        this.prototype[id] = fn;
    });

    // this.init.push(PicoDomGlobalInstance.constructor);

    return this;
}