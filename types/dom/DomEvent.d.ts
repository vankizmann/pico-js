/**
 * @memberof PicoDom
 */
export class PicoDomEventStatic {
    static events: any[];
}
/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomEventInstance {
    /**
     * Bind event listener
     *
     * @example Dom.bind(el, "click", cb)
     *
     * @param {Element} el Target element
     * @param {string} event Event name
     * @param {function} cb Callback fn
     * @param {string} [selector] Event selector
     * @param {boolean} [pause] Pause listener
     * @param {any} [options] Listener options
     * @returns {this} Current instance
     */
    bind(el: Element, event: string, cb: Function, selector?: string, pause?: boolean, options?: any): this;
    /**
     * Unbind event listener
     *
     * @example Dom.unbind(el, "click")
     *
     * @param {Element} el Target element
     * @param {string} event Event name
     * @param {string} [selector] Event selector
     * @param {any} [options] Listener options
     * @returns {this} Current instance
     */
    unbind(el: Element, event: string, selector?: string, options?: any): this;
    /**
     * Listen to event
     *
     * @example Dom.find("div").on("click", cb)
     *
     * @param {any} event Event name
     * @param {function} cb Callback fn
     * @param {any} [options] Listener options
     * @param {boolean} [pause] Pause listener
     * @param {string} [selector] Event selector
     * @returns {this} Current instance
     */
    on(event: any, cb: Function, options?: any, pause?: boolean, selector?: string): this;
    /**
     * Stop listening to event
     *
     * @example Dom.find("div").off("click")
     *
     * @param {any} event Event name
     * @param {string} [selector] Event selector
     * @param {any} [options] Listener options
     * @returns {this} Current instance
     */
    off(event: any, selector?: string, options?: any): this;
    /**
     * Listen to event once
     *
     * @example Dom.find("div").once("click", cb)
     *
     * @param {any} event Event name
     * @param {function} cb Callback fn
     * @param {any} [options] Listener options
     * @returns {this} Current instance
     */
    once(event: any, cb: Function, options?: any): this;
    /**
     * Listen to live event
     *
     * @example Dom.find("div").live("click", "span", cb)
     *
     * @param {any} event Event name
     * @param {string} selector Event selector
     * @param {function} cb Callback fn
     * @param {any} [options] Listener options
     * @param {boolean} [pause] Pause listener
     * @returns {this} Current instance
     */
    live(event: any, selector: string, cb: Function, options?: any, pause?: boolean): this;
    /**
     * Fire event on element
     *
     * @example Dom.find("div").fire("click")
     *
     * @param {string} event Event name
     * @returns {this} Current instance
     */
    fire(event: string): this;
    /**
     * @see PicoDom.once
     */
    one(...args: any[]): PicoDomEventInstance;
    delayed(): void;
    pause(): void;
    unpause(): void;
}
export function PicoDomEventPlugin(self: any): typeof import("#src/utils/Dom.js").PicoDom;
