// types/utility/string.d.ts

declare module "@kizmann/pico-js/src/utility/string" {
    import { Arr } from "@kizmann/pico-js/src/utility/array";
    import { Obj } from "@kizmann/pico-js/src/utility/object";
    import { Num } from "@kizmann/pico-js/src/utility/number";
    import { Any } from "@kizmann/pico-js/src/utility/any";

    export class Str {
        static regexEscape(val: string): string;
        static upper(val: string): string;
        static lower(val: string): string;
        static camelcase(val: string): string;
        static humancase(val: string): string;
        static slugify(val: string): string;
        static ucfirst(val: string): string;
        static lcfirst(val: string): string;
        static has(val: string, search: string): boolean;
        static filesize(val: number, decimals?: number): string | null;
        static array(value: string, fallback?: any[]): any[];
        static real(value: string): any;
        static objectify(value: any, mode?: 'options' | 'params', isArray?: boolean): any;
        static stringify(value: any, mode?: 'options' | 'params'): string;
        static options(params: any, quota?: string | null): string;
        static fromOptions(value: string, isArray?: boolean): any;
        private static convertFromOptions(result: any, match: string): any;
        static params(params: any, quota?: string | null): string;
        static fromParams(value: string, isArray?: boolean): any;
        private static convertFromParams(result: any, match: string): any;
    }

    export default Str;
}
