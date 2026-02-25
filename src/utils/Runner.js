import { Arr, Mix, Obj } from "../index.esm.js";

export class PicoRunner
{
    static $idler = null;

    static $timer = 0;

    static $buffer = [];

    static interval(fn, intval = 0)
    {
        const idle = setInterval(() => {
            fn();
        }, intval);

        return () => clearInterval(idle);
    }

    /**
     * Clear timer or call function
     *
     * @example Run.clear(timer)
     *
     * @param {any} timer Timer ID, array of IDs, or function
     * @returns {typeof PicoRunner} Static class
     */
    static clear(timer)
    {
        if ( Mix.isArr(timer) ) {
            return Arr.each(timer, (t) => this.clear(t), this);
        }

        if ( Mix.isFunc(timer) ) {
            return (timer(), this);
        }

        clearTimeout(timer);
        clearInterval(timer);

        return this;
    }

    /**
     * Request idle callback with fallback
     *
     * @param {function} cb Callback function
     * @returns {typeof PicoRunner} Static class
     */
    static tryin(cb)
    {
        try {
            cb();
        } catch (e) {
            //
        }

        return this;
    }

    /**
     * Wait for condition to be true
     *
     * @example Run.wait(() => window.foo, 10, 100)
     *
     * @param {function} fn Condition function
     * @param {number} [intval] Interval ms
     * @param {number} [limit] Max iterations
     * @returns {function} Clear function
     */
    static wait(fn, intval = 0, limit = 500)
    {
        let idler, timer;

        timer = setTimeout(() => {
            this.clear([idler, timer]);
        }, intval * limit);

        idler = setInterval(() => {
            if ( fn() ) this.clear([timer, idler]);
        }, intval);

        return () => clearInterval(idler);
    }

    /**
     * Run function in next animation frame
     *
     * @example Run.frame(cb)
     *
     * @param {function} fn Callback function
     * @param {any} [options] Callback options
     * @returns {function} Noop clear function
     */
    static frame(fn, options = {})
    {
        const frame = requestAnimationFrame(() => {
            fn();
        });

        return () => cancelAnimationFrame(frame);
    }

    /**
     * Run function asynchronously
     *
     * @example Run.async(cb)
     *
     * @param {function} fn Callback function
     * @returns {function} Noop clear function
     */
    static async(fn)
    {
        const idle = setTimeout(() => {
            fn()
        });

        return () => clearTimeout(idle);
    }

    /**
     * Run function after delay
     *
     * @example Run.delay(cb, 100)
     *
     * @param {function} fn Callback function
     * @param {number} [delay] Delay ms
     * @returns {function} Clear function
     */
    static delay(fn, delay = 0)
    {
        let idler = setTimeout(() => {
            fn();
        }, delay);

        return () => clearTimeout(idler);
    }

    /**
     * Create debounced callback
     *
     * @example const fn = Run.debounce(cb, 100)
     *
     * @param {function} cb Callback to run
     * @param {number} [timeout] Wait ms
     * @returns {function} Debounced fn
     */
    static debounce(cb, timeout = 100)
    {
        let idler = null;

        return (...args) => {

            if ( idler ) {
                clearTimeout(idler);
            }

            idler = setTimeout(() => {
                this.frame(cb, ...args);
            }, timeout);
        };
    }

    /**
     * Create throttled callback
     *
     * @example const fn = Run.throttle(cb, 100)
     *
     * @param {function} cb Callback to run
     * @param {number} [timeout] Wait ms
     * @returns {function} Throttled fn
     */
    static throttle(cb, timeout = 100)
    {
        let queued, idler = null;

        return (...args) => {

            if ( idler ) {
                clearTimeout(idler);
            }

            idler = setTimeout(() => {
                queued = false;
            }, timeout);

            if ( queued ) {
                return;
            }

            (this.frame(cb, ...args), queued = true);
        };
    }

    /**
     * Create framerate-limited callback
     *
     * @example const fn = Run.framerate(cb, 30)
     *
     * @param {function} cb Callback to run
     * @param {number} [fps] Max frames per sec
     * @param {boolean} [finish] Finish last frame
     * @returns {function} Rate-limited fn
     */
    static framerate(cb, fps = 30, finish = true)
    {
        let timer, last = 0, hertz = 1000 / fps;

        const fn = (...args) => {

            clearTimeout(timer);

            if ( Date.now() - last <= hertz ) {
                return finish && (timer = setTimeout(fn, hertz + 1));
            }

            (this.frame(() => cb(...args)), last = Date.now());
        };

        return fn;
    }

    /**
     * Buffer events into single frame
     *
     * @example el.onwheel = Run.framebuffer(cb,"wheel")
     *
     * @param {function} cb Callback to run
     * @param {string} key Buffer key
     * @param {number} [priority] Sort priority
     * @returns {function} Buffered handler
     */
    static framebuffer(cb, key, priority = 1000)
    {
        const item = {
            key, cb, priority, args: [], active: false
        };

        Arr.add(this.$buffer, item);

        return (e, ...args) => {

            if ( /^drag/.test(e.type) ) {
                e.preventDefault();
            }

            Obj.assign(item, {
                args: [e, ...args], active: true
            });

            this.runFramebuffer();
        };
    }

    /**
     * Flush buffered frame events
     *
     * @example Run.runFramebuffer() // flush
     *
     * @returns {void} No return value
     */
    static runFramebuffer()
    {
        if ( this.$idler ) {
            clearTimeout(this.$idler);
        }

        this.$idler = setTimeout(() => {
            this.runFramebuffer();
        }, 50);

        if ( Date.now() - this.$timer < 50 ) {
            return;
        }

        if ( this.$idler ) {
            clearTimeout(this.$idler);
        }

        this.$timer = Date.now();

        let buffer = Arr.filter(this.$buffer, {
            active: true
        });

        if ( buffer.length === 0 ) {
            return;
        }

        buffer = Arr.sort(buffer, 'priority');

        Arr.each(buffer.reverse(), (item) => {
            item.cb(...item.args); item.active = false;
        });
    }

}

export default PicoRunner;