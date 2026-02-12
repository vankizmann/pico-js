import { Arr, Mix, Obj, Dom } from "#src/index.esm.js";

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
     * @returns {any|this} Value or instance
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
 * @returns {typeof import('#src/utils/Dom.js').PicoDom}
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