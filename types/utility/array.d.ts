// types/utility/array.d.ts

declare class Arr {
    static make(count: number): number[];
    static all(arr: any): any[];
    static get(arr: any[], index: number, fallback?: any): any;
    static set(arr: any[], index: number, value: any): any;
    static first(arr: any[], fallback?: any): any;
    static second(arr: any[], fallback?: any): any;
    static third(arr: any[], fallback?: any): any;
    static last(arr: any[], fallback?: any): any;
    static prepend(arr: any[], val: any): any[];
    static append(arr: any[], val: any): any[];
    static sort(obj: any, key: any): any[];
    static sortString(obj: any, key: any): any[];
    static filter(arr: any[], filter: any): any[];
    static filterIndex(arr: any[], filter: any): any[];
    static find(arr: any[], val: any, fallback?: any): any;
    static findIndex(arr: any[], val: any, fallback?: number): number;
    static has(arr: any[], val: any): boolean;
    static add(arr: any[], val: any, finder?: any): any[];
    static replace(arr: any[], val: any, finder?: any): any[];
    static remove(arr: any[], val: any): any[];
    static toggle(arr: any[], val: any): any[];
    static removeIndex(arr: any[], val: number): any[];
    static insert(arr: any[], key: number, val: any): any[];
    static slice(arr: any[], key: number, count?: number): any[];
    static splice(arr: any[], key: number, count?: number): any[];
    static equal(arr1: any[], arr2: any[]): boolean;
    static includes(arr: any[], val: any): boolean;
    static contains(arr: any[], val: any): boolean;
    static concat(arr: any[], ...args: any[]): any[];
    static clone(arr: any): any;
    static merge(arr: any[], ...args: any[]): any[];
    static push(arr: any[], ...args: any[]): any[];
    static diff(arr: any[], val: any[]): any[];
    static intersect(...args: any[][]): any[];
    static chunk(arr: any[], chunk?: number): any[][];
    static reduce(arr: any[], callback: Function, accumulator: any): any;
    static extract(arr: any[], path: string): any[];
    static each(arr: any[], callback: Function): any[];
    static map(arr: any[], callback: Function): any[];
    static recursive(arr: any, key: string, callback: Function, cascade?: any[]): any;
}

export default Arr;