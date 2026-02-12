import { Arr, For, Locale, Mix, Obj } from "#src/index.esm.js";

export class PicoRoute
{

    static $routes = {};

    static set(key, value)
    {
        this.$routes[key] = value;
    }

    static get(key, values = null, query = null)
    {
        let route = key;

        if ( ! /^https?:\/\//.test(route) ) {
            route = this.$routes[key] || key
        }

        route = Locale.replace(route, values);

        if ( ! Mix.isEmpty(query) ) {
            route += '?' + For.castParams(values);
        }

        return route;
    }

    static goto(key, values = null, params = null)
    {
        window.location.href = this.get(key, values, params);
    }

}

export default PicoRoute;