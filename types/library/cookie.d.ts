// types/utility/cookie.d.ts

declare class Cookie {
    static pattern: string;
    static get(key: string, fallback?: any, decode?: 'string' | 'boolean' | 'float' | 'integer' | 'object' | 'array'): any;
    static set(key: string, value: any, expire?: number | null, options?: object): void;
    static forget(key: string, options?: object): void;
}

export default Cookie;
