// types/utility/element.d.ts

declare class Element {
    static prefix: string;
    static mount: string;
    static inis: object;
    static runs: any[];
    static invi: any[];

    static listen(): void;
    static scroll(): void;
    static alias(key: string, instance: any): typeof Element;
    static bind(key: string, selector: any, options?: object): typeof Element;
    static unbind(key: string, selector: any, options?: object): typeof Element;
    static observe(key: string, plain?: boolean): typeof Element;
    static bindInview(el: any, cb: Function): void;
    static unbindInview(el: any, cb: Function): void;
    static getPrefix(key: string): string;
    static setPrefix(prefix: string): void;
}

export default Element;
