import { Obj, Str, Any } from "../index.js";

export default class Route
{
    static routes = Obj.get(window, '_routes', {});

    static set (key, value)
    {
        this.routes[key] = value;
    }

    static get (key, values = null, params = null)
    {
        let route = key.match(/^https?:\/\//) ? key : this.routes[key] || key;

        Obj.each(values || {}, (value, key) => {
            route = route.replace(new RegExp('{' + key + '\\?*}', 'g'), value);
        });

        return route + (! Any.isEmpty(params) ? ('?' + Str.params(params)) : '');
    }

    static goto (key, values = null, params = null)
    {
        window.location.href = this.get(key, values, params);
    }

}
