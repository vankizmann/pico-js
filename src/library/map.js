import { Obj, Any, Ajax } from "../index";

export default class Map
{
    static apiKey = window.GMapKey || null;

    static set (key, value)
    {
        Ajax.handler().get('https://maps.googleapis.com/maps/api/geocode/outputFormat?')
    }

    static get (key, values = null, params = null)
    {
        let route = key.match(/^https?:\/\//) ? key : this.routes[key] || key;

        Obj.each(values || {}, (value, key) => {
            route = route.replace(new RegExp('{' + key + '\\?*}', 'g'), value);
        });

        return route + (! Any.isEmpty(params) ? ('?' + $.param(params)) : '');
    }

    static goto (key, values = null, params = null)
    {
        window.location.href = this.get(key, values, params);
    }

}
