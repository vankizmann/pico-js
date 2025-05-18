// types/utility/object.d.ts

declare class Obj {
    static has(obj: any, keys: any): boolean;
    static empty(obj: any, key: string): boolean;
    static get(obj: any, keys: any, fallback?: any): any;
    static set(obj: any, keys: any, val: any): any;
    static unset(obj: any, keys: any): any;
    static pluck(obj: any, keys: any, fallback?: any): any;
    static only(obj: any, keys: any, assign?: any): any;
    static except(obj: any, keys: any, assign?: any): any;
    static includes(obj: any, val: any): boolean;
    static matches(obj: any, val: any): boolean;
    static sort(obj: any, key: any): any[];
    static sortString(obj: any, key: any): any[];
    static filter(obj: any, filter: any): any;
    static filterIndex(obj: any, filter: any): any[];
    static find(arr: any, obj: any, fallback?: any): any;
    static findIndex(arr: any, obj: any, fallback?: number): any;
    static clone(obj: any): any;
    static assign(...args: any[]): any;
    static remove(obj: any, keys: any[]): any;
    static each(obj: any, callback: Function): any;
    static map(obj: any, callback: Function): any;
    static values(obj: any): any[];
    static flatten(obj: any): any;
}

export default Obj;
