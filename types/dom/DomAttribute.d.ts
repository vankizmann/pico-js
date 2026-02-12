/**
 * @memberof PicoDom
 */
export class PicoDomAttributeStatic {
}
/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomAttributeInstance {
    /**
     * Get or set attribute
     *
     * @example Dom.find("div").attr("id")
     *
     * @param {string} key Attr key
     * @param {any} [value] Attr value
     * @param {any} [fallback] Fallback value
     * @returns {any|this} Attr value or instance
     */
    attr(key: string, value?: any, fallback?: any): any | this;
    /**
     * Get or set data attribute
     *
     * @example Dom.find("div").data("id")
     *
     * @param {string} key Data key
     * @param {any} [value] Data value
     * @param {any} [fallback] Fallback value
     * @returns {any|this} Data value or instance
     */
    data(key: string, value?: any, fallback?: any): any | this;
    /**
     * Get computed style
     *
     * @example Dom.find("div").computed("width")
     *
     * @param {any} [key] Style key
     * @param {any} [fallback] Fallback value
     * @returns {any} Computed style
     */
    computed(key?: any, fallback?: any): any;
    /**
     * Get or set style
     *
     * @example Dom.find("div").style({ color: "red" })
     *
     * @param {any} [value] Style value
     * @param {boolean} [combine] Combine style
     * @returns {any|this} Style or instance
     */
    style(value?: any, combine?: boolean): any | this;
    /**
     * Get or set classes
     *
     * @example Dom.find("div").class(["active"])
     *
     * @param {any} [value] Class value
     * @param {boolean} [combine] Combine classes
     * @returns {any|this} Classes or instance
     */
    class(value?: any, combine?: boolean): any | this;
    /**
     * Get or set inner HTML
     *
     * @example Dom.find("div").html("<span></span>")
     *
     * @param {any} [html] HTML content
     * @returns {string|this} HTML or instance
     */
    html(html?: any): string | this;
    /**
     * Get actual style value
     *
     * @example Dom.find("div").actual((el) => el.offsetWidth, { display: "block" })
     *
     * @param {function} cb Callback fn
     * @param {any} [style] Temp style
     * @returns {any} Callback result
     */
    actual(cb: Function, style?: any): any;
    /**
     * Check if has class
     *
     * @example Dom.find("div").hasClass("active") // => true
     *
     * @param {any} cls Class name
     * @returns {boolean} True if has class
     */
    hasClass(cls: any): boolean;
    /**
     * Add class to element
     *
     * @example Dom.find("div").addClass("active")
     *
     * @param {any} cls Class name
     * @returns {this} Current instance
     */
    addClass(cls: any): this;
    /**
     * Remove class from element
     *
     * @example Dom.find("div").remClass("active")
     *
     * @param {any} cls Class name
     * @returns {this} Current instance
     */
    remClass(cls: any): this;
    /**
     * Toggle class on element
     *
     * @example Dom.find("div").toggleClass("active")
     *
     * @param {any} cls Class name
     * @returns {this} Current instance
     */
    toggleClass(cls: any): this;
    /**
     * Set class by state
     *
     * @example Dom.find("div").stateClass("active", true)
     *
     * @param {any} cls Class name
     * @param {boolean} [state] Target state
     * @returns {this} Current instance
     */
    stateClass(cls: any, state?: boolean): this;
    /**
     * @see PicoDom.style
     */
    css(...args: any[]): any;
    /**
     * @see PicoDom.remClass
     */
    removeClass(...args: any[]): PicoDomAttributeInstance;
}
export function PicoDomAttributePlugin(self: any): typeof import("#src/utils/Dom.js").PicoDom;
