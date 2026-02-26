import { Str, Obj, Dom, Mix, Arr } from "#src/index.esm.ts";

export class PicoElement
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
     * Instance storage.
     */
    static invi = [];

    /**
     * Listen to scroll events
     *
     * @example PicoElement.listen()
     *
     * @returns {void} No return value
     */
    static listen()
    {
        // Apply dom scroll event
        document.addEventListener("scroll", PicoElement.scroll);

        // Apply initial scroll event
        PicoElement.scroll();
    }

    /**
     * Handle scroll visibility
     *
     * @example PicoElement.scroll()
     *
     * @returns {void} No return value
     */
    static scroll()
    {
        Arr.each(this.invi, (item, index) => {

            if ( ! Dom.find(item.el).inviewY() ) {
                return;
            }

            Arr.unset(this.invi, index);

            item.cb();
        });
    }

    /**
     * Register element alias
     *
     * @example PicoElement.alias("tab", Tab)
     *
     * @param {string} key Alias key
     * @param {any} instance Class instance
     * @returns {PicoElement} Current class
     */
    static alias(key, instance)
    {
        Obj.set(this.inis, key, instance);

        return this;
    }

    /**
     * Bind element to selector
     *
     * @example PicoElement.bind("tab", ".tabs")
     *
     * @param {string} key Alias key
     * @param {any} selector Dom selector
     * @param {any} [options] Init options
     * @returns {PicoElement} Current class
     */
    static bind(key, selector, options = {})
    {
        let el = Dom.find(selector), prefix = this.getPrefix(key);

        // Add mounted class
        el.addClass(prefix);

        let instance = Obj.get(this.inis,
            key, null);

        if ( Mix.isEmpty(instance) ) {
            return console.error(`Element "${key}" is not defined.`);
        }

        let callback = (el, options) => {

            let cb = new instance(
                el.get(0), options
            );

            PicoElement.runs.push({
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

    /**
     * Unbind element from selector
     *
     * @example PicoElement.unbind("tab", ".tabs")
     *
     * @param {string} key Alias key
     * @param {any} selector Dom selector
     * @param {any} [options] Init options
     * @returns {PicoElement} Current class
     */
    static unbind(key, selector, options = {})
    {
        let el = Dom.find(selector), prefix = this.getPrefix(key);

        let instance = Obj.get(this.inis,
            key, null);

        if ( Mix.isEmpty(instance) ) {
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

        Arr.remove(PicoElement.runs, { el: el.get(0) });

        return this;
    }


    /**
     * Observe DOM changes
     *
     * @example PicoElement.observe("tab")
     *
     * @param {string} key Alias key
     * @param {boolean} [plain] Plain options
     * @returns {PicoElement} Current class
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

            let mounted = PicoElement.getPrefix(key);

            let deamons = Arr.filter(this.runs,
                { prefix: selector });

            Arr.each(deamons, ({ el }) => {

                let options = Str.objectify(
                    Dom.find(el).attr(selector)
                );

                if ( plain && Mix.isEmpty(options) ) {
                    options = { _plain: Dom.find(el).attr(selector) };
                }

                let inview = Obj.pluck(options, 'inview', false);

                if ( inview ) {
                    Arr.remove(this.invi, { el });
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

                if ( plain && Mix.isEmpty(options) ) {
                    options = { _plain: Dom.find(el).attr(selector) };
                }

                let inview = Obj.pluck(options, 'inview', false);

                let bindCb = () => {
                    this.bind(key, el, options);
                };

                inview ? this.bindInview(el, bindCb) : bindCb();
            });

        };

        Dom.find(document.body).observer(callback)
            (document.body, options);

        Dom.find(document.body).on('dom.change', callback);

        return this;
    }

    /**
     * Bind element on inview
     *
     * @example PicoElement.bindInview(el, cb)
     *
     * @param {Element} el Target element
     * @param {function} cb Callback fn
     * @returns {void} No return value
     */
    static bindInview(el, cb)
    {
        Arr.add(this.invi, { el, cb }, { el });
    }

    /**
     * Unbind element on inview
     *
     * @example PicoElement.unbindInview(el, cb)
     *
     * @param {Element} el Target element
     * @param {function} cb Callback fn
     * @returns {void} No return value
     */
    static unbindInview(el, cb)
    {
        Arr.remove(this.invi, { el, cb }, { el });
    }



    /**
     * Get attribute prefix
     *
     * @example PicoElement.getPrefix("tab") // => "js-tab"
     *
     * @param {string} [key] Alias key
     * @returns {string} Attribute prefix
     */
    static getPrefix(key)
    {
        return key ? this.prefix + '-' + key : this.prefix;
    }

    /**
     * Set attribute prefix
     *
     * @example PicoElement.setPrefix("pi")
     *
     * @param {string} prefix New prefix
     * @returns {void} No return value
     */
    static setPrefix(prefix)
    {
        this.prefix = prefix;
    }

}

export default PicoElement;
