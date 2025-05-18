// types/utility/event.d.ts

declare class Event {
    static events: any[];

    static bind(name: string | string[], callback: Function, options?: any, paused?: boolean): typeof Event;
    static unbind(name: string | string[], options?: any): typeof Event;
    static fire(name: string, ...args: any[]): typeof Event;
    static pause(name: string | string[], options?: any): typeof Event;
    static unpause(name: string | string[], options?: any): typeof Event;
}

export default Event;
