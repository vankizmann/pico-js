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

    isParsable(value, format = 'YYYY-MM-DD HH:mm:ss')
    {
        for ( const key in NOW_PARSE ) {
            value = Str.replace(value, NOW_PARSE[key], format);
        }

        return value === format;
    }

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

    code(format = 'X')
    {
        return Mix.int(this.format(format));
    }

}

export const PicoNowFormatPlugin = function () {

    Obj.each(Mix.proto(PicoNowFormatInstance), (fn, id) => {
        this.prototype[id] = fn;
    });

    return this;
}