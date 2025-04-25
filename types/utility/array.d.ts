// types/utility/array.d.ts

declare class Arr {
    static make(count: number): number[];
    static all<T>(arr: T | T[]): T[];
    static get<T>(arr: T[], index: number, fallback?: T): T;
    static set<T>(arr: T[], index: number, value: T): T;
    static first<T>(arr: T[], fallback?: T): T;
    static second<T>(arr: T[], fallback?: T): T;
    static third<T>(arr: T[], fallback?: T): T;
    static last<T>(arr: T[], fallback?: T): T;
    static prepend<T>(arr: T[], val: T): T[];
    static append<T>(arr: T[], val: T): T[];
    static sort<T>(obj: AnyObject, key: string | ((a: T, b: T) => number)): T[];
    static sortString<T>(obj: AnyObject, key: string): T[];
    static filter<T>(arr: T[], filter: any): T[];
    static filterIndex(arr: any[], filter: any): number[];
    static find<T>(arr: T[], val: any, fallback?: T): T;
    static findIndex(arr: any[], val: any, fallback?: number): number;
    static has<T>(arr: T[], val: any): boolean;
    static add<T>(arr: T[], val: T, finder?: any): T[];
    static replace<T>(arr: T[], val: T, finder?: any): T[];
    static remove<T>(arr: T[], val: any): T[];
    static toggle<T>(arr: T[], val: T): T[];
    static removeIndex<T>(arr: T[], val: number): T[];
    static insert<T>(arr: T[], key: number, val: T): T[];
    static slice<T>(arr: T[], key: number, count?: number): T[];
    static splice<T>(arr: T[], key: number, count?: number): T[];
    static equal<T>(arr1: T[], arr2: T[]): boolean;
    static includes<T>(arr: T[], val: T): boolean;
    static contains<T>(arr: T[], val: T[]): boolean;
    static concat<T>(arr: T[], ...args: T[]): T[];
    static clone<T>(arr: T[]): T[];
    static merge<T>(arr: T[], ...args: T[]): T[];
    static push<T>(arr: T[], ...args: T[]): T[];
    static diff<T>(arr: T[], val: T[]): T[];
    static intersect<T>(...args: T[][]): T[];
    static chunk<T>(arr: T[], chunk?: number): T[][];
    static reduce<T, U>(arr: T[], callback: (accumulator: U, currentValue: T, currentIndex: number, array: T[]) => U, accumulator: U): U;
    static extract<T>(arr: T[], path: string): any[];
    static each<T>(arr: T[], callback: (val: T, key: number | string) => any): any[];
    static map<T>(arr: T[], callback: (val: T, key: number | string) => any): T[];
    static recursive<T>(arr: T[], key: string, callback: (val: any, cascade: any[]) => any, cascade?: any[]): T[];
}

export default Arr;