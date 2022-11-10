import Arr from "./array";
import Obj from "./object";
import Num from "./number";
import Any from "./any";

export class Str
{
    static regexEscape(val)
    {
        return String(val).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    static upper(val)
    {
        return String(val).toUpperCase();
    }

    static lower(val)
    {
        return String(val).toLowerCase();
    }

    static camelcase(val)
    {
        let slug = Str.slugify(val);

        let slugSplits = Arr.each(slug.split('-'), (split, index) => {

            if ( index === 0 ) {
                return split;
            }

            return Str.ucfirst(split);
        });

        return slugSplits.join('');
    }

    static humancase(val)
    {
        let slug = Str.slugify(val);

        let slugSplits = Arr.each(slug.split('-'), (split) => {
            return Str.ucfirst(split);
        });

        return slugSplits.join(' ');
    }

    static slugify(val)
    {
        val = String(val).replace(/^\s+|\s+$/g, '')
            .toLowerCase();

        let sources = [
            'à', 'á', 'â', 'è', 'é', 'ê', 'ì', 'í', 'ï', 'î', 'ò', 'ó', 'ô',
            'ù', 'ú', 'û', 'ñ', 'ç', '·', '/', '_', ',', ':', ';', 'ä', 'ö', 'ü'
        ];

        let targets = [
            'a', 'a', 'a', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'o', 'o', 'o',
            'u', 'u', 'u', 'n', 'c', '-', '-', '-', '-', '-', '-', 'ae', 'oe', 'ue'
        ];

        Arr.each(sources, (source, index) => {
            val = val.replace(new RegExp(source.charAt(source), 'g'), targets[index]);
        });

        return val.replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-').replace(/-+/g, '-');
    }

    static ucfirst(val)
    {
        return val.charAt(0).toUpperCase() + val.slice(1);
    }

    static lcfirst(val)
    {
        return val.charAt(0).toLowerCase() + val.slice(1);
    }

    static has(val, search)
    {
        return this.lower(val).indexOf(this.lower(search)) !== -1;
    }

    static filesize(val, decimals = 1)
    {
        let size = null;

        let units = [
            'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'
        ];

        Arr.each(units, (unit, count) => {

            let limit = Math.pow(1000, Any.integer(count));

            if ( val <= limit) {
                return;
            }

            size = Num.fixed(val / limit, decimals) + ' ' + unit;
        });

        return size;
    }

    static array(value, fallback = [])
    {
        value = value.replace(/^@\[(.*?)?\]$/, '$1');

        if ( Any.isEmpty(value) )  {
            return fallback;
        }

        return Arr.each(value.split(','), (val) => {
            return Str.real(val.replace(/(^"|^'|"$|'$)/g, ''));
        });
    }

    static real(value)
    {
        if ( typeof value === 'string' && value.match(/^@\[.*?\]$/) ) {
            value = Str.array(value);
        }

        if ( typeof value === 'string' && value.match(/^(null|undefined)$/i) ) {
            value = null;
        }

        if ( typeof value === 'string' && value.match(/^(true|false)$/i) ) {
            value = Any.bool(value);
        }

        if ( typeof value === 'string' && value.match(/^[0-9]+$/) ) {
            value = Num.int(value);
        }

        if ( typeof value === 'string' && value.match(/^[0-9]+\\.[0-9]+$/) ) {
            value = Num.float(value);
        }

        return value;
    }

    /**
     * Parse param string to object
     */
    static objectify(value, mode = 'options', isArray = false)
    {
        if ( Any.isObject(value) ) {
            return value;
        }

        if ( mode === 'params' ) {
            return Str.fromParams(value, isArray);
        }

        if ( mode === 'options' ) {
            return Str.fromOptions(value, isArray);
        }

        return JSON.parse(value);
    }

    /**
     * Parse param object to string
     */
    static stringify(value, mode = 'options')
    {
        if ( Any.isString(value) ) {
            return value;
        }
        if ( mode === 'params' ) {
            return Str.params(value);
        }

        if ( mode === 'options' ) {
            return Str.options(value);
        }

        return JSON.stringify(value);
    }

    /**
     * Parse object to string (e.g. foo:bar;test:lorem).
     */
    static options(params, quota = null)
    {
        if ( Any.isEmpty(params) ) {
            return '';
        }

        let result = [];

        Obj.each(params, (value, key) => {

            if ( quota !== null ) {
                key = quota + '.' + key;
            }

            if ( Any.isObject(value) ) {
                return result.push(Str.options(value, key).replace(/;$/, ''));
            }

            result.push(String(key) + ':' + String(value));
        });

        return result.join(';') + ';';
    }

    /**
     * Parse string to object (e.g. foo:bar;test:lorem).
     */
    static fromOptions(value, isArray = false)
    {
        if ( Any.isEmpty(value) ) {
            return {};
        }

        let regex = '(^|;)(\\s*(.*?)\\s*:\\s*' +
            '(".*?"|\'.*?\'|.*?)\\s*)(?=;|$)';

        let matches = value.match(new RegExp(regex, 'g'));

        let result = Arr.reduce(matches || [],
            this.convertFromOptions, {});

        if ( isArray ) {
            return Any.vals(result);
        }

        return result;
    }

    static convertFromOptions(result, match)
    {
        // Get key and value from match
        let attr = match.match(/^;?\s*(.*?)\s*:\s*(".*?"|'.*?'|.*?)\s*$/);

        // Skip if length does not match
        if ( attr.length !== 3 ) {
            return result;
        }

        let val = Str.real(attr[2].replace(/(^["']*|["']*$)/g, ''));

        Obj.set(result, attr[1], val);

        return result;
    }

    /**
     * Parse object to string (e.g. foo=bar&test=lorem).
     */
    static params(params, quota = null)
    {
        if ( Any.isEmpty(params) ) {
            return '';
        }

        let result = [];

        Obj.each(params, (value, key) => {

            if ( quota !== null ) {
                key = quota + '[' + key + ']';
            }

            if ( Any.isObject(value) ) {
                return result.push(Str.params(value, key));
            }

            result.push(String(key) + '=' + String(value));
        });

        return result.join('&');
    }

    /**
     * Parse string to object (e.g. foo=bar&test=lorem).
     */
    static fromParams(value, isArray = false)
    {
        if ( Any.isEmpty(value) ) {
            return {};
        }

        let regex = '(^|&)(\\s*(.*?)\\s*=\\s*' +
            '(".*?"|\'.*?\'|.*?)\\s*)(?=&|$)';

        let matches = value.match(new RegExp(regex, 'g'));

        let result = Arr.reduce(matches || [],
            this.convertFromParams, {});

        if ( isArray ) {
            return Any.vals(result);
        }

        return result
    }

    static convertFromParams(result, match) {

        // Get key and value from match
        let attr = match.match(/^&?\s*(.*?)\s*=\s*(".*?"|'.*?'|.*?)\s*$/);

        // Skip if length does not match
        if ( attr.length !== 3 ) {
            return result;
        }

        let key = attr[1].replace(/(\]\[|\[|\])/g, '.')
            .replace(/\.$/, '');

        let val = Str.real(attr[2].replace(/(^["']*|["']*$)/g, ''));

        Obj.set(result, key, val);

        return result;
    }

}

export default Str;
