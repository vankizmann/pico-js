import { Hash, Obj } from "#src/index.esm.js";

globalThis.TASK_CFG = {
    detail: true, native: false, legacy: true
};

if ( globalThis.window === undefined ) {
    globalThis.TASK_CFG.nodejs = true;
}

globalThis.BENCH_CFG = {
    time: 100, warmupTime: 100
};

if ( typeof window === 'undefined' ) {
    globalThis.chrome = true;
}

globalThis.medobj = {};
Obj.set(medobj, 'name.cheese.noway.dope', 'foo');

for (let i = 0; i < 100; i++) {
    globalThis.medobj[Hash.make()] = Obj.set({}, 'name.cheese.noway.dope', 'foo');
}

globalThis.bigobj = {};

for (let i = 0; i < 200; i++) {
    globalThis.bigobj[Hash.make()] = { a: 'v1', b: 'v2', c: 'v3', d: 'v4' };
}

globalThis.medarr = [];

for (let i = 0; i < 500; i++) {
    globalThis.medarr.push({ a: 'v1', b: 'v2', c: 'v3', d: 'v4' });
}

globalThis.bigarr = [];

for (let i = 0; i < 500; i++) {
    globalThis.bigarr.push({ a: 'v1', b: 'v2', c: 'v3', d: 'v4' });
}

globalThis.getobj = () => {
    return { ...medobj };
}

globalThis.getarr = () => {
    return [ ...medarr ];
}

globalThis.form = new FormData();

globalThis.form.append('a', 'v1');
globalThis.form.append('b', 'v2');
globalThis.form.append('c', 'v2');

globalThis.output = (bench) => {

    if ( typeof console !== 'undefined' ) {
        return console.table(bench.table());
    }

    throw new Error('Console not available!');
}

setTimeout(async () => {
    // await import("./load/Dom.load.test.js");
    // await import("./load/Hash.load.test.js");
    // await import("./load/Locale.load.test.js");
    // await import("./load/Now.load.test.js");
    // await import("./load/Array.load.test.js");
    // await import("./load/Object.load.test.js");
    // await import("./load/Mixed.load.test.js");
}, 500);
