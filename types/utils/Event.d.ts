export class PicoEvent {
    static $events: any[];
    /**
     * Bind callback to event name
     *
     * @example Event.bind("x", cb) // => Event
     * @example Event.bind(["a","b"], cb) // => Event
     *
     * @param {any} event Event name(s)
     * @param {function} cb Event callback
     * @param {any} [options] Listener options
     * @param {boolean} [paused] Start paused
     * @returns {typeof PicoEvent} Event class
     */
    static bind(event: any, cb: Function, options?: any, paused?: boolean): typeof PicoEvent;
    /**
     * Unbind callback(s) from event
     *
     * @example Event.unbind("x") // => Event
     * @example Event.unbind(["a","b"]) // => Event
     *
     * @param {any} event Event name(s)
     * @param {any} [options] Listener options
     * @returns {typeof PicoEvent} Event class
     */
    static unbind(event: any, options?: any): typeof PicoEvent;
    /**
     * Fire event with arguments
     *
     * @example Event.fire("x", 1) // => Event
     *
     * @param {string} event Event name
     * @param {...any} [args] Event args
     * @returns {typeof PicoEvent} Event class
     */
    static fire(event: string, ...args?: any[]): typeof PicoEvent;
    /**
     * Pause listeners for event
     *
     * @example Event.pause("x") // => Event
     *
     * @param {any} event Event name(s)
     * @param {any} [options] Listener options
     * @returns {typeof PicoEvent} Event class
     */
    static pause(event: any, options?: any): typeof PicoEvent;
    /**
     * Unpause listeners for event
     *
     * @example Event.unpause("x") // => Event
     *
     * @param {any} event Event name(s)
     * @param {any} [options] Listener options
     * @returns {typeof PicoEvent} Event class
     */
    static unpause(event: any, options?: any): typeof PicoEvent;
}
export default PicoEvent;
