import { Dom } from "../index";

export default class Asset
{

    static error (link)
    {
        console.error('Error on loading: ' + link);
    }

    static load (link)
    {
        console.info('Done on loading: ' + link);
    }

    static script (link, load = null, error = null)
    {
        let el = Dom.make('script', {
            src: link, async: true
        });

        el.on('load', () => load ? load(link) :
            this.load(link));

        el.on('error', () => error ? error(link) :
            this.error(link));

        el.appendTo('head');

        return this;
    }

    static style (link, load = null, error = null)
    {
        let el = Dom.make('link', {
            href: link, rel: 'stylesheet'
        });

        el.on('load', () => load ? load(link) :
            this.load(link));

        el.on('error', () => error ? error(link) :
            this.error(link));

        el.appendTo('head');

        return this;
    }

}
