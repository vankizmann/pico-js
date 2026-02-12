import { Mix, Obj, Locale } from "#src/index.esm.js";

export class PicoLocale
{
    /**
     * Translation dictionary
     *
     * @type {Record<any, any>}
     */
    static $text = {};

    /**
     * Cached collator instance
     *
     * @type {Intl.Collator|null}
     */
    static $sort = null;

    /**
     * Active locale code
     *
     * @type {string}
     */
    static $code = 'en';

    /**
     * Check if translation key exists
     *
     * @example Locale.has("known.key") // => true
     * @example Locale.has("unknown.key") // => false
     *
     * @param {any} [key] Translation key
     * @returns {boolean} True if exists
     */
    static has(key = undefined)
    {
        if ( key === undefined ) {
            return true;
        }

        return Mix.has(PicoLocale.$text, key);
    }

    /**
     * Get translation value or map
     *
     * @example Locale.get("known.key") // => "value"
     * @example Locale.get() // => object
     *
     * @param {any} [key] Translation key
     * @param {any} [fallback] Fallback value
     * @returns {any} Translation value
     */
    static get(key = undefined, fallback = null)
    {
        if ( key === undefined ) {
            return PicoLocale.$text;
        }

        return Obj.get(PicoLocale.$text, key, fallback);
    }

    /**
     * Set translation key or map
     *
     * @example Locale.set({foo:"bar"})
     * @example Locale.set("unknown", "nix")
     *
     * @param {any} [key] Key or map
     * @param {any} [value] Value to set
     * @returns {any} Updated map
     */
    static set(key = undefined, value = undefined)
    {
        if ( value === undefined ) {
            return PicoLocale.$text = key;
        }

        return Obj.set(PicoLocale.$text, key, value);
    }

    /**
     * Get or set locale code
     *
     * @example Locale.code() // => "en"
     * @example Locale.code("de") // => "de"
     *
     * @param {string|null} [code] Locale code
     * @returns {string} Active code
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
     * Get Intl.Collator for sorting
     *
     * @example Locale.collator().compare("a","b")
     *
     * @returns {Intl.Collator} Collator instance
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

    /**
     * Replace :tokens in text
     *
     * @example Locale.replace("Hi :x", {x:"Bob"}) // => "Hi Bob"
     * @example Locale.replace("Hi", null) // => "Hi"
     *
     * @param {string} text Input text
     * @param {any} [replace] Replace map
     * @returns {string} Replaced text
     */
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

    /**
     * Translate key with replace map
     *
     * @example Locale.trans("known.key") // => "..."
     * @example Locale.trans("Hi :x", {x:"Bob"}) // => "Hi Bob"
     *
     * @param {string} text Key or text
     * @param {any} [replace] Replace map
     * @returns {string} Translated text
     */
    static trans(text, replace = null)
    {
        text = Obj.get(PicoLocale.$text, text, text);

        return Locale.replace(text, replace);
    }

    /**
     * Translate plural choice by count
     *
     * @example Locale.choice("items", 2) // => "..."
     * @example Locale.choice("items", 1, {x:"y"}) // => "..."
     *
     * @param {string} text Key or text
     * @param {number} [count] Choice count
     * @param {any} [replace] Replace map
     * @returns {string} Chosen text
     */
    static choice(text, count = 0, replace = {})
    {
        text = Obj.get(PicoLocale.$text, text, text);

        if ( typeof replace.count === 'undefined' ) {
            replace.count = count;
        }

        text = Locale.countpick(text.split('|'), count);

        return Locale.replace(text, replace);
    }

    /**
     * Pick plural variant from list
     *
     * @example Locale.countpick(["a","b"], 2) // => "b"
     *
     * @param {Array<string>} splits Variant list
     * @param {number} count Choice count
     * @returns {string} Picked text
     */
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