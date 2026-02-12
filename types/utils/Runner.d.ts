export class PicoRunner {
    static $idler: {
        native: {};
        debounce: {};
        throttle: {};
    };
    static $timer: {
        date: number;
        func: any;
    };
    static $buffer: any[];
    /**
     * Run callback after delay (id)
     *
     * @example Run.timeout(() => {}, 100) // => "t-..."
     *
     * @param {function} fn Callback to run
     * @param {number} [delay] Delay ms
     * @param {string|null} [index] Timer id
     * @returns {string} Timer id
     */
    static timeout(fn: Function, delay?: number, index?: string | null): string;
    /**
     * Run callback on interval (id)
     *
     * @example Run.interval(() => {}, 250) // => "i-..."
     *
     * @param {function} fn Callback to run
     * @param {number} [intval] Interval ms
     * @param {string|null} [index] Timer id
     * @returns {string} Timer id
     */
    static interval(fn: Function, intval?: number, index?: string | null): string;
    /**
     * Clear timer(s) by id
     *
     * @example Run.clear("i-abc") // => Run
     * @example Run.clear(["t-a","i-b"]) // => Run
     *
     * @param {string|Array<string>} index Timer id(s)
     * @param {string} [scope] Idler scope key
     * @returns {typeof PicoRunner} Runner class
     */
    static clear(index: string | Array<string>, scope?: string): typeof PicoRunner;
    /**
     * Poll until callback is true
     *
     * @example Run.wait(() => ready, 50) // polls
     *
     * @param {function} fn Condition callback
     * @param {number} [intval] Poll interval ms
     * @param {number} [limit] Max poll count
     * @returns {void} No return value
     */
    static wait(fn: Function, intval?: number, limit?: number): void;
    /**
     * Run callback in next frame
     *
     * @example Run.frame(() => {}) // => Run
     *
     * @param {function} fn Callback to run
     * @param {...any} [args] Callback args
     * @returns {typeof PicoRunner} Runner class
     */
    static frame(fn: Function, ...args?: any[]): typeof PicoRunner;
    /**
     * Run callback async soon
     *
     * @example Run.async(() => {}) // => Run
     *
     * @param {function} fn Callback to run
     * @param {...any} [args] Callback args
     * @returns {typeof PicoRunner} Runner class
     */
    static async(fn: Function, ...args?: any[]): typeof PicoRunner;
    /**
     * Run callback after delay
     *
     * @example const cancel = Run.delay(() => {}, 50)
     *
     * @param {function} fn Callback to run
     * @param {number} [delay] Delay ms
     * @param {...any} [args] Callback args
     * @returns {function} Cancel function
     */
    static delay(fn: Function, delay?: number, ...args?: any[]): Function;
    /**
     * Create debounced callback
     *
     * @example const fn = Run.debounce(cb, 100)
     *
     * @param {function} cb Callback to run
     * @param {number} [timeout] Wait ms
     * @param {string|null} [index] Debounce id
     * @returns {function} Debounced fn
     */
    static debounce(cb: Function, timeout?: number, index?: string | null): Function;
    /**
     * Create throttled callback
     *
     * @example const fn = Run.throttle(cb, 100)
     *
     * @param {function} cb Callback to run
     * @param {number} [timeout] Wait ms
     * @param {string|null} [index] Throttle id
     * @returns {function} Throttled fn
     */
    static throttle(cb: Function, timeout?: number, index?: string | null): Function;
    /**
     * Create framerate-limited callback
     *
     * @example const fn = Run.framerate(cb, 30)
     *
     * @param {function} cb Callback to run
     * @param {number} [fps] Max frames per sec
     * @returns {function} Rate-limited fn
     */
    static framerate(cb: Function, fps?: number): Function;
    /**
     * Buffer events into single frame
     *
     * @example el.onwheel = Run.framebuffer(cb,"wheel")
     *
     * @param {function} cb Callback to run
     * @param {string} key Buffer key
     * @param {number} [order] Sort order
     * @returns {function} Buffered handler
     */
    static framebuffer(cb: Function, key: string, order?: number): Function;
    /**
     * Flush buffered frame events
     *
     * @example Run.runFramebuffer() // flush
     *
     * @returns {void} No return value
     */
    static runFramebuffer(): void;
}
export default PicoRunner;
