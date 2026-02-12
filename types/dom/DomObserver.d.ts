/**
 * @memberof PicoDom
 */
export class PicoDomObserverStatic {
}
/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomObserverInstance {
    /**
     * Get or set element value
     *
     * @example Dom.find("input").value("hello")
     *
     * @param {any} [value] New value
     * @returns {any|this} Value or instance
     */
    value(value?: any): any | this;
}
export function PicoDomObserverPlugin(self: any): typeof import("#src/utils/Dom.js").PicoDom;
