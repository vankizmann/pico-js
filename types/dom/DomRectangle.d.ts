/**
 * @memberof PicoDom
 */
export class PicoDomRectangleStatic {
    /**
     * Cast value to number
     *
     * @example Dom.num("10px") // => 10
     *
     * @param {any} value Input value
     * @returns {number} Number value
     */
    static num(value: any): number;
}
/**
 * @memberof PicoDom
 * @extends {PicoDom}
 */
export class PicoDomRectangleInstance {
    /**
     * Get margin values
     *
     * @example Dom.find("div").margin()
     *
     * @param {string} [key] Margin key
     * @param {number} [fallback] Fallback value
     * @returns {any} Margin values
     */
    margin(key?: string, fallback?: number): any;
    /**
     * Get padding values
     *
     * @example Dom.find("div").padding()
     *
     * @param {string} [key] Padding key
     * @param {number} [fallback] Fallback value
     * @returns {any} Padding values
     */
    padding(key?: string, fallback?: number): any;
    /**
     * Get element height
     *
     * @example Dom.find("div").height() // => 100
     *
     * @returns {number} Height value
     */
    height(): number;
    /**
     * Get client height
     *
     * @example Dom.find("div").clientHeight()
     *
     * @returns {number} Height value
     */
    clientHeight(): number;
    /**
     * Get scroll height
     *
     * @example Dom.find("div").scrollHeight()
     *
     * @returns {number} Height value
     */
    scrollHeight(): number;
    /**
     * Get inner height
     *
     * @example Dom.find("div").innerHeight()
     *
     * @returns {number} Height value
     */
    innerHeight(): number;
    /**
     * Get real height
     *
     * @example Dom.find("div").realHeight({ display: "block" })
     *
     * @param {any} [style] Temp style
     * @returns {number} Height value
     */
    realHeight(style?: any): number;
    /**
     * Evaluate target height
     *
     * @example Dom.find("div").evaluateHeight(".container")
     *
     * @param {any} [target] Target element
     * @param {boolean} [apply] Apply style
     * @returns {number} Height value
     */
    evaluateHeight(target?: any, apply?: boolean): number;
    /**
     * Get element width
     *
     * @example Dom.find("div").width() // => 100
     *
     * @returns {number} Width value
     */
    width(): number;
    /**
     * Get client width
     *
     * @example Dom.find("div").clientWidth()
     *
     * @returns {number} Width value
     */
    clientWidth(): number;
    /**
     * Get scroll width
     *
     * @example Dom.find("div").scrollWidth()
     *
     * @returns {number} Width value
     */
    scrollWidth(): number;
    /**
     * Get inner width
     *
     * @example Dom.find("div").innerWidth()
     *
     * @returns {number} Width value
     */
    innerWidth(): number;
    /**
     * Get real width
     *
     * @example Dom.find("div").realWidth({ display: "block" })
     *
     * @param {any} [style] Temp style
     * @returns {number} Width value
     */
    realWidth(style?: any): number;
    /**
     * Evaluate target width
     *
     * @example Dom.find("div").evaluateWidth(".container")
     *
     * @param {any} [target] Target element
     * @param {boolean} [apply] Apply style
     * @returns {number} Width value
     */
    evaluateWidth(target?: any, apply?: boolean): number;
    /**
     * Get element offset
     *
     * @example Dom.find("div").offset()
     *
     * @param {string} [key] Offset key
     * @param {any} [boundry] View boundry
     * @returns {any} Offset values
     */
    offset(key?: string, boundry?: any): any;
    /**
     * Get top offset
     *
     * @example Dom.find("div").offsetTop()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Top offset
     */
    offsetTop(boundry?: any): number;
    /**
     * Get bottom offset
     *
     * @example Dom.find("div").offsetBottom()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Bottom offset
     */
    offsetBottom(boundry?: any): number;
    /**
     * Get left offset
     *
     * @example Dom.find("div").offsetLeft()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Left offset
     */
    offsetLeft(boundry?: any): number;
    /**
     * Get right offset
     *
     * @example Dom.find("div").offsetRight()
     *
     * @param {any} [boundry] View boundry
     * @returns {number} Right offset
     */
    offsetRight(boundry?: any): number;
    /**
     * Loop through offset parents
     *
     * @example Dom.find("div").loopOffset((el) => console.log(el))
     *
     * @param {function} cb Callback fn
     * @param {any} [boundry] Loop limit
     * @returns {this} Current instance
     */
    loopOffset(cb: Function, boundry?: any): this;
    /**
     * Calculate relative offset
     *
     * @example Dom.calcOffset(offset, 100, 100)
     *
     * @param {any} offset Base offset
     * @param {number} width Element width
     * @param {number} height Element height
     * @returns {any} Calculated offset
     */
    calcOffset(offset: any, width: number, height: number): any;
    /**
     * Get relative offset
     *
     * @example Dom.find("div").getOffset()
     *
     * @param {any} [boundry] View boundry
     * @returns {any} Offset values
     */
    getOffset(boundry?: any): any;
    /**
     * Get element scroll
     *
     * @example Dom.find("div").scroll()
     *
     * @param {any} [key] Scroll key
     * @param {any} [boundry] View boundry
     * @returns {any} Scroll values
     */
    scroll(key?: any, boundry?: any): any;
    /**
     * Get or set scroll top
     *
     * @example Dom.find("div").scrollTop(100)
     *
     * @param {any} [value] Scroll value
     * @param {any} [boundry] View boundry
     * @returns {number|this} Value or instance
     */
    scrollTop(value?: any, boundry?: any): number | this;
    /**
     * Get or set scroll left
     *
     * @example Dom.find("div").scrollLeft(100)
     *
     * @param {any} [value] Scroll value
     * @param {any} [boundry] View boundry
     * @returns {number|this} Value or instance
     */
    scrollLeft(value?: any, boundry?: any): number | this;
    /**
     * Get relative scroll
     *
     * @example Dom.find("div").getScroll()
     *
     * @param {any} [boundry] View boundry
     * @returns {any} Scroll values
     */
    getScroll(boundry?: any): any;
    /**
     * @see PicoDom.loopOffsetParent
     */
    loopOffsetParent(...args: any[]): PicoDomRectangleInstance;
    /**
     * @see PicoDom.scrollTopGlobal
     */
    scrollTopGlobal(): any;
    /**
     * @see PicoDom.scrollLeftGlobal
     */
    scrollLeftGlobal(): any;
}
export function PicoDomRectanglePlugin(self: any): typeof import("#src/utils/Dom.js").PicoDom;
