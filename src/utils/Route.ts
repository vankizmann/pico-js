import { For, Mix, Obj } from "../index.esm.ts";

export class PicoRoute
{
    /**
     * @type {any}
     */
    static $routes : any = {};

    /**
     * Store route template by key
     *
     * @example Route.set("home", "/") // stores
     *
     * @param {string} key Route key
     * @param {string} value Route template
     * @returns {void} No return value
     */
    static set(key : string, value : string) : void
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
    static get(key : string, values : any = null, query : any = null) : string
    {
        let route = key;

        if ( !/^https?:\/\//.test(route) ) {
            route = this.$routes[key] || key
        }

        Obj.each(values, (val : any, key : any) => {
            route = route.replace(new RegExp('{' + key + '}', 'g'), val);
        });

        if ( !Mix.isEmpty(query) ) {
            route += '?' + For.castParams(query);
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
    static goto(key : string, values : any = null, params : any = null) : void
    {
        window.location.href = this.get(key, values, params);
    }

}

export default PicoRoute;