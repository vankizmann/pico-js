import { Arr, Locale, Mix, Num, Obj, Str } from "#src/index.esm.js";

export const NOW_FORMAT = {
    'L': 'DD/MM/YYYY',
    'LL': 'MMMM DD, YYYY',
    'LLL': 'MMMM DD, YYYY HH:mm',
    'LLLL': 'dddd, MMMM DD, YYYY HH:mm'
}

export const NOW_PARSE = {
    'second': 'ss',
    'minute': 'mm',
    'hour': 'HH',
    'date': 'DD',
    'month': 'MM',
    'year': 'YYYY'
};

/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowFormatInstance
{

    /**
     * Check if value matches format
     *
     * @example Now.isParsable("2026-01-01") // => true
     *
     * @param {string} value Test value
     * @param {string} [format] Date format
     * @returns {boolean} Is parsable
     */
    isParsable(value, format = 'YYYY-MM-DD HH:mm:ss')
    {
        for ( const key in NOW_PARSE ) {
            value = Str.replace(value, NOW_PARSE[key], format);
        }

        return value === format;
    }

    /**
     * Parse date from string
     *
     * @example Now.parse("2026-01-01") // => Now
     *
     * @param {any} value Input value
     * @param {string} [format] Input format
     * @returns {PicoNow} Current instance
     */
    parse(value, format = 'YYYY-MM-DD HH:mm:ss')
    {
        if ( Mix.isTime(value) ) {
            format = 'HH:mm:ss';
        }

        if ( Mix.isDate(value) ) {
            format = 'YYYY-MM-DD';
        }

        if ( this.isModifible(value) ) {
            return this.modify(value);
        }

        if ( ! Mix.isIsoDate(value) ) {
            return this.parseFormat(value, format);
        }

        this.value = new Date(value);

        return this;
    }

    /**
     * Parse date using format
     *
     * @example Now.parseFormat("01/01/2026", "DD/MM/YYYY")
     *
     * @param {string} value Input value
     * @param {string} format Input format
     * @returns {PicoNow} Current instance
     */
    parseFormat(value, format)
    {
        if ( !this.isParsable(value, format) ) {
            return (this.value = new Date(NaN), this);
        }

        for ( const key in NOW_PARSE ) {
            this.set(Str.extract(value, NOW_PARSE[key], format), key);
        }

        return this;
    }

    /**
     * Format date to string
     *
     * @example Now.format("YYYY-MM-DD") // => "2026-02-12"
     *
     * @param {string} [format] Output format
     * @returns {string} Formatted string
     */
    format(format = 'YYYY-MM-DD HH:mm:ss')
    {
        if ( Obj.has(NOW_FORMAT, format) ) {
            format = Locale.trans(NOW_FORMAT[format]);
        }

        format = format.replace('dddd', () => {
            return this.human('day');
        });

        format = format.replace('ddd', () => {
            return this.human('day', 3);
        });

        format = format.replace('dd', () => {
            return this.human('day', 2);
        });

        format = format.replace('MMMM', () => {
            return this.human('month');
        });

        format = format.replace('MMM', () => {
            return this.human('month', 3);
        });

        format = format.replace('YYYY', () => {
            return Str.integer(this.year(), 4);
        });

        format = format.replace('MM', () => {
            return Str.integer(this.month(), 2);
        });

        format = format.replace('DD', () => {
            return Str.integer(this.date(), 2);
        });

        format = format.replace('HH', () => {
            return Str.integer(this.hour(), 2);
        });

        format = format.replace('mm', () => {
            return Str.integer(this.minute(), 2);
        });

        format = format.replace('ss', () => {
            return Str.integer(this.second(), 2);
        });

        format = format.replace('YY', () => {
            return Str.integer(this.shortyear(), 2);
        });

        format = format.replace('X', () => {
            return Str.integer(this.time());
        });

        format = format.replace('x', () => {
            return Str.integer(this.time() / 1000);
        });

        return format;
    }

    /**
     * Format date as integer
     *
     * @example Now.code("YYYYMMDD") // => 20260212
     *
     * @param {string} [format] Output format
     * @returns {number} Formatted integer
     */
    code(format = 'X')
    {
        return Mix.int(this.format(format));
    }

}

/**
 * @returns {typeof import('#src/utils/Now.js').PicoNow}
 */
export const PicoNowFormatPlugin = function (self) {

    Obj.each(Mix.proto(PicoNowFormatInstance), (fn, id) => {
        self.prototype[id] = fn;
    });

    return self;
}