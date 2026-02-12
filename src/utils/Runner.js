import { Arr, Hash, Mix } from "#src/index.esm.js";

export class PicoRunner
{
    static $idler = {
        native: {}, debounce: {}, throttle: {}
    };

    static $timer = {
        date: 0, func: null
    };

    static $buffer = [];

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

    static frame(fn, ...args)
    {
        requestAnimationFrame(function() {
            fn(...args);
        });

        return this;
    }

    static async(fn, ...args)
    {
        setTimeout(() => {
            fn(...args);
        });

        return this;
    }

    static delay(fn, delay = 0, ...args)
    {
        let idler = setTimeout(() => {
            this.async(fn, ...args);
        }, delay);

        return () => clearTimeout(idler);
    }

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

    static framebuffer(cb, key, order = 1000)
    {
        return (e, ...args) => {

            Arr.replace(PicoRunner.$buffer, {
                key, cb, order, args: [e, ...args], active: true
            }, { key });

            (e.preventDefault(), PicoRunner.runFramebuffer());
        };
    }

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