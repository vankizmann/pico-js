/**
 * @memberof PicoDom
 */
export class PicoDomMetaStatic {
    static $meta: {};
    /**
     * Set document title
     *
     * @example Dom.setMetaTitle("Home")
     *
     * @param {string} value New title
     * @param {string} [glue] Title glue
     * @returns {this} Static class
     */
    static setMetaTitle(value: string, glue?: string): this;
}
export namespace PicoDomMetaStatic {
    /**
     * @see PicoDom.setMetaTitle
     */
    function title(value: any): any;
}
/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomMetaInstance {
}
export function PicoDomMetaPlugin(self: any): typeof import("#src/utils/Dom.js").PicoDom;
