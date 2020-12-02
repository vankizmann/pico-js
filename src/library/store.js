import { Arr, Obj, Any, UUID } from "../index";

export class Store
{
    static data = {};
    static getters = {};
    static listeners = {};
    static queue = [];

    static add(key, callback)
    {
        this.getters[key] = callback;
    }

    static has(key)
    {
        return typeof this.getters[key] !== 'undefined';
    }

    static refresh(key)
    {
        if ( Arr.has(this.queue, key) ) {
            return;
        }

        Arr.add(this.queue, key);

        Event.fire(`store/fetch:${key}`);

        this.getters[key]((data) => this.set(key, data));
    }

    static clear(key)
    {
        delete this.data[key];
    }

    static set(key, data)
    {
        Obj.each(this.listeners[key], (listener) => {
            listener(data);
        });

        this.data[key] = data;

        Event.fire(`store/fetched:${key}`);

        Arr.remove(this.queue, key);
    }

    static get(key, callback, ident = null)
    {
        if ( Any.isNull(ident) ) {
            ident = UUID();
        }

        if ( ! Obj.has(this.getters, key) ) {
            return console.error(`Store ${key} doesn't exist`);
        }

        Obj.set(this.listeners, [key, ident], callback);

        if ( Any.isEmpty(this.data, key) ) {
            this.refresh(key);
        }

        if ( ! Any.isEmpty(this.data, key) ) {
            callback(this.data[key]);
        }

        return ident;
    }

    static forget(key, ident)
    {
        Obj.unset(this.listeners, [key, ident]);
    }

}

export default Store;
