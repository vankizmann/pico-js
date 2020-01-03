import { Str, Obj, Dom, Any } from "../index";

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
     * Bind a class on selector.
     */
    static alias(key, instance)
    {
        Obj.set(this.inis, key, instance);

        return this;
    }

    static bind(key, selector, options = {})
    {
        let el = Dom.find(selector);

        // Add mounted class
        el.addClass(
            this.getPrefix(key)
        );

        let instance = Obj.get(this.inis, key, null);

        if ( Any.isEmpty(instance) ) {
            return console.error(`Element "${key}" is not defined.`);
        }

        let callback = (el, options) => {

            let cb = new instance(
                el.get(0), options
            );

            return cb.bind !== undefined ?
                cb.bind() : cb;
        };

        // Bind option
        Dom.ready(() => callback.call({}, el, options));

        return this;
    }

    static unbind()
    {
        let el = Dom.find(selector);

        // Add mounted class
        el.removeClass(
            this.getPrefix(key)
        );

        let instance = Obj.get(this.inis, key, null);

        if ( Any.isEmpty(instance) ) {
            return console.error(`Element "${key}" is not defined.`);
        }

        let callback = (el, options) =>
            new instance(el.get(0), options).unbind();

        // Bind option
        callback.call({}, el, {});

        return this;
    }

    /**
     * Bind callback on selector.
     */
    static observe(key)
    {
        let selector = this.getPrefix(key);

        let options = {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [selector]
        };

        Dom.find(document.body).observer(() => {

            let mounted = Element.getPrefix(key);

            Dom.find('[' + selector + ']:not(.' + mounted + ')').each((el) => {

                let options = Str.objectify(
                    Dom.find(el).attr(selector)
                );

                this.bind(key, el, options)
            });

        })(document.body, options);

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
