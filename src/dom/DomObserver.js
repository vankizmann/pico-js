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
    //
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