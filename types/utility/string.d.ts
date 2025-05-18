// types/utility/string.d.ts

export class Str {
    static regexEscape(val: any): string;
    static upper(val: any): string;
    static lower(val: any): string;
    static camelcase(val: any): string;
    static humancase(val: any): string;
    static slugify(val: any): string;
    static ucfirst(val: string): string;
    static lcfirst(val: string): string;
    static has(val: string, search: string): boolean;
    static filesize(val: number, decimals?: number): string | null;
    static array(value: string, fallback?: any[]): any[];
    static real(value: any): any;
    static objectify(value: any, mode?: string, isArray?: boolean): any;
    static stringify(value: any, mode?: string): string;
    static options(params: any, quota?: string | null): string;
    static fromOptions(value: string, isArray?: boolean): any;
    static convertFromOptions(result: any, match: string): any;
    static params(params: any, quota?: string | null): string;
    static fromParams(value: string, isArray?: boolean): any;
    static convertFromParams(result: any, match: string): any;
}

export default Str;
