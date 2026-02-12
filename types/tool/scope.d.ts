/**
 * Get global runtime scope
 *
 * @example go().Math // => Math
 *
 * @returns {any} Global scope obj
 */
export function go(): any;
/**
 * Detect browser from userAgent
 *
 * @example browser() // sets global flags
 *
 * @returns {void} No return value
 */
export function browser(): void;
/**
 * Detect device OS from userAgent
 *
 * @example device() // sets global flags
 *
 * @returns {void} No return value
 */
export function device(): void;
