import { Arr, Mix } from "../index.esm.ts";

/**
 * Get global runtime scope
 *
 * @example go().Math // => Math
 *
 * @returns {any} Global scope obj
 */
export function go() : any
{

    if ( typeof globalThis !== 'undefined' ) {
        return globalThis;
    }

    if ( typeof window !== 'undefined' ) {
        return window;
    }

    if ( typeof global !== 'undefined' ) {
        return global;
    }

    return {};
}

/**
 * Detect browser from userAgent
 *
 * @example browser() // sets global flags
 *
 * @returns {void} No return value
 */
export function browser() : void
{
    const scope = go();

    if ( !scope.navigator ) {
        return;
    }

    let [agent, result] : [string, any] = [
        scope.navigator.userAgent, {}
    ];

    if ( result.safari == null ) {
        result.safari = /Safari\//.test(agent);
    }

    if ( result.firefox == null ) {
        result.firefox = /Firefox\//.test(agent);
    }

    if ( result.edge == null ) {
        result.edge = /Edge\//.test(agent);
    }

    if ( result.chrome == null ) {
        result.chrome = /Chrome\//.test(agent);
    }

    scope.piuag = result;
}

/**
 * Detect device OS from userAgent
 *
 * @example device() // sets global flags
 *
 * @returns {void} No return value
 */
export function device() : void
{
    const scope = go();

    if ( !scope.navigator ) {
        return;
    }

    let [agent, result] : [string, any] = [
        scope.navigator.userAgent, {}
    ]

    if ( result.win == null ) {
        result.win = /Windows/.test(agent);
    }

    if ( result.osx == null ) {
        result.osx = /Macintosh|Mac OS X/.test(agent);
    }

    if ( result.gnu == null ) {
        result.gnu = /Linux/.test(agent);
    }

    if ( result.ios == null ) {
        result.ios = /iPhone|iPad|iPod/.test(agent);
    }

    if ( result.oid == null ) {
        result.oid = /Android/.test(agent);
    }

    scope.piudv = result;
}

/**
 * Trait multiple classes
 *
 * @param {any[]} values Class array
 * @returns {any} Traited class
 */
export function trait(values : any[]) {

    const traited : any = values[0];

    Arr.each(values.slice(1), (value : any) => {

        Arr.each(Mix.class(value), (fn:any, key:string) => {
            traited[key] = fn
        });

        Arr.each(Mix.proto(value), (fn:any, key:string) => {
            traited.prototype[key] = fn
        });

        // Mix.extend(traited.prototype, value.prototype);
    });

    return traited;
}

export default {
    go,
    browser,
    device,
    trait,
};