import { Dom } from "../index.js";
import DefaultElement from "./default.js";

export default class Example extends DefaultElement
{
    options = {
        duration: 500,
        delay: 1000,
        baseName: 'ready',
        doneModifier: 'done'
    };

    constructor(el, options) {
        super(); this.apply(el, options);
    }

    bind()
    {
        if ( window.$ === undefined ) {
            return console.error('Element ready function requires jquery.')
        }

        Dom.ready(this.bindAnimation.bind(this), this.options.delay);
    }

    bindAnimation()
    {
        Dom.find(this.el).addClass(this.options.baseName);

        let options = {
            duration: this.options.duration
        };

        options.complete = () => {

            Dom.find(this.el).css({
                display: 'none'
            });

            Dom.find(this.el).addClass(
                this.getReadyClass()
            );

        };

        Dom.find(this.el).css({
            opacity: 1
        });

        $(this.el).animate({ opacity: 0 }, options);
    }

    getReadyClass()
    {
        return this.options.baseName + '--' + this.options.doneModifier;
    }

}
