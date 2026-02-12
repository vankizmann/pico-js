import { Arr, Mix, Obj, Dom } from "../index.esm.js";
import { PicoDom } from "../utils/Dom.js";

/**
 * @memberof PicoDom
 */
export class PicoDomObserverStatic
{

}

/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomObserverInstance
{

    /**
     * Get or set element value
     *
     * @example Dom.find("input").value("hello")
     *
     * @param {any} [value] New value
     * @returns {any|PicoDom} Value or instance
     */
    value(value = undefined)
    {
        if ( value === undefined ) {
            return this.el.value;
        }

        this.each((el) => {
            el.value = value;
        });

        return this;
    }

}

/**
 * @param {typeof PicoDom} self
 * @returns {typeof PicoDom}
 */
export const PicoDomObserverPlugin = function (self) {

    Obj.each(Mix.class(PicoDomObserverStatic), (fn, id) => {
        self[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomObserverInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    // self.init.push(PicoDomObserverInstance.constructor);

    return self;
}