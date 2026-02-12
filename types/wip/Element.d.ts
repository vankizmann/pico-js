export class PicoElement {
    /**
     * Prefix for attribute selector.
     */
    static prefix: string;
    /**
     * Mounted identifier.
     */
    static mount: string;
    /**
     * Instance storage.
     */
    static inis: {};
    /**
     * Runtime storage.
     */
    static runs: any[];
    /**
     * Instance storage.
     */
    static invi: any[];
    static listen(): void;
    static scroll(): void;
    /**
     * Bind a class on selector.
     */
    static alias(key: any, instance: any): typeof PicoElement;
    static bind(key: any, selector: any, options?: {}): void | typeof PicoElement;
    static unbind(key: any, selector: any, options?: {}): void | typeof PicoElement;
    /**
     * Bind callback on selector.
     */
    static observe(key: any, plain?: boolean): typeof PicoElement;
    static bindInview(el: any, cb: any): void;
    static unbindInview(el: any, cb: any): void;
    /**
     * Return prefix with key.
     */
    static getPrefix(key: any): string;
    /**
     * Set prefix to given value.
     */
    static setPrefix(prefix: any): void;
}
export default PicoElement;
