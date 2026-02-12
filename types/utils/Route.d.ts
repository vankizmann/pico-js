export class PicoRoute {
    static $routes: {};
    /**
     * Store route template by key
     *
     * @example Route.set("home", "/") // stores
     *
     * @param {string} key Route key
     * @param {string} value Route template
     * @returns {void} No return value
     */
    static set(key: string, value: string): void;
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
    static get(key: string, values?: any, query?: any): string;
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
    static goto(key: string, values?: any, params?: any): void;
}
export default PicoRoute;
