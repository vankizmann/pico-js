/**
 * Get global runtime scope
 *
 * @example go().Math // => Math
 *
 * @returns {any} Global scope obj
 */
export function go() {

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
export function browser() {

    const scope = go();

    if ( ! scope.navigator ) {
        return;
    }

    let [agent, result] = [
        scope.navigator.userAgent, {}
    ]

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
export function device() {

    const scope = go();

    if ( ! scope.navigator ) {
        return;
    }

    let [agent, result] = [
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