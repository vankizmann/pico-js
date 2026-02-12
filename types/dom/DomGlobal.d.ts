/**
 * @memberof PicoDom
 */
export class PicoDomGlobalStatic {
    /**
     * Get document ready state
     *
     * @example Dom.getDomState() // => "complete"
     *
     * @returns {string} State string
     */
    static getDomState(): string;
    /**
     * Check if DOM is ready
     *
     * @example Dom.isDomReady() // => true
     *
     * @returns {boolean} True if ready
     */
    static isDomReady(): boolean;
    /**
     * Check if DOM is complete
     *
     * @example Dom.isDomComplete() // => true
     *
     * @returns {boolean} True if complete
     */
    static isDomComplete(): boolean;
    /**
     * Run callback when ready
     *
     * @example Dom.ready(cb)
     *
     * @param {function} cb Callback fn
     * @param {number} [delay] Execution delay
     * @param {number} [limit] Wait limit
     * @returns {this} Static class
     */
    static ready(cb: Function, delay?: number, limit?: number): this;
    /**
     * Run callback when complete
     *
     * @example Dom.complete(cb)
     *
     * @param {function} cb Callback fn
     * @param {number} [delay] Execution delay
     * @param {number} [limit] Wait limit
     * @returns {this} Static class
     */
    static complete(cb: Function, delay?: number, limit?: number): this;
}
export namespace PicoDomGlobalStatic {
    function required(): void;
}
/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomGlobalInstance {
    /**
     * Check if node is complete
     *
     * @example Dom.find("img").isNodeComplete() // => true
     *
     * @returns {boolean} True if complete
     */
    isNodeComplete(): boolean;
    /**
     * Run callback when loaded
     *
     * @example Dom.find("img").loaded(cb)
     *
     * @param {function} cb Callback fn
     * @param {number} [limit] Wait limit
     * @returns {this} Current instance
     */
    loaded(cb: Function, limit?: number): this;
}
export function PicoDomGlobalPlugin(self: any): typeof import("#src/utils/Dom.js").PicoDom;
