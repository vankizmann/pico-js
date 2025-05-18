// types/utility/locale.d.ts

declare class Locale {
    static locales: object;

    static pickByCount(splits: string[], count: number): string;
    static has(key: string): boolean;
    static get(key: string, fallback?: string | null): string;
    static set(key: string, value: string): typeof Locale;
    static trans(key: string, values?: object): string;
    static choice(key: string, count?: number, values?: object): string;
}

export default Locale;
