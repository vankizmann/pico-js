import { Dom } from "../index";
import DefaultElement from "./default";
import Velocity from "velocity-animate";

export default class Ready extends DefaultElement
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

        Velocity(this.el, { opacity: 0 }, options);
    }

    getReadyClass()
    {
        return this.options.baseName + '--' + this.options.doneModifier;
    }

}
