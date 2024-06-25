// types/utility/number.d.ts

import { Any } from "./any";
import { Arr } from "./array";
import { Obj } from "./object";

declare class Num {
    static int(num : any) : number;

    static float(num : any) : number;

    static ceil(num : number) : number;

    static round(num : number) : number;

    static floor(num : number) : number;

    static fixed(num : number, fixed? : number) : string;

    static random(start? : number, end? : number) : number;

    static matrix(num : number, limit? : number, base? : number[]) : number[];

    static combine(arr : number[]) : number;

    static distance(cord1 : { lat : number; lng : number }, cord2 : { lat : number; lng : number }, miles? : boolean) : number;

    static format(num : number | null, decimal? : string, thousand? : string, fixed? : number | null) : string | null;
}

export default Num;