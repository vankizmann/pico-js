// types/utility/any.d.ts


import { Arr } from "./array";
import { Obj } from "./object";
import { Now } from "./now";

declare class Any {
    static isEmpty(val : any) : boolean;

    static isNull(val : any) : boolean;

    static isEqual(obj : any, val : any) : boolean;

    static isString(val : any) : boolean;

    static isNumber(val : any) : boolean;

    static isBool(val : any) : boolean;

    static isFunction(val : any) : boolean;

    static isObject(val : any) : boolean;

    static isPlain(val : any) : boolean;

    static isArray(val : any) : boolean;

    static isDate(val : any) : boolean;

    static string(val : any) : string;

    static convertString(val : any, empty? : string) : string;

    static integer(val : any) : number;

    static float(val : any) : number;

    static bool(val : any) : boolean;

    static boolean(val : any) : boolean;

    static convertBool(val : any, yes? : string, no? : string) : string;

    static convertBoolean(val : any, yes? : string, no? : string) : string;

    static convertDatetime(val : any, format? : string, empty? : string) : string;

    static vals(obj : any) : any[];

    static keys(obj : any) : string[];

    static async(callback : (...args : any[]) => void, ...args : any[]) : Any;

    static delay(callback : (...args : any[]) => void, delay? : number, ...args : any[]) : Any;

    static debounce(callback : (...args : any[]) => void, delay? : number, ref? : any) : (...args : any[]) => void;

    static throttle(callback : (...args : any[]) => void, delay? : number, ref? : any) : (...args : any[]) => void;

    static framerate(callback : (...args : any[]) => void, rate? : number, ref? : any) : (...args : any[]) => void;

    static form(obj : any) : FormData;
}

export default Any;
