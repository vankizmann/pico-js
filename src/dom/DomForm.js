import { Arr, Mix, Obj, Dom } from "#src/index.esm.js";

/**
 * @memberof PicoDom
 */
export class PicoDomFormStatic
{

}

/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomFormInstance
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

export const PicoDomFormPlugin = function (self) {

    Obj.each(Mix.class(PicoDomFormStatic), (fn, id) => {
        self[id] = fn;
    });

    Obj.each(Mix.proto(PicoDomFormInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    // self.init.push(PicoDomFormInstance.constructor);

    return self;
}