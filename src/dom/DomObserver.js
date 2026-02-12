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