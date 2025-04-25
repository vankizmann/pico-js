// types/utility/object.d.ts

import { Arr } from "./array";
import { Any } from "./any";

declare class Obj {
    static has(obj : any, keys : string | string[]) : boolean;

    static empty(obj : any, key : string) : boolean;

    static get(obj : any, keys : string | string[], fallback? : any) : any;

    static set(obj : any, keys : string | string[], val : any) : any;

    static unset(obj : any, keys : string | string[]) : any;

    static pluck(obj : any, keys : string | string[], fallback? : any) : any;

    static only(obj : any, keys : string[], assign? : any) : any;

    static except(obj : any, keys : string[], assign? : any) : any;

    static includes(obj : any, val : any) : boolean;

    static matches(obj : any, val : any) : boolean;

    static sort(obj : any, key : string | ((a : any, b : any) => number)) : any[];

    static sortString(obj : any, key : string) : any[];

    static filter(obj : any, filter : any) : any[];

    static filterIndex(obj : any, filter : any) : string[];

    static find(arr : any[], obj : any, fallback? : any) : any;

    static findIndex(arr : any[], obj : any, fallback? : number) : number;

    static clone(obj : any) : any;

    static assign(...args : any[]) : any;

    static remove(obj : any, keys : string[]) : any;

    static each(obj : any, callback : (value : any, key : string) => void) : any;

    static map(obj : any, callback : (value : any, key : string) => any) : any;

    static values(obj : any) : any[];

    static flatten(obj : any) : any;
}

export default Obj;
