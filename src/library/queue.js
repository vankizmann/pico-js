import { Arr } from "../index";

export default class Queue
{
    queue = [];
    stopQueue = false;
    activeQueue = false;

    constructor(queue = [])
    {
        this.queue = queue;
    }

    handler(queue, index)
    {
        return () => queue.length - 1 > index ++ && this.stopQueue === false ?
            queue[index](this.handler(queue, index)) : () => {};
    }

    stop()
    {
        this.stopQueue = true;
        this.activeQueue = false;

        this.queue = [];

        return this;
    }

    clear()
    {
        this.queue = [];

        return this;
    }

    add(cb)
    {
        this.queue.push(cb);

        return this;
    }

    run()
    {
        let instance = new Queue(this.queue);

        instance.add(() => {
            instance.activeQueue = false;
        });

        if ( instance.queue.length !== 0 ) {
            Arr.first(instance.queue)(instance.handler(instance.queue.slice(0), 0));
        }

        return instance;
    }

    active()
    {
        return this.activeQueue;
    }

}
