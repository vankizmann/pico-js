// types/utility/route.d.ts

declare class Route {
    static routes: object;

    static set(key: string, value: string): void;
    static get(key: string, values?: object | null, params?: object | null): string;
    static goto(key: string, values?: object | null, params?: object | null): void;
}

export default Route;
