export class PicoLocale {
    /**
     * Translation dictionary
     *
     * @type {Record<any, any>}
     */
    static $text: Record<any, any>;
    /**
     * Cached collator instance
     *
     * @type {Intl.Collator|null}
     */
    static $sort: Intl.Collator | null;
    /**
     * Active locale code
     *
     * @type {string}
     */
    static $code: string;
    /**
     * Check if translation key exists
     *
     * @example Locale.has("known.key") // => true
     * @example Locale.has("unknown.key") // => false
     *
     * @param {any} [key] Translation key
     * @returns {boolean} True if exists
     */
    static has(key?: any): boolean;
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
    static get(key?: any, fallback?: any): any;
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
    static set(key?: any, value?: any): any;
    /**
     * Get or set locale code
     *
     * @example Locale.code() // => "en"
     * @example Locale.code("de") // => "de"
     *
     * @param {string|null} [code] Locale code
     * @returns {string} Active code
     */
    static code(code?: string | null): string;
    /**
     * Get Intl.Collator for sorting
     *
     * @example Locale.collator().compare("a","b")
     *
     * @returns {Intl.Collator} Collator instance
     */
    static collator(): Intl.Collator;
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
    static replace(text: string, replace?: any): string;
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
    static trans(text: string, replace?: any): string;
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
    static choice(text: string, count?: number, replace?: any): string;
    /**
     * Pick plural variant from list
     *
     * @example Locale.countpick(["a","b"], 2) // => "b"
     *
     * @param {Array<string>} splits Variant list
     * @param {number} count Choice count
     * @returns {string} Picked text
     */
    static countpick(splits: Array<string>, count: number): string;
}
export default PicoLocale;
