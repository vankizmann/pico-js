import { Obj, UUID } from "../index.js";

export default class DefaultElement
{
    /**
     * Unique id
     */
    _uid = null;

    /**
     * Binded element
     */
    el = null;

    /**
     * Element default options
     */
    options = {};

    apply(el, options)
    {
        this._uid = UUID();

        // Assign element
        this.el = el;

        this.options = Obj.assign({}, this.options, options);
    }

    /**
     * Bind stuff
     */
    bind()
    {
        // Bind events.
    }

    /**
     * Unbind stuff
     */
    unbind()
    {
        // Unbind events.
    }

}
