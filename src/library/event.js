import { Arr, Any } from "../index";

export class Event
{
    static events = [];

    static bind(name, callback, options = {}, paused = false)
    {
        if ( Any.isArray(name) ) {
            return Arr.each(name, (val) =>
                this.bind(val, callback, options, paused));
        }

        if ( ! Any.isPlain(options) ) {
            options = { value: options }
        }

        this.events = Arr.push(this.events, {
            name, callback, options, paused
        });

        return this;
    }

    static unbind(name, options = {})
    {
        if ( Any.isArray(name) ) {
            return Arr.each(name, (val) => this.unbind(val, options));
        }

        if ( ! Any.isPlain(options) ) {
            options = { value: options }
        }

        Arr.remove(this.events, { name, options });

        return this;
    }

    static fire(name, ...args)
    {
        let events = this.events.filter((item) => {
            return item.name === name;
        });

        Arr.each(events, (event) => {
            if ( event.paused === false ) {
                event.callback.call({}, ...args);
            }
        });

        return this;
    }

    static pause(name, options = {})
    {
        if ( Any.isArray(name) ) {
            return Arr.each(name, (val) => this.pause(val, options));
        }

        let val = Arr.find(this.events, { name, options });

        if ( val === null ) {
            return;
        }

        val.paused = true;

        return this;
    }

    static unpause(name, options = {})
    {
        if ( Any.isArray(name) ) {
            return Arr.each(name, (val) => this.unpause(val, options));
        }

        let val = Arr.find(this.events, { name, options });

        if ( val === null ) {
            return;
        }

        val.paused = false;

        return this;
    }

}

export default Event;
