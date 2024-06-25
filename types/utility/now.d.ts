// types/utility/now.d.ts

import { Num } from "./number";
import { Arr } from "./array";
import { Any } from "./any";

declare class Now {
    initialDate : string | null;
    moment : any;

    constructor(date? : any, format? : string);

    static make(date? : any, format? : string) : Now;

    get() : any;

    valid() : boolean;

    clone() : Now;

    code(format? : string) : number;

    format(format? : string, force? : boolean) : string;

    before(before? : any) : boolean;

    beforeDate(before? : any) : boolean;

    beforeTime(before? : any) : boolean;

    after(after? : any) : boolean;

    afterDate(after? : any) : boolean;

    afterTime(after? : any) : boolean;

    equal(equal? : any, format? : string) : boolean;

    equalDate(equal? : any, format? : string) : boolean;

    equalTime(equal? : any, format? : string) : boolean;

    between(fromDate? : any, toDate? : any, format? : string) : boolean;

    decade() : number;

    prevDecade() : Now;

    nextDecade() : Now;

    addDecades(count? : number) : Now;

    subDecades(count? : number) : Now;

    year(year? : number | null) : number | Now;

    prevYear() : Now;

    nextYear() : Now;

    addYears(count? : number) : Now;

    subYears(count? : number) : Now;

    month(month? : number | null) : number | Now;

    addMonths(count? : number) : Now;

    subMonths(count? : number) : Now;

    prevMonth() : Now;

    nextMonth() : Now;

    date(date? : number | null) : number | Now;

    addDates(count? : number) : Now;

    subDates(count? : number) : Now;

    prevDate() : Now;

    nextDate() : Now;

    lastDate() : number;

    day(day? : number | null) : number | Now;

    hour(hour? : number | null) : number | Now;

    addHour(count? : number) : Now;

    subHour(count? : number) : Now;

    prevHour() : Now;

    nextHour() : Now;

    minute(minute? : number | null) : number | Now;

    addMinute(count? : number) : Now;

    subMinute(count? : number) : Now;

    prevMinute() : Now;

    nextMinute() : Now;

    second(second? : number | null) : number | Now;

    addSecond(count? : number) : Now;

    subSecond(count? : number) : Now;

    prevSecond() : Now;

    nextSecond() : Now;

    humanDay() : number;

    humanMonth() : number;

    getMonths() : Now[];

    getYears() : Now[];

    getYearsGrid(size? : number) : Now[];

    getDates() : Now[];

    getDatesRange(target? : any) : Now[];

    getDatesGrid(start? : number, end? : number) : Now[];

    getHours(interval? : number) : Now[];

    getMinutes(interval? : number) : Now[];

    getSeconds(interval? : number) : Now[];

    resetTime() : Now;

    applyDate(now : any, format? : string) : void;

    applyTime(now : any, format? : string) : void;
}

export default Now;