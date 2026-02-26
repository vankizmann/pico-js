import { Str, Event, For, Mix, Arr } from "../index.esm.ts";

export class PicoSignal
{
    static $events = [];

    /**
     * Bind callback to event name
     *
     * @example Event.bind("x", cb) // => Event
     * @example Event.bind(["a","b"], cb) // => Event
     *
     * @param {string|string[]} event Event name(s)
     * @param {Function} cb Event callback
     * @param {any} [options] Listener options
     * @param {boolean} [paused] Start paused
     * @returns {PicoSignal} Event class
     */
    static bind(event : string | string[], cb : Function, options : any = {}, paused : boolean = false) : PicoSignal
    {
        const args : any[] = [
            cb, options, paused
        ];

        if ( Mix.isArr(event) ) {
            // @ts-ignore
            return Arr.each(event, (e : any) => this.bind(e, ...args), this);
        }

        if ( Mix.isPrim(options) ) {
            options = { id: options };
        }

        this.$events = Arr.append(this.$events, {
            event, cb, options, paused
        });

        return this;
    }

    /**
     * Unbind callback(s) from event
     *
     * @example Event.unbind("x") // => Event
     * @example Event.unbind(["a","b"]) // => Event
     *
     * @param {string|string[]} event Event name(s)
     * @param {any} [options] Listener options
     * @returns {PicoSignal} Event class
     */
    static unbind(event : string | string[], options : any = {}) : PicoSignal
    {
        const args : any[] = [
            options,
        ];

        if ( Mix.isArr(event) ) {
            return Arr.each(event, (e : any) => this.unbind(e, ...args), this);
        }

        if ( Mix.isPrim(options) ) {
            options = { id: options };
        }

        Arr.remove(this.$events, {
            event, options
        });

        return this;
    }

    /**
     * Fire event with arguments
     *
     * @example Event.fire("x", 1) // => Event
     *
     * @param {string} event Event name
     * @param {...any} args Event args
     * @returns {PicoSignal} Event class
     */
    static fire(event : string, ...args : Parameters<any>) : PicoSignal
    {
        let events = this.$events.filter((item) => {
            return item.event === event;
        });

        Arr.each(events, (e : any) => {
            if ( !e.paused ) {
                e.cb.call({}, ...args);
            }
        });

        return this;
    }

    /**
     * Pause listeners for event
     *
     * @example Event.pause("x") // => Event
     *
     * @param {string|string[]} event Event name(s)
     * @param {any} [options] Listener options
     * @returns {PicoSignal} Event class
     */
    static pause(event : string | string[], options : any = {}) : PicoSignal
    {
        const args : any[] = [
            options,
        ];

        if ( Mix.isArr(event) ) {
            return Arr.each(event, (e : any) => this.pause(e, ...args), this);
        }

        let value = Arr.find(this.$events, {
            event, options
        });

        if ( value != null ) {
            value.paused = true;
        }

        return this;
    }

    /**
     * Unpause listeners for event
     *
     * @example Event.unpause("x") // => Event
     *
     * @param {string|string[]} event Event name(s)
     * @param {any} [options] Listener options
     * @returns {PicoSignal} Event class
     */
    static unpause(event : string | string[], options : any = {}) : PicoSignal
    {
        if ( Mix.isArr(event) ) {
            return Arr.each(event, (e : any) => this.pause(e, ...arguments), this);
        }

        let value = Arr.find(this.$events, {
            event, options
        });

        if ( value != null ) {
            value.paused = false;
        }

        return this;
    }

}

export default PicoSignal;