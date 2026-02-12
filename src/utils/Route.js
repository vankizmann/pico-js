import { Arr, For, Locale, Mix, Obj } from "../index.esm.js";

export class PicoRoute
{

    static $routes = {};

    /**
     * Store route template by key
     *
     * @example Route.set("home", "/") // stores
     *
     * @param {string} key Route key
     * @param {string} value Route template
     * @returns {void} No return value
     */
    static set(key, value)
    {
        this.$routes[key] = value;
    }

    /**
     * Build route URL from template
     *
     * @example Route.get("home") // => "/"
     * @example Route.get("/u/:id", {id:1}) // => "/u/1"
     *
     * @param {string} key Route key or url
     * @param {any} [values] Token values
     * @param {any} [query] Query params
     * @returns {string} Built url
     */
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

    /**
     * Navigate to built route URL
     *
     * @example Route.goto("home")
     *
     * @param {string} key Route key or url
     * @param {any} [values] Token values
     * @param {any} [params] Query params
     * @returns {void} No return value
     */
    static goto(key, values = null, params = null)
    {
        window.location.href = this.get(key, values, params);
    }

}

export default PicoRoute;