// types/utility/queue.d.ts

declare class Queue {
    queue: Function[];
    stopQueue: boolean;
    activeQueue: boolean;

    constructor(queue?: Function[]);

    handler(queue: Function[], index: number): Function;
    stop(): this;
    clear(): this;
    add(cb: Function): this;
    run(): Queue;
    active(): boolean;
}

export default Queue;
