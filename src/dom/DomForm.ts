import { PicoDomInterface } from "../utils/Dom.ts";
import PicoDomFinder from "./DomFinder.js";

export interface PicoDomForm extends PicoDomInterface,
    PicoDomFinder
{
    //
}

/**
 * @memberof PicoDom
 */
export class PicoDomForm
{
    /**
     * Get or set input value
     *
     * @example Dom.find("input").value("hello")
     *
     * @param {any} [value] Input value
     * @returns {any} Value or instance
     */
    value(value : any = undefined) : any
    {
        if ( value === undefined ) {
            return this.el.value;
        }

        this.each((el : any) => {
            el.value = value;
        });

        return this;
    }

}

export default PicoDomForm;