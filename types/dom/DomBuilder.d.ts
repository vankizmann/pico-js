/**
 * @memberof PicoDom
 */
export class PicoDomBuilderStatic {
    /**
     * Create element from tag
     *
     * @example Dom.make("div", { class: "active" })
     *
     * @param {any} el Tag or element
     * @param {any} [options] Attr options
     * @returns {PicoDom} Dom instance
     */
    static make(el: any, options?: any): PicoDom;
}
/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomBuilderInstance {
    /**
     * Prepend value to element
     *
     * @example Dom.find("div").prepend("<span></span>")
     *
     * @param {any} value Prepend value
     * @returns {this} Current instance
     */
    prepend(value: any): this;
    /**
     * Prepend element to value
     *
     * @example Dom.find("span").prependTo("div")
     *
     * @param {any} value Target element
     * @returns {this} Current instance
     */
    prependTo(value: any): this;
    /**
     * Append value to element
     *
     * @example Dom.find("div").append("<span></span>")
     *
     * @param {any} value Append value
     * @returns {this} Current instance
     */
    append(value: any): this;
    /**
     * Append element to value
     *
     * @example Dom.find("span").appendTo("div")
     *
     * @param {any} value Target element
     * @returns {this} Current instance
     */
    appendTo(value: any): this;
    /**
     * Replace element with value
     *
     * @example Dom.find("div").replace("<span></span>")
     *
     * @param {any} value Replacement value
     * @returns {this} Current instance
     */
    replace(value: any): this;
}
export function PicoDomBuilderPlugin(self: any): typeof import("#src/utils/Dom.js").PicoDom;
