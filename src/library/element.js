import { Str, Obj, Dom, Any, Arr } from "../index";

export class Element
{
    /**
     * Prefix for attribute selector.
     */
    static prefix = 'js';

    /**
     * Mounted identifier.
     */
    static mount = 'mount';

    /**
     * Instance storage.
     */
    static inis = {};

    /**
     * Runtime storage.
     */
    static runs = [];

    /**
     * Bind a class on selector.
     */
    static alias(key, instance)
    {
        Obj.set(this.inis, key, instance);

        return this;
    }

    static bind(key, selector, options = {})
    {
        let el = Dom.find(selector), prefix = this.getPrefix(key);

        // Add mounted class
        el.addClass(prefix);

        let instance = Obj.get(this.inis,
            key, null);

        if ( Any.isEmpty(instance) ) {
            return console.error(`Element "${key}" is not defined.`);
        }

        let callback = (el, options) => {

            let cb = new instance(
                el.get(0), options
            );

            Element.runs.push({
                el: el.get(0), prefix: prefix, deamon: cb
            });

            el.data(prefix, cb);

            return cb.bind !== undefined ?
                cb.bind(el.get(0), options) : cb;
        };

        // Bind option
        Dom.ready(() => callback.call({}, el, options));

        return this;
    }

    static unbind(key, selector, options = {})
    {
        let el = Dom.find(selector), prefix = this.getPrefix(key);

        let instance = Obj.get(this.inis,
            key, null);

        if ( Any.isEmpty(instance) ) {
            return console.error(`Element "${key}" is not defined.`);
        }

        let callback = (el, options) => {

            let cb = el.data(prefix);

            if ( cb.unbind === undefined ) {
                return;
            }

            return cb.unbind(el.get(0), options);
        };

        // Unbind option
        callback.call({}, el, options);

        Arr.remove(Element.runs, { el: el.get(0) });

        return this;
    }


    /**
     * Bind callback on selector.
     */
    static observe(key, plain = false)
    {
        let selector = this.getPrefix(key);

        let options = {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [selector]
        };

        let callback = () => {

            let mounted = Element.getPrefix(key);

            let deamons = Arr.filter(this.runs,
                { prefix: selector });

            Arr.each(deamons, ({ el }) => {

                let options = Str.objectify(
                    Dom.find(el).attr(selector)
                );

                if ( plain && Any.isEmpty(options) ) {
                    options = { _plain: Dom.find(el).attr(selector) };
                }

                if ( document.body.contains(el) ) {
                    return;
                }

                return this.unbind(key, el, options)
            });

            Dom.find(`[${selector}]:not(.${mounted})`).each((el) => {

                let options = Str.objectify(
                    Dom.find(el).attr(selector)
                );

                if ( plain && Any.isEmpty(options) ) {
                    options = { _plain: Dom.find(el).attr(selector) };
                }

                this.bind(key, el, options);
            });

        };

        Dom.find(document.body).observer(callback)
            (document.body, options);

        Dom.find(document.body).on('dom.change', callback);

        return this;
    }



    /**
     * Return prefix with key.
     */
    static getPrefix(key)
    {
        return key ? this.prefix + '-' + key : this.prefix;
    }

    /**
     * Set prefix to given value.
     */
    static setPrefix(prefix)
    {
        this.prefix = prefix;
    }

}

export default Element;
