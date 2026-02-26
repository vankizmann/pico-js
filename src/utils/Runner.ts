import { Arr, Mix, Obj } from "../index.esm.ts";

export class PicoRunner
{
    /**
     * @type {any}
     */
    static $idler : any = null;

    /**
     * @type {number}
     */
    static $timer : number = 0;

    /**
     * @type {any[]}
     */
    static $buffer : any[] = [];

    /**
     * Run interval and return clear function
     *
     * @example Run.interval(cb, 100)
     *
     * @param {Function} fn Callback function
     * @param {number} [intval] Callback interval
     * @returns {Function} Noop clear function
     */
    static interval(fn : Function, intval : number = 0) : Function
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
     * @returns {PicoRunner} Static class
     */
    static clear(timer : any) : PicoRunner
    {
        if ( Mix.isArr(timer) ) {
            return Arr.each(timer, (t : any) => this.clear(t), this);
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
     * @param {Function} cb Callback function
     * @returns {PicoRunner} Static class
     */
    static tryin(cb : Function) : PicoRunner
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
     * @returns {Function} Clear function
     */
    static wait(fn : Function, intval : number = 0, limit : number = 500) : Function
    {
        let idler : any, timer : any;

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
     * @param {Function} fn Callback function
     * @returns {Function} Noop clear function
     */
    static frame(fn : Function) : Function
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
     * @param {Function} fn Callback function
     * @returns {Function} Noop clear function
     */
    static async(fn : Function) : Function
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
     * @param {Function} fn Callback function
     * @param {number} [delay] Delay ms
     * @returns {Function} Clear function
     */
    static delay(fn : Function, delay : number = 0) : Function
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
     * @param {Function} cb Callback to run
     * @param {number} [timeout] Wait ms
     * @returns {Function} Debounced fn
     */
    static debounce(cb : Function, timeout : number = 100) : Function
    {
        let idler = null;

        return (...args : any[]) => {

            if ( idler ) {
                clearTimeout(idler);
            }

            idler = setTimeout(() => {
                this.frame(() => cb(...args));
            }, timeout);
        };
    }

    /**
     * Create throttled callback
     *
     * @example const fn = Run.throttle(cb, 100)
     *
     * @param {Function} cb Callback to run
     * @param {number} [timeout] Wait ms
     * @returns {Function} Throttled fn
     */
    static throttle(cb : Function, timeout : number = 100) : Function
    {
        let queued : any, idler : any = null;

        return (...args : any[]) => {

            if ( idler ) {
                clearTimeout(idler);
            }

            idler = setTimeout(() => {
                queued = false;
            }, timeout);

            if ( queued ) {
                return;
            }

            (this.frame(() => cb(...args)), queued = true);
        };
    }

    /**
     * Create framerate-limited callback
     *
     * @example const fn = Run.framerate(cb, 30)
     *
     * @param {Function} cb Callback to run
     * @param {number} [fps] Max frames per sec
     * @param {boolean} [finish] Finish last frame
     * @returns {Function} Rate-limited fn
     */
    static framerate(cb : Function, fps : number = 30, finish : boolean = true) : Function
    {
        let timer : any, last = 0, hertz = 1000 / fps;

        const fn = (...args : any) => {

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
     * @param {Function} cb Callback to run
     * @param {string} key Buffer key
     * @param {number} [priority] Sort priority
     * @returns {Function} Buffered handler
     */
    static framebuffer(cb : Function, key : string, priority : number = 1000) : Function
    {
        const item = {
            key, cb, priority, args: [], active: false
        };

        Arr.add(this.$buffer, item);

        return (e : any, ...args : any) => {

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
    static runFramebuffer() : void
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

        Arr.each(buffer.reverse(), (item : any) => {
            item.cb(...item.args);
            item.active = false;
        });
    }

}

export default PicoRunner;