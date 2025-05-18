// types/utility/number.d.ts

declare class Num {
    static int(num: any): number;
    static float(num: any): number;
    static ceil(num: number): number;
    static round(num: number): number;
    static floor(num: number): number;
    static fixed(num: any, fixed?: number): string;
    static random(start?: number, end?: number): number;
    static matrix(num: number, limit?: number, base?: number[]): number[];
    static combine(arr: number[]): number;
    static distance(cord1: any, cord2: any, miles?: boolean): number;
    static format(num: number, decimal?: string, thousand?: string, fixed?: number): string | null;
}

export default Num;