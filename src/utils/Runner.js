import { Arr, Hash, Mix } from "../index.esm.js";

export class PicoRunner
{
    static $idler = {
        native: {}, debounce: {}, throttle: {}
    };

    static $timer = {
        date: 0, func: null
    };

    static $buffer = [];

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
    static timeout(fn, delay = 0, index = null)
    {
        let idler = PicoRunner.$idler.native;

        if ( index == null ) {
            index = Hash.make(12);
        }

        idler[(index = 't-' + index)] = setInterval(() => {
            fn();
        }, delay);

        return index;
    }

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
    static interval(fn, intval = 0, index = null)
    {
        let idler = PicoRunner.$idler.native;

        if ( index == null ) {
            index = Hash.make(12);
        }

        idler[(index = 'i-' + index)] = setInterval(() => {
            fn();
        }, intval);

        return index;
    }

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
    static clear(index, scope = 'native')
    {
        if ( Mix.isArr(index) ) {
            return (Arr.each(index, (e) => this.clear(e, scope)), this);
        }

        let idler = PicoRunner.$idler[scope];

        if ( /^i-/.test(index) === false ) {
            clearInterval(idler[index]);
        }

        if ( /^t-/.test(index) === false ) {
            clearTimeout(idler[index]);
        }

        return this;
    }

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
    static wait(fn, intval = 0, limit = 500)
    {
        let idler, timer;

        timer = this.timeout(() => {
            this.clear([idler, timer]);
        }, intval * limit);

        idler = this.interval(() => {
            if ( fn() ) this.clear([idler, timer]);
        }, intval);
    }

    /**
     * Run callback in next frame
     *
     * @example Run.frame(() => {}) // => Run
     *
     * @param {function} fn Callback to run
     * @param {...any} args Callback args
     * @returns {typeof PicoRunner} Runner class
     */
    static frame(fn, ...args)
    {
        requestAnimationFrame(function() {
            fn(...args);
        });

        return this;
    }

    /**
     * Run callback async soon
     *
     * @example Run.async(() => {}) // => Run
     *
     * @param {function} fn Callback to run
     * @param {...any} args Callback args
     * @returns {typeof PicoRunner} Runner class
     */
    static async(fn, ...args)
    {
        setTimeout(() => {
            fn(...args);
        });

        return this;
    }

    /**
     * Run callback after delay
     *
     * @example const cancel = Run.delay(() => {}, 50)
     *
     * @param {function} fn Callback to run
     * @param {number} [delay] Delay ms
     * @param {...any} args Callback args
     * @returns {function} Cancel function
     */
    static delay(fn, delay = 0, ...args)
    {
        let idler = setTimeout(() => {
            this.async(fn, ...args);
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
     * @param {string|null} [index] Debounce id
     * @returns {function} Debounced fn
     */
    static debounce(cb, timeout = 100, index = null)
    {
        let idler = PicoRunner.$idler.debounce;

        if ( index == null ) {
            index = Hash.make(12);
        }

        return (...args) => {

            if ( idler[index] ) {
                clearTimeout(idler[index]);
            }

            idler[index] = setTimeout(() => {
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
     * @param {string|null} [index] Throttle id
     * @returns {function} Throttled fn
     */
    static throttle(cb, timeout = 100, index = null)
    {
        let queued, idler = PicoRunner.$idler.throttle;

        if ( index == null ) {
            index = Hash.make(12);
        }

        return (...args) => {

            if ( idler[index] ) {
                clearTimeout(idler[index]);
            }

            idler[index] = setTimeout(() => {
                queued = false;
            }, timeout);

            if ( queued ) {
                return;
            }

            (this.frame(cb, ...args), queued = true)
        };
    }

    /**
     * Create framerate-limited callback
     *
     * @example const fn = Run.framerate(cb, 30)
     *
     * @param {function} cb Callback to run
     * @param {number} [fps] Max frames per sec
     * @returns {function} Rate-limited fn
     */
    static framerate(cb, fps = 30)
    {
        let last = 0;

        return (...args) => {

            if ( Date.now() - last <= (1000 / fps) ) {
                return;
            }

            (this.frame(cb, ...args), last = Date.now());
        };
    }

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
    static framebuffer(cb, key, order = 1000)
    {
        return (e, ...args) => {

            Arr.replace(PicoRunner.$buffer, {
                key, cb, order, args: [e, ...args], active: true
            }, { key });

            (e.preventDefault(), PicoRunner.runFramebuffer());
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
        if ( this.$timer.func ) {
            this.$timer.func();
        }

        this.$timer.func = this.delay(() => {
            this.runFramebuffer();
        }, 50);

        if ( Date.now() - this.$timer.date <= 50 ) {
            return;
        }

        if ( this.$timer.func ) {
            this.$timer.func();
        }

        this.$timer.date = Date.now();

        let buffer = Arr.filter(this.$buffer, {
            active: true
        });

        if ( buffer.length === 0 ) {
            return;
        }

        this.frame(() => {
            Arr.each(Arr.sort(buffer, 'order'), (item) => {
                item.cb(...item.args); item.active = false;
            });
        });
    }

}

export default PicoRunner;