// types/utility/data.d.ts

declare class Data {
    static data: any;
    static has(input: any): boolean;
    static set(input: any, value: any): void;
    static unset(input: any): void;
    static get(input: any, fallback?: any, forceSet?: boolean): any;
    static find(input: any, value: any, fallback?: any): any;
    static replace(input: any, value: any): void;
    static add(input: any, ...args: any[]): void;
    static remove(input: any, ...args: any[]): void;
}

export default Data;
