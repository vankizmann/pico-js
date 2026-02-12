import { Str, Event, For, Mix, Arr } from "../index.esm.js";
export class PicoEvent
{
    static $events = [];

    /**
     * Bind callback to event name
     *
     * @example Event.bind("x", cb) // => Event
     * @example Event.bind(["a","b"], cb) // => Event
     *
     * @param {any} event Event name(s)
     * @param {function} cb Event callback
     * @param {any} [options] Listener options
     * @param {boolean} [paused] Start paused
     * @returns {typeof PicoEvent} Event class
     */
    static bind(event, cb, options = {}, paused = false)
    {
        if ( Mix.isArr(event) ) {
            return Arr.each(event, (e) => this.bind(e, ...arguments), this);
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
     * @param {any} event Event name(s)
     * @param {any} [options] Listener options
     * @returns {typeof PicoEvent} Event class
     */
    static unbind(event, options = {})
    {
        if ( Mix.isArr(event) ) {
            return Arr.each(event, (e) => this.unbind(e, ...arguments), this);
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
     * @returns {typeof PicoEvent} Event class
     */
    static fire(event, ...args)
    {
        let events = this.$events.filter((item) => {
            return item.event === event;
        });

        Arr.each(events, (e) => {
            if ( ! e.paused ) {
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
     * @param {any} event Event name(s)
     * @param {any} [options] Listener options
     * @returns {typeof PicoEvent} Event class
     */
    static pause(event, options = {})
    {
        if ( Mix.isArr(event) ) {
            return Arr.each(event, (e) => this.pause(e, ...arguments), this);
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
     * @param {any} event Event name(s)
     * @param {any} [options] Listener options
     * @returns {typeof PicoEvent} Event class
     */
    static unpause(event, options = {})
    {
        if ( Mix.isArr(event) ) {
            return Arr.each(event, (e) => this.pause(e, ...arguments), this);
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

export default PicoEvent;