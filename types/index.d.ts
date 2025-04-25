// types/index.d.ts
import { Arr } from "./utility/array";
import { Obj } from "./utility/object";
import { Any } from "./utility/any";
import { Num } from "./utility/number";
import { Str } from "./utility/string";
import { Now } from "./utility/now";

export declare module "@kizmann/pico-js" {

    const Arr: Arr;
    const Obj: Obj;
    const Any: Any;
    const Str: Str;
    const Num: Num;
    const Now: Now;

    export {
        Arr, Obj, Any, Str, Num, Now
    };

    export default {
        Arr, Obj, Any, Str, Num, Now
    };
}