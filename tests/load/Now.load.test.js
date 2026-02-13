import { Bench } from 'tinybench';
import { Now } from "#src/index.esm.js";
// import { Now as _Now } from "#src/index.js";
import moment from "moment";

// Make moment global
globalThis.moment = moment;

// Disable dep warnings
moment.suppressDeprecationWarnings = true;

const bench = new Bench(BENCH_CFG || {});

// Hash.uuid

TASK_CFG.detail && bench.add('moment.format (+1day)', () => {
    moment('+1day').format('YYYY-MM-DD');
});

TASK_CFG.detail && bench.add('moment.format (2023-12-01 00:40:0)', () => {
    moment('2023-12-01 00:40:0').add(1, 'day').format('YYYY-MM-DD HH:mm:ss');
});

TASK_CFG.detail && bench.add('moment.format (2026-02-03T11:00:00+01:00)', () => {
    moment('2026-02-03T11:00:00+01:00').add(1, 'day').format('YYYY-MM-DD HH:mm:ss');
});

TASK_CFG.legacy && bench.add('Legacy Now.format (null)', () => {
    // _Now.make(null).format('YYYY-MM-DD');
});

TASK_CFG.legacy && bench.add('Legacy Now.format (+1day)', () => {
    // _Now.make('+1day').format('YYYY-MM-DD');
});

TASK_CFG.legacy && bench.add('Legacy Now.format (2023-12-01 00:40:0)', () => {
    // _Now.make('2023-12-01 00:40:0').format('YYYY-MM-DD');
});

TASK_CFG.legacy && bench.add('Legacy Now.format (2026-02-03T11:00:00+01:00)', () => {
    // _Now.make('2026-02-03T11:00:00+01:00').format('YYYY-MM-DD');
});

bench.add('Now.format (null)', () => {
    Now.make(null).format('YYYY-MM-DD');
});

bench.add('Now.format (+1day)', () => {
    Now.make('+1day').format('YYYY-MM-DD');
});

bench.add('Now.format (2023-12-01 00:40:0)', () => {
    Now.make('2023-12-01 00:40:0').add(1, 'day').format('YYYY-MM-DD HH:mm:ss');
});

bench.add('Now.format (2026-02-03T11:00:00+01:00)', () => {
    Now.make('2026-02-03T11:00:00+01:00').add(1, 'day').format('YYYY-MM-DD HH:mm:ss');
});

bench.add('Now.first (+1day)', () => {
    Now.make().first('day');
});

TASK_CFG.legacy && bench.add('Legacy Now.last', () => {
    // _Now.make().lastDate();
});

bench.add('Now.last (+1day)', () => {
    Now.make().last('day');
});

// Print start time
console.log(`[${Now.make().format()}]: Running Now load test ...`);

// Run bench
await bench.run().then(() => output(bench));