export class PicoElement {
    /**
     * Prefix for attribute selector.
     */
    static prefix: string;
    /**
     * Mounted identifier.
     */
    static mount: string;
    /**
     * Instance storage.
     */
    static inis: {};
    /**
     * Runtime storage.
     */
    static runs: any[];
    /**
     * Instance storage.
     */
    static invi: any[];
    /**
     * Listen to scroll events
     *
     * @example PicoElement.listen()
     *
     * @returns {void} No return value
     */
    static listen(): void;
    /**
     * Handle scroll visibility
     *
     * @example PicoElement.scroll()
     *
     * @returns {void} No return value
     */
    static scroll(): void;
    /**
     * Register element alias
     *
     * @example PicoElement.alias("tab", Tab)
     *
     * @param {string} key Alias key
     * @param {any} instance Class instance
     * @returns {this} Current class
     */
    static alias(key: string, instance: any): this;
    /**
     * Bind element to selector
     *
     * @example PicoElement.bind("tab", ".tabs")
     *
     * @param {string} key Alias key
     * @param {any} selector Dom selector
     * @param {any} [options] Init options
     * @returns {this} Current class
     */
    static bind(key: string, selector: any, options?: any): this;
    /**
     * Unbind element from selector
     *
     * @example PicoElement.unbind("tab", ".tabs")
     *
     * @param {string} key Alias key
     * @param {any} selector Dom selector
     * @param {any} [options] Init options
     * @returns {this} Current class
     */
    static unbind(key: string, selector: any, options?: any): this;
    /**
     * Observe DOM changes
     *
     * @example PicoElement.observe("tab")
     *
     * @param {string} key Alias key
     * @param {boolean} [plain] Plain options
     * @returns {this} Current class
     */
    static observe(key: string, plain?: boolean): this;
    /**
     * Bind element on inview
     *
     * @example PicoElement.bindInview(el, cb)
     *
     * @param {Element} el Target element
     * @param {function} cb Callback fn
     * @returns {void} No return value
     */
    static bindInview(el: Element, cb: Function): void;
    /**
     * Unbind element on inview
     *
     * @example PicoElement.unbindInview(el, cb)
     *
     * @param {Element} el Target element
     * @param {function} cb Callback fn
     * @returns {void} No return value
     */
    static unbindInview(el: Element, cb: Function): void;
    /**
     * Get attribute prefix
     *
     * @example PicoElement.getPrefix("tab") // => "js-tab"
     *
     * @param {string} [key] Alias key
     * @returns {string} Attribute prefix
     */
    static getPrefix(key?: string): string;
    /**
     * Set attribute prefix
     *
     * @example PicoElement.setPrefix("pi")
     *
     * @param {string} prefix New prefix
     * @returns {void} No return value
     */
    static setPrefix(prefix: string): void;
}
export default PicoElement;
