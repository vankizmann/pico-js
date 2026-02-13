import { Bench } from 'tinybench';
import { Hash, Now } from "#src/index.esm.js";
// import uuid from "uuid";

const bench = new Bench(BENCH_CFG || {});

// Hash.uuid

TASK_CFG.detail && bench.add('UUID.v4', () => {
    // uuid.v4();
});

bench.add('Hash.uuid', () => {
    Hash.uuid();
});

bench.add('Hash.make (32 char)', () => {
    Hash.make(32);
});

// Print start time
console.log(`[${Now.make().format()}]: Running Hash load test ...`);

// Run bench
await bench.run().then(() => output(bench));
