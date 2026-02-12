import { Mix, Obj, Locale } from "#src/index.esm.js";

export class PicoLocale
{
    /**
     * @var {Record<any, any>} $text
     */
    static $text = {};

    /**
     * @var {Intl.Collator|null} $sort
     */
    static $sort = null;

    /**
     * @var {string} $code
     */
    static $code = 'en';

    /**
     * Check if key exists in translations
     *
     * @example Locale.has('known.key') // => true
     * @example Locale.has('unkown.key') // => false
     *
     * @param {any} [key=undefined] Key to find in translations
     * @returns {boolean} Returns set state of key
     */
    static has(key = undefined)
    {
        if ( key === undefined ) {
            return true;
        }

        return Mix.has(PicoLocale.$text, key);
    }

    /**
     * Get key from translations or all
     *
     * @example Locale.get('known.key') // => 'value'
     * @example Locale.get('unkown.key', 'nix') // => 'nix'
     * @example Locale.get() // => PicoLocale.$text
     *
     * @param {any} [key=undefined] Key to get from translations
     * @param {any} [fallback=null] Fallback incase key does not exist
     * @returns {any} Returns value of key
     */
    static get(key = undefined, fallback = null)
    {
        if ( key === undefined ) {
            return PicoLocale.$text;
        }

        return Obj.get(PicoLocale.$text, key, fallback);
    }

    /**
     * Set key from translations or all
     *
     * @example Locale.set({ foo: 'bar' }) // => { foo: 'bar' }
     * @example Locale.set('unkown', 'nix') // => { 'unknown': 'nix' }
     *
     * @param {any} [key=undefined] Key or value if arg value is undefined
     * @param {any} [value=undefined] Value to set
     * @returns {any} Returns value of PicoLocale.$text
     */
    static set(key = undefined, value = undefined)
    {
        if ( value === undefined ) {
            return PicoLocale.$text = key;
        }

        return Obj.set(PicoLocale.$text, key, value);
    }

    /**
     * Get or set $code of session
     *
     * @example Locale.code() // => 'en'
     * @example Locale.code('de') // => 'de'
     *
     * @param {string|null} [code] The value to set
     * @returns {string} Return set code or current
     */
    static code(code = null)
    {
        if ( ! Mix.isNull(code) ) {
            return Locale.$code = code;
        }

        if ( ! Mix.isNull(Locale.$code) ) {
            return Locale.$code;
        }

        Locale.$code = (navigator.language || 'en-US')
            .replace(/-[A-Z]+$/, '');

        return Locale.$code;
    }

    /**
     * Get the existing Intl.Collator or return new one
     *
     * @example Locale.collator() // => Intl.Collator
     *
     * @returns {Intl.Collator} Return collator instance
     */
    static collator()
    {
        if ( ! Mix.isNull(Locale.$sort) ) {
            return Locale.$sort;
        }

        Locale.$sort = new Intl.Collator(Locale.code(), {
            numeric: true, sensitivity: 'base'
        });

        return Locale.$sort;
    }


    static replace(text, replace = null)
    {
        if ( replace == null ) {
            return text;
        }

        Obj.each(replace, (val, key) => {
            text = text.replace(new RegExp(':' + key, 'g'), val);
        });

        return text;
    }

    static trans(text, replace = null)
    {
        text = Obj.get(PicoLocale.$text, text, text);

        return Locale.replace(text, replace);
    }

    static choice(text, count = 0, replace = {})
    {
        text = Obj.get(PicoLocale.$text, text, text);

        if ( typeof replace.count === 'undefined' ) {
            replace.count = count;
        }

        text = Locale.countpick(text.split('|'), count);

        return Locale.replace(text, replace);
    }

    static countpick(splits, count)
    {
        let length = splits.length;

        if ( length === 3 && count === 0 ) {
            return splits[0];
        }

        if ( length === 3 && count === 1 ) {
            return splits[1];
        }

        if ( length === 3 && count >= 2 ) {
            return splits[2];
        }

        if ( length === 2 && count === 1 ) {
            return splits[0];
        }

        if ( length === 2 && count !== 1 ) {
            return splits[1];
        }

        return splits[0];
    }

}

export default PicoLocale