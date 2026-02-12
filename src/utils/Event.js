import { Str, Event, For, Mix, Arr } from "#src/index.esm.js";
export class PicoEvent
{
    static $events = [];

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