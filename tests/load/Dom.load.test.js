import { Bench } from 'tinybench';
import { Dom, Hash, Now } from "#src/index.esm.js";
import { Dom as _Dom } from "#src/index.js";

const bench = new Bench(BENCH_CFG || {});

// Hash.uuid

TASK_CFG.legacy && bench.add('Legacy Dom.find()', () => {
    _Dom.find('#red').closest('#app');
    _Dom.find('#red').attr('style', 'width: 100px; height: 100px; background: blue;');
});

bench.add('Dom.find()', () => {
    Dom.find('#red').closest('#app');
    Dom.find('#red').attr('style', 'width: 100px; height: 100px; background: yellow;');
});

// Print start time
console.log(`[${Now.make().format()}]: Running Dom load test ...`);

// Run bench
if ( TASK_CFG.nodejs ) {
    console.warn('Skipping test on nodejs ...');
} else {
    await bench.run().then(() => output(bench));
}
