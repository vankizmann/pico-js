import { Arr, For, Locale, Mix, Now, Str } from "#src/index.esm.js";

export class PicoString
{
    static get(value, index)
    {
        if ( ! Mix.isStr(value) ) {
            value = Mix.str(value);
        }

        if ( Mix.isInt(index) ) {
            index = Mix.int(index);
        }

        return value.charAt(index);
    }

    static set(value, index, replace = '')
    {
        if ( ! Mix.isStr(value) ) {
            value = Mix.str(value);
        }

        if ( Mix.isInt(index) ) {
            index = Mix.int(index);
        }

        return value.substring(0, index) + replace +
            value.substring(index + replace.length);
    }

    static replace(value, replace, search = null)
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

    static extract(value, replace, search = null)
    {
        if ( Mix.isNull(search) ) {
            search = value;
        }

        let index = this.range(search, replace);

        if ( index === null ) {
            return null;
        }

        return this.slice(value, ...index);
    }

    /**
     *
     * @param {any} value
     * @param {RegExp|string} pattern
     * @param {function} [cb]
     * @returns {any}
     */
    static match(value, pattern, cb = null)
    {
        let result = Mix.str(value).match(pattern);

        if ( Mix.isEmpty(result) ) {
            return [];
        }

        return Mix.isFunc(cb) ? cb(result) : result;
    }

    static regex(val)
    {
        return Mix.str(val).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    static uc(value)
    {
        return Mix.str(value).toUpperCase();
    }

    /**
     * @see PicoString.uc
     */
    static upper = PicoString.uc;

    static ucfirst(value)
    {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    static lc(value)
    {
        return Mix.str(value).toLowerCase();
    }

    /**
     * @see PicoString.lc
     */
    static lower = PicoString.lc;

    static lcfirst(value)
    {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    static cc(value)
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

    static kc(value)
    {
        return For.slugify(value);
    }

    /**
     * @see PicoString.kc
     */
    static kebabcase = PicoString.kc;

    static sc(value)
    {
        return For.slugify(value).replace('-', '_');
    }

    /**
     * @see PicoString.sc
     */
    static snakecase = PicoString.sc;

    static pc(value)
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

    static has(value, search)
    {
        return this.lc(value).indexOf(this.lc(search)) !== -1;
    }

    static range(value, search, fallback = null)
    {
        let index = Mix.str(value).indexOf(search);

        if ( index === -1 ) {
            return fallback;
        }

        return [index, index + search.length];
    }

    static slice(value, start, limit)
    {
        return Mix.str(value).slice(start, limit);
    }

    static string(value, empty = '-', html = false)
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

    static boolean(value, yes = 'Yes', no = 'No', empty = '-')
    {
        if ( Mix.isEmpty(value) ) {
            return empty;
        }

        return Mix.bool(value) ? yes : no;
    }

    static number(value, fixed = null, locale = null, config = {})
    {
        if ( ! Mix.isNum(value) ) {
            return value;
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
     *
     * @param value
     * @param leading
     * @param padding
     * @returns {string|any}
     */
    static integer(value, leading = 0, padding = '0')
    {
        if ( ! Mix.isNum(value) ) {
            return value;
        }

        if ( ! Mix.isInt(value) ) {
            value = Mix.int(value);
        }

        value = Mix.int(value);

        if ( ! leading ) {
            return Mix.str(value);
        }

        return Mix.str(value).padStart(leading, padding);
    }

    static datetime(value, format = 'YYYY-MM-DD HH:mm:ss', empty = '-')
    {
        if ( ! Mix.isDate(value) ) {
            value = Now.make(value);
        }

        if ( ! value.valid() ) {
            return empty;
        }

        return value.format(format);
    }

    static date(value, format = 'YYYY-MM-DD', empty = '-')
    {
        return this.datetime(value, format, empty);
    }

    static time(value, format = 'HH:mm:ss', empty = '-')
    {
        return this.datetime(value, format, empty);
    }

    static objectify(value, mode = 'options', toarray = false)
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

        if ( ! Mix.isRef(value) ) {
            value = JSON.parse(value)
        }

        return toarray ? Mix.vals(value) : value;
    }

    static stringify(value, mode = 'options')
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

PicoString.regexEscape = (...args) => {
    console.warn('Str.regexEscape() is deprecated, use Str.regex() instead.');
    return Str.regex(...args);
};

PicoString.humancase = (...args) => {
    console.warn('Str.humancase() is deprecated, use Str.pascalcase() instead.');
    return Str.pascalcase(...args);
};

PicoString.slugify = (...args) => {
    console.warn('Str.slugify() is deprecated, use For.slugify() instead.');
    return For.slugify(...args);
};

PicoString.options = (...args) => {
    console.warn('Str.options() is deprecated, use For.castOptions() instead.');
    return For.castOptions(...args);
};

PicoString.fromOptions = (...args) => {
    console.warn('Str.fromOptions() is deprecated, use For.parseOptions() instead.');
    return For.parseOptions(...args);
};

PicoString.params = (...args) => {
    console.warn('Str.params() is deprecated, use For.castParams() instead.');
    return For.castParams(...args);
};

PicoString.fromParams = (...args) => {
    console.warn('Str.fromParams() is deprecated, use For.parseParams() instead.');
    return For.parseParams(...args);
};

PicoString.filesize = (...args) => {
    console.warn('Str.filesize() is deprecated, use For.filesize() instead.');
    return For.filesize(...args);
};

PicoString.real = () => {
    console.error('Str.real() is not implemented anymore.');
};

PicoString.array = () => {
    console.error('Str.array() is not implemented anymore.');
};

export default PicoString;