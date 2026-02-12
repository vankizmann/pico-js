/**
 * @memberof PicoDom
 */
export class PicoDomFormStatic {
}
/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomFormInstance {
    /**
     * Get or set input value
     *
     * @example Dom.find("input").value("hello")
     *
     * @param {any} [value] Input value
     * @returns {any|this} Value or instance
     */
    value(value?: any): any | this;
}
export function PicoDomFormPlugin(self: any): typeof import("#src/utils/Dom.js").PicoDom;
