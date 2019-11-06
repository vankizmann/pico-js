import { Any, Dom } from "../index";
import DefaultElement from "./default";

export default class Resizer extends DefaultElement
{
    options = {
        selector: '.resizer__handle',
        resizeMode: 'horizontal',
        baseName: 'resizer',
        onResizeStart: () => {},
        onResizeEnd: () => {}
    };

    constructor(el, options) {
        super(); this.apply(el, options);
    }

    bind()
    {
        this.createResizer.apply(this);
    }

    unbind()
    {
        this.destroyResizer.apply(this);
    }

    createResizer()
    {
        Dom.find(this.el).addClass([
            this.options.baseName, this.getModeClass()
        ]);

        let resizer = Dom.find(this.el).find(this.options.selector);

        let unbindCallback = () => {

            Dom.find(document.body).removeClass([
                this.options.baseName, this.getModeClass()
            ]);

            Dom.find(document.body).off('mouseup',
                null, { _uid: this._uid });

            Dom.find(document.body).off('mousemove',
                null, { _uid: this._uid });

            Dom.find(document.body).off('selectstart',
                null, { _uid: this._uid });

            this.options.onResizeEnd.call(this, this.el);
        };

        resizer.on('mousedown', (event) => {

            if ( event.which !== 1 ) {
                return;
            }

            event.stopPropagation();
            event.preventDefault();

            Dom.find(document.body).on('selectstart',
                (event) => event.preventDefault(), { _uid: this._uid });

            Dom.find(document.body).on('mousemove',
                Any.throttle(this.resizeElement.bind(this), 10), { _uid: this._uid });

            Dom.find(document.body).on('mouseup',
                unbindCallback.bind(this), { _uid: this._uid });

            this.options.onResizeStart.apply(this, this.el);

        }, { _uid: this._uid });

        return this;
    }

    destroyResizer()
    {
        Dom.find(document.body).removeClass([
            this.options.baseName, this.getModeClass()
        ]);

        Dom.find(document.body).off('mousemove',
            { _uid: this._uid });

        Dom.find(document.body).off('selectstart',
            { _uid: this._uid });

        return this;
    }

    resizeElement(event)
    {
        let resizer = Dom.find(this.el).find(this.options.selector);

        if ( this.options.resizeMode === 'horizontal' ) {

            let width = event.clientX - Dom.find(this.el).offsetLeft() +
                Dom.find(this.el).scrollLeft() + (resizer.width() / 2);

            Dom.find(this.el).css({ width: width + 'px' });
        }

        if ( this.options.resizeMode === 'vertical' ) {

            let height = event.clientY - Dom.find(this.el).offsetTop() +
                Dom.find(this.el).scrollTop() + (resizer.height() / 2);

            Dom.find(this.el).css({ height: height + 'px' });
        }
    }

    getModeClass()
    {
        return this.options.baseName + '--' + this.options.resizeMode;
    }

}
