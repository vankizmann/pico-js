// types/utility/any.d.ts

declare class Any {
    static isEmpty(val: any): boolean;
    static isNull(val: any): boolean;
    static isEqual(obj: any, val: any): boolean;
    static isString(val: any): boolean;
    static isNumber(val: any): boolean;
    static isBool(val: any): boolean;
    static isFunction(val: any): boolean;
    static isObject(val: any): boolean;
    static isPlain(val: any): boolean;
    static isArray(val: any): boolean;
    static isDate(val: any): boolean;
    static string(val: any): string;
    static convertString(val: any, empty?: string): string;
    static number(val: any, fallback?: number): number;
    static integer(val: any): number;
    static float(val: any): number;
    static bool(val: any): boolean;
    static boolean(val: any): boolean;
    static convertBool(val: any, yes?: string, no?: string): string;
    static convertBoolean(val: any, yes?: string, no?: string): string;
    static convertDatetime(val: any, format?: string, empty?: string): string;
    static vals(obj: any): any[];
    static keys(obj: any): string[];
    static async(callback: Function, ...args: any[]): typeof Any;
    static delay(callback: Function, delay?: number, ...args: any[]): typeof Any;
    static debounce(callback: Function, delay?: number, ref?: any): Function;
    static throttle(callback: Function, delay?: number, ref?: any): Function;
    static framerate(callback: Function, rate?: number, ref?: any): Function;
    static form(obj: any): FormData;
}

export default Any;
