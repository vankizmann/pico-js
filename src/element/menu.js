import { Dom } from "../index";

export class Menu
{
    el = null;

    options = {
        duration: 300,
        delay: 100,
        bindMode: 'hover',
        textSelector: null,
        navSelector: '> .js__dropdown',
        baseName: 'js__nav',
        openModifier: 'open',
        readyModifier: 'ready'
    };

    constructor(el, options)
    {
        this.el = el;
        this.options = $.extend({}, this.options, options);
    }

    bind()
    {
        $(this.el).find('> ul > li').map((index, el) => {
            this.bindEvent(index, el);
        });
    }

    bindEvent(index, el)
    {
        if ( $(el).find(this.options.navSelector).length === 0 ) {
            // returdwen;
        }

        if ( this.options.bindMode === 'hover' ) {
            this.bindHoverEvent(el);
        }

        if ( this.options.bindMode === 'click' ) {
            this.bindClickEvent(el);
        }

        $(el).addClass(this.options.baseName)
    }

    bindHoverEvent(el)
    {
        let timeout;

        $(el).on('mouseenter', async () => {
            timeout = setTimeout(() => {
                this.openNav(el);
            }, this.options.delay);
        });

        $(el).on('mouseleave', async () => {
            clearTimeout(timeout);
            this.closeNav(el);
        });
    }

    bindClickEvent(el)
    {
        let open = false;

        $(el).on('click', () => {

            if ( open === false ) {
                this.openNav(el);
                return open = true;
            }

            if ( open === true ) {
                this.closeNav(el);
                return open = false;
            }
        });

        $(document).on('click', '*', async (event) => {
            if ( ! $(event.target).is(el) && ! $(event.target).parents().is(el) ) {
                this.closeNav(el);
                open = false;
            }
        });
    }

    openNav(el)
    {
        let $nav = $(el).find(this.options.navSelector).eq(0);

        if ( $nav.length === 0 ) {

            $(el).clearQueue().delay(this.options.duration).queue(() => {
                $(el).addClass(this.getReadyClass())
            });

            $(el).addClass(this.getOpenClass());
        }

        let options = {
            duration: this.options.duration
        };

        if ( this.options.textSelector !== null ) {

            let $text = $(el).find(this.options.textSelector);

            $text.css({ display: 'block', width: 0 });

            let width = Dom.find($text.get(0)).realWidth({ display: 'inline-block' });

            $text.velocity('stop')
                .velocity({ width: width }, options);
        }

        options.complete = () => {
            $(el).addClass(this.getReadyClass());
        };

        let height = $nav.get(0) ? Dom.find($nav.get(0))
            .realHeight({ display: 'inline-block' }) : 0;

        if ( ! $(el).hasClass(this.getOpenClass()) ) {
            $nav.css({ display: 'block', height: 0 });
        }

        $nav.velocity('stop')
            .velocity({ opacity: 1, height: height }, options);

        $(el).addClass(this.getOpenClass());
    }

    closeNav(el)
    {
        let $nav = $(el).find(this.options.navSelector).eq(0);

        if ( $nav.length === 0 ) {

            $(el).clearQueue().delay(this.options.duration).queue(() => {
                $(el).removeClass(this.getOpenClass())
            });

            $(el).removeClass(this.getReadyClass());
        }

        let options = {
            duration: this.options.duration,
            delay: this.options.delay
        };

        if ( this.options.textSelector !== null ) {

            let $text = $(el).find(this.options.textSelector);

            options.complete = () => {
                $text.css({ display: 'none' });
            };

            $text.velocity('stop')
                .velocity({ width: 0 }, options);
        }

        options.begin = () => {
            $(el).removeClass(this.getReadyClass());
        };

        options.complete = () => {

            $(el).removeClass(this.getOpenClass());

            $nav.css({ display: 'none' });
        };

        $nav.velocity('stop')
            .velocity({ opacity: 0, height: 0 }, options);
    }

    getOpenClass()
    {
        return this.options.baseName + '--' + this.options.openModifier;
    }

    getReadyClass()
    {
        return this.options.baseName + '--' + this.options.readyModifier;
    }

}

export default Menu;
