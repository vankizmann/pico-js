import { Bench } from 'tinybench';
import { Mix, Now } from "#src/index.esm.js";
import _ from "lodash";

const bench = new Bench(BENCH_CFG || {});

// Mix.isEmpty

TASK_CFG.native && bench.add('Object.keys() (object)', () => {
    Object.keys(bigobj);
});

TASK_CFG.detail && bench.add('_.keys (object)', () => {
    _.keys(bigobj);
});

bench.add('Mix.keys (object)', () => {
    Mix.keys(bigobj);
});

TASK_CFG.native && bench.add('Object.keys() (array)', () => {
    Object.keys(bigarr);
});

TASK_CFG.detail && bench.add('_.keys (array)', () => {
    _.keys(bigarr);
});

bench.add('Mix.keys (array)', () => {
    Mix.keys(bigarr);
});

// Mix.vals

TASK_CFG.native && bench.add('Object.values() (object)', () => {
    Object.values(bigobj);
});

TASK_CFG.detail && bench.add('_.vals (object)', () => {
    _.values(bigobj);
});

bench.add('Mix.vals (object)', () => {
    Mix.vals(bigobj);
});

TASK_CFG.native && bench.add('Object.values() (array)', () => {
    Object.values(bigarr);
});

TASK_CFG.detail && bench.add('_.vals (array)', () => {
    _.values(bigarr);
});

bench.add('Mix.vals (array)', () => {
    Mix.vals(bigarr);
});

// Mix.isEmpty

TASK_CFG.detail && bench.add('_.isEmpty', () => {
    _.isEmpty(bigarr);
    _.isEmpty(bigobj);
    _.isEmpty(-2.2);
    _.isEmpty('');
    _.isEmpty(true);
});

bench.add('Mix.isEmpty', () => {
    Mix.isEmpty(bigarr);
    Mix.isEmpty(bigobj);
    Mix.isEmpty(-2.2);
    Mix.isEmpty('');
    Mix.isEmpty(true);
});

// bench.add('_.isEmpty (array)', () => {
//     _.isEmpty(bigarr);
// });
//
// bench.add('Mix.isEmpty (array)', () => {
//     Mix.isEmpty(bigarr);
// });
//
// bench.add('_.isEmpty (object)', () => {
//     _.isEmpty(bigobj);
// });
//
// bench.add('Mix.isEmpty (object)', () => {
//     Mix.isEmpty(bigobj);
// });
//
// bench.add('_.isEmpty (number)', () => {
//     _.isEmpty(2.1);
// });
//
// bench.add('Mix.isEmpty (number)', () => {
//     Mix.isEmpty(2.1);
// });
//
// bench.add('_.isEmpty (string)', () => {
//     _.isEmpty('');
// });
//
// bench.add('Mix.isEmpty (string)', () => {
//     Mix.isEmpty('');
// });
//
// bench.add('_.isEmpty (boolean)', () => {
//     _.isEmpty(false);
// });
//
// bench.add('Mix.isEmpty (boolean)', () => {
//     Mix.isEmpty(false);
// });

console.info(`[${Now.make().format()}]: Running Mix load test ...`);

await bench.run().then(() => output(bench));
