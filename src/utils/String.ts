import { Arr, For, Locale, Mix, Now, Str } from "../index.esm.ts";

export class PicoString
{
    /**
     * Get character at index
     *
     * @example Str.get("abc", 1) // => "b"
     *
     * @param {any} value Input string
     * @param {number} index Char index
     * @returns {string} Single char
     */
    static get(value : any, index : number) : string
    {
        if ( !Mix.isStr(value) ) {
            value = Mix.str(value);
        }

        if ( Mix.isInt(index) ) {
            index = Mix.int(index);
        }

        return value.charAt(index);
    }

    /**
     * Replace substring at index
     *
     * @example Str.set("abc", 1, "X") // => "aXc"
     *
     * @param {any} value Input string
     * @param {any} index Start index
     * @param {string} [replace] Replace value
     * @returns {string} Updated string
     */
    static set(value : any, index : any, replace : string = '') : string
    {
        if ( !Mix.isStr(value) ) {
            value = Mix.str(value);
        }

        if ( Mix.isInt(index) ) {
            index = Mix.int(index);
        }

        return value.substring(0, index) + replace +
            value.substring(index + replace.length);
    }

    /**
     * Replace first occurrence
     *
     * @example Str.replace("abc", "X", "b") // => "aXc"
     *
     * @param {any} value Input string
     * @param {string} replace Replace value
     * @param {any} [search] Search value
     * @returns {string} Updated string
     */
    static replace(value : any, replace : string, search : any = null) : string
    {
        if ( Mix.isNull(search) ) {
            search = value;
        }

        let index = search.indexOf(replace);

        if ( index === -1 ) {
            return value;
        }

        return this.set(value, index, replace);
    }

    /**
     * Extract substring by range
     *
     * @example Str.extract("abc", "b") // => "b"
     *
     * @param {any} value Input string
     * @param {string} replace Search value
     * @param {any} [search] Match source
     * @returns {string|null} Extracted string
     */
    static extract(value : any, replace : string, search : any = null) : string
    {
        if ( Mix.isNull(search) ) {
            search = value;
        }

        let index : [number, number] = this.range(search, replace);

        if ( index === null ) {
            return null;
        }

        return this.slice(value, ...index);
    }

    /**
     * Match pattern in string
     *
     * @example Str.match("abc", /b/) // => ["b"]
     *
     * @param {any} value Input string
     * @param {RegExp|string} pattern Match pattern
     * @param {Function} [cb] Callback fn
     * @returns {any} Match result
     */
    static match(value : any, pattern : RegExp | string, cb : Function = null) : any
    {
        let result = Mix.str(value).match(pattern);

        if ( Mix.isEmpty(result) ) {
            return [];
        }

        return Mix.isFunc(cb) ? cb(result) : result;
    }

    /**
     * Escape regex characters
     *
     * @example Str.regex("a.b") // => "a\\.b"
     *
     * @param {any} value Input string
     * @returns {string} Escaped string
     */
    static regex(value : any) : string
    {
        return Mix.str(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Convert to uppercase
     *
     * @example Str.uc("abc") // => "ABC"
     *
     * @param {any} value Input string
     * @returns {string} Uppercase string
     */
    static uc(value : any) : string
    {
        return Mix.str(value).toUpperCase();
    }

    /**
     * @see PicoString.uc
     */
    static upper = PicoString.uc;

    /**
     * Uppercase first character
     *
     * @example Str.ucfirst("abc") // => "Abc"
     *
     * @param {any} value Input string
     * @returns {string} Updated string
     */
    static ucfirst(value : any) : string
    {
        return Mix.str(value).charAt(0).toUpperCase() + value.slice(1);
    }

    /**
     * Convert to lowercase
     *
     * @example Str.lc("ABC") // => "abc"
     *
     * @param {any} value Input string
     * @returns {string} Lowercase string
     */
    static lc(value : any) : string
    {
        return Mix.str(value).toLowerCase();
    }

    /**
     * @see PicoString.lc
     */
    static lower = PicoString.lc;

    /**
     * Lowercase first character
     *
     * @example Str.lcfirst("ABC") // => "aBC"
     *
     * @param {any} value Input string
     * @returns {string} Updated string
     */
    static lcfirst(value : any) : string
    {
        return Mix.str(value).charAt(0).toLowerCase() + value.slice(1);
    }

    /**
     * Convert to camelCase
     *
     * @example Str.cc("hello-world") // => "helloWorld"
     *
     * @param {any} value Input string
     * @returns {string} camelCase string
     */
    static cc(value : any) : string
    {
        let splits = Arr.each(For.slugify(value).split('-'), (v, i) => {
            return i ? this.ucfirst(v) : v;
        });

        return splits.join('');
    }

    /**
     * @see PicoString.cc
     */
    static camelcase = PicoString.cc;

    /**
     * Convert to kebab-case
     *
     * @example Str.kc("helloWorld") // => "hello-world"
     *
     * @param {any} value Input string
     * @returns {string} kebab-case string
     */
    static kc(value : any) : string
    {
        return For.slugify(value);
    }

    /**
     * @see PicoString.kc
     */
    static kebabcase = PicoString.kc;

    /**
     * Convert to snake_case
     *
     * @example Str.sc("helloWorld") // => "hello_world"
     *
     * @param {any} value Input string
     * @returns {string} snake_case string
     */
    static sc(value : any) : string
    {
        return For.slugify(value).replace('-', '_');
    }

    /**
     * @see PicoString.sc
     */
    static snakecase = PicoString.sc;

    /**
     * Convert to PascalCase
     *
     * @example Str.pc("hello-world") // => "HelloWorld"
     *
     * @param {any} value Input string
     * @returns {string} PascalCase string
     */
    static pc(value : any) : string
    {
        let splits = Arr.each(For.slugify(value).split('-'), (v) => {
            return this.ucfirst(v);
        });

        return splits.join('');
    }

    /**
     * @see PicoString.pc
     */
    static pascalcase = PicoString.pc;

    /**
     * Check if string contains value
     *
     * @example Str.has("abc", "b") // => true
     *
     * @param {any} value Input string
     * @param {any} search Search string
     * @returns {boolean} True if found
     */
    static has(value : any, search : any) : boolean
    {
        return this.lc(value).indexOf(this.lc(search)) !== -1;
    }

    /**
     * Get index range of search
     *
     * @example Str.range("abc", "b") // => [1, 2]
     *
     * @param {any} value Input string
     * @param {string} search Search string
     * @param {any} [fallback] Fallback value
     * @returns {number[]|any} Index range
     */
    static range(value : any, search : string, fallback : any = null) : number[] | any
    {
        let index = Mix.str(value).indexOf(search);

        if ( index === -1 ) {
            return fallback;
        }

        return [index, index + search.length];
    }

    /**
     * Extract substring by range
     *
     * @example Str.slice("abc", 1, 2) // => "b"
     *
     * @param {any} value Input string
     * @param {number} start Start index
     * @param {number} limit End index
     * @returns {string} Sliced string
     */
    static slice(value : any, start : number, limit : number) : string
    {
        return Mix.str(value).slice(start, limit);
    }

    /**
     * Get string representation
     *
     * @example Str.string("<b>a</b>") // => "a"
     *
     * @param {any} value Input value
     * @param {string} [empty] Empty fallback
     * @param {boolean} [html] Keep HTML
     * @returns {string} String value
     */
    static string(value : any, empty : string = '-', html : boolean = false) : string
    {
        if ( Mix.isEmpty(value) ) {
            return empty;
        }

        value = Mix.str(value);

        if ( html ) {
            return value;
        }

        return value.replace(/<[^>]*>?/gm, '');
    }

    /**
     * Get boolean representation
     *
     * @example Str.boolean(true) // => "Yes"
     *
     * @param {any} value Input value
     * @param {string} [yes] True string
     * @param {string} [no] False string
     * @param {string} [empty] Empty fallback
     * @returns {string} Boolean string
     */
    static boolean(value : any, yes : string = 'Yes', no : string = 'No', empty : string = '-') : string
    {
        if ( Mix.isEmpty(value) ) {
            return empty;
        }

        return Mix.bool(value) ? yes : no;
    }

    /**
     * Get formatted number
     *
     * @example Str.number(1234.56, 1) // => "1,234.6"
     *
     * @param {any} value Input value
     * @param {number} [fixed] Decimal points
     * @param {string} [locale] Locale code
     * @param {any} [config] Format config
     * @returns {string} Formatted string
     */
    static number(value : any, fixed : number = null, locale : string = null, config : any = {}) : string
    {
        if ( !Mix.isNum(value) ) {
            return Mix.str(value);
        }

        if ( locale == null ) {
            locale = Locale.code();
        }

        config = {
            maximumFractionDigits: 12, ...config
        };

        if ( fixed != null ) {
            config.minimumFractionDigits = fixed;
            config.maximumFractionDigits = fixed;
        }

        return Mix.num(value).toLocaleString(locale, config);
    }

    /**
     * Get formatted integer
     *
     * @example Str.integer(1, 2) // => "01"
     *
     * @param {any} value Input value
     * @param {number} [leading] Leading zeros
     * @param {string} [padding] Padding char
     * @returns {string|any} Formatted string
     */
    static integer(value : any, leading : number = 0, padding : string = '0') : string
    {
        if ( !Mix.isNum(value) ) {
            return Mix.str(value);
        }

        if ( !Mix.isInt(value) ) {
            value = Mix.int(value);
        }

        value = Mix.int(value);

        if ( !leading ) {
            return Mix.str(value);
        }

        return Mix.str(value).padStart(leading, padding);
    }

    /**
     * Get formatted datetime
     *
     * @example Str.datetime("2026-01-01", "DD.MM.YYYY")
     *
     * @param {any} value Input value
     * @param {string} [format] Output format
     * @param {string} [empty] Empty fallback
     * @returns {string} Formatted string
     */
    static datetime(value : any, format : string = 'YYYY-MM-DD HH:mm:ss', empty : string = '-') : string
    {
        if ( !Mix.isDate(value) ) {
            value = Now.make(value);
        }

        if ( !value.valid() ) {
            return empty;
        }

        return value.format(format);
    }

    /**
     * Get formatted date
     *
     * @example Str.date("2026-01-01", "DD.MM.YYYY")
     *
     * @param {any} value Input value
     * @param {string} [format] Output format
     * @param {string} [empty] Empty fallback
     * @returns {string} Formatted string
     */
    static date(value : any, format : string = 'YYYY-MM-DD', empty : string = '-') : string
    {
        return this.datetime(value, format, empty);
    }

    /**
     * Get formatted time
     *
     * @example Str.time("12:00:00", "HH:mm")
     *
     * @param {any} value Input value
     * @param {string} [format] Output format
     * @param {any} [empty] Empty fallback
     * @returns {string} Formatted string
     */
    static time(value : any, format : string = 'HH:mm:ss', empty : string = '-') : string
    {
        return this.datetime(value, format, empty);
    }

    /**
     * Parse string to object
     *
     * @example Str.objectify("a: 1;") // => { a: 1 }
     *
     * @param {any} value Input string
     * @param {string} [mode] Parse mode
     * @param {boolean} [toarray] Return array
     * @returns {any} Parsed value
     */
    static objectify(value : any, mode : string = 'options', toarray : boolean = false) : any
    {
        if ( Mix.isRef(value) ) {
            return value;
        }

        if ( mode === 'params' ) {
            value = For.parseParams(value);
        }

        if ( mode === 'options' ) {
            value = For.parseOptions(value);
        }

        if ( !Mix.isRef(value) ) {
            value = JSON.parse(value)
        }

        return toarray ? Mix.vals(value) : value;
    }

    /**
     * Cast object to string
     *
     * @example Str.stringify({ a: 1 }) // => "a: 1;"
     *
     * @param {any} value Input value
     * @param {string} [mode] Cast mode
     * @returns {string} Casted string
     */
    static stringify(value : any, mode : string = 'options') : string
    {
        if ( Mix.isStr(value) ) {
            return value;
        }

        if ( mode === 'params' ) {
            return For.castParams(value);
        }

        if ( mode === 'options' ) {
            return For.castOptions(value);
        }

        return JSON.stringify(value);
    }

}

/**
 * @deprecated use Str.regex instead
 */
// @ts-ignore
PicoString.regexEscape = (...args : Parameters<typeof Str.regex>) : any => {
    console.warn('Str.regexEscape() is deprecated, use Str.regex() instead.');
    return Str.regex(...args);
};

/**
 * @deprecated use Str.pc instead
 */
// @ts-ignore
PicoString.humancase = (...args : Parameters<typeof Str.pc>) : any => {
    console.warn('Str.humancase() is deprecated, use Str.pascalcase() instead.');
    return Str.pc(...args);
};

/**
 * @deprecated use For.slugify instead
 */
// @ts-ignore
PicoString.slugify = (...args : Parameters<typeof For.slugify>) : any => {
    console.warn('Str.slugify() is deprecated, use For.slugify() instead.');
    return For.slugify(...args);
};

/**
 * @deprecated use For.castOptions instead
 */
// @ts-ignore
PicoString.options = (...args : Parameters<typeof For.castOptions>) : any => {
    console.warn('Str.options() is deprecated, use For.castOptions() instead.');
    return For.castOptions(...args);
};

/**
 * @deprecated use For.parseOptions instead
 */
// @ts-ignore
PicoString.fromOptions = (...args : Parameters<typeof For.parseOptions>) : any => {
    console.warn('Str.fromOptions() is deprecated, use For.parseOptions() instead.');
    return For.parseOptions(...args);
};

/**
 * @deprecated use For.castParams instead
 */
// @ts-ignore
PicoString.params = (...args : Parameters<typeof For.castParams>) : any => {
    console.warn('Str.params() is deprecated, use For.castParams() instead.');
    return For.castParams(...args);
};

/**
 * @deprecated use For.parseParams instead
 */
// @ts-ignore
PicoString.fromParams = (...args : Parameters<typeof For.parseParams>) : any => {
    console.warn('Str.fromParams() is deprecated, use For.parseParams() instead.');
    return For.parseParams(...args);
};

/**
 * @deprecated use For.filesize instead
 */
// @ts-ignore
PicoString.filesize = (...args : Parameters<typeof For.filesize>) : any => {
    console.warn('Str.filesize() is deprecated, use For.filesize() instead.');
    return For.filesize(...args);
};

/**
 * @deprecated not implemented anymore
 */
// @ts-ignore
PicoString.real = () : void => {
    console.error('Str.real() is not implemented anymore.');
};

/**
 * @deprecated not implemented anymore
 */
// @ts-ignore
PicoString.array = () : void => {
    console.error('Str.array() is not implemented anymore.');
};

export default PicoString;