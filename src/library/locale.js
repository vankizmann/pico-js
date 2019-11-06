import { Obj } from "../index";

export class Locale
{
    /**
     * Get locales from window if present.
     */
    static locales = Obj.get(window, '_locales', {});

    static pickByCount(splits, count)
    {
        let splitLength = splits.length;

        if ( splitLength === 3 && count === 0 ) {
            return splits[0];
        }

        if ( splitLength === 3 && count === 1 ) {
            return splits[1];
        }

        if ( splitLength === 3 && count >= 2 ) {
            return splits[2];
        }

        if ( splitLength === 2 && count === 1 ) {
            return splits[0];
        }

        if ( splitLength === 2 && count !== 1 ) {
            return splits[1];
        }

        return splits[0];
    }

    static has(key)
    {
        return Obj.has(Locale.locales, key);
    }

    static get(key, fallback = null)
    {
        return Obj.get(Locale.locales, key, fallback || key);
    }

    static set(key, value)
    {
        Obj.set(Locale.locales, key, value);

        return this;
    }

    static trans(key, values = {})
    {
        let message = Obj.get(Locale.locales, key, key);

        Obj.each(values, (value, key) => {
            message = message.replace(new RegExp(':' + key, 'g'), value);
        });

        return message;
    }

    static choice(key, count = 0, values = {})
    {
        let splits = Obj.get(Locale.locales, key, key).split('|');

        if ( typeof values.count === 'undefined' ) {
            values = Obj.assign({ count: count }, values);
        }

        let message = Locale.pickByCount(splits, count);

        Obj.each(values, (value, key) => {
            message = message.replace(new RegExp(':' + key, 'g'), value);
        });

        return message;
    }

}

export default Locale;
