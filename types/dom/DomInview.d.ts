/**
 * @memberof PicoDom
 */
export class PicoDomInviewStatic {
    /**
     * Get first inview element Y
     *
     * @example Dom.inviewMaxY(".item")
     *
     * @param {any} options Find options
     * @param {function} [cb] Success callback
     * @returns {any} Found element
     */
    static inviewMaxY(options: any, cb?: Function): any;
    /**
     * Get first inview element X
     *
     * @example Dom.inviewMaxX(".item")
     *
     * @param {any} options Find options
     * @param {function} [cb] Success callback
     * @returns {any} Found element
     */
    static inviewMaxX(options: any, cb?: Function): any;
}
/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomInviewInstance {
    /**
     * Get X view offset
     *
     * @example Dom.find("div").viewoffX()
     *
     * @returns {any} Offset object
     */
    viewoffX(): any;
    /**
     * Get X inview pixels
     *
     * @example Dom.find("div").inviewX()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Inview pixels
     */
    inviewX(boundry?: any): number;
    /**
     * Get X inview ratio
     *
     * @example Dom.find("div").inratioX()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Inview ratio
     */
    inratioX(boundry?: any): number;
    /**
     * Check if is inview X
     *
     * @example Dom.find("div").isInviewX(0.5)
     *
     * @param {number} [threshold] View threshold
     * @param {string} [mode] View mode
     * @param {any} [boundry] View boundry
     * @returns {boolean} True if inview
     */
    isInviewX(threshold?: number, mode?: string, boundry?: any): boolean;
    /**
     * Get Y view offset
     *
     * @example Dom.find("div").viewoffY()
     *
     * @returns {any} Offset object
     */
    viewoffY(): any;
    /**
     * Get Y inview pixels
     *
     * @example Dom.find("div").inviewY()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Inview pixels
     */
    inviewY(boundry?: any): number;
    /**
     * Get Y inview ratio
     *
     * @example Dom.find("div").inratioY()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Inview ratio
     */
    inratioY(boundry?: any): number;
    /**
     * Check if is inview Y
     *
     * @example Dom.find("div").isInviewY(0.5)
     *
     * @param {number} [threshold] View threshold
     * @param {string} [mode] View mode
     * @param {any} [boundry] View boundry
     * @returns {boolean} True if inview
     */
    isInviewY(threshold?: number, mode?: string, boundry?: any): boolean;
    /**
     * @see PicoDom.inviewY
     */
    inviewHeight(...args: any[]): number;
    /**
     * @see PicoDom.inviewX
     */
    inviewWidth(...args: any[]): number;
}
export function PicoDomInviewPlugin(self: any): typeof import("#src/utils/Dom.js").PicoDom;
