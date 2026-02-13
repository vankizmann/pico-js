import { Bench } from 'tinybench';
import { Now, Arr, Obj } from "#src/index.esm.js";
// import { Arr as _Arr } from "#src/index.js";
import _ from "lodash";

const bench = new Bench(BENCH_CFG || {});

let arr1 = [
    { foo: 'bar1', baz: 'v1' },
    { foo: 'bar2', baz: 'v2' },
    { foo: 'bar1', baz: 'v3' },
    { foo: 'bar3', baz: 'v2' },
];

// Arr.each

TASK_CFG.detail && bench.add('_.each', () => {
    _.each(getarr(), () => null);
});

TASK_CFG.detail && bench.add('_.each (obj)', () => {
    _.each(getobj(), () => null);
});


TASK_CFG.legacy && bench.add('Legacy Arr.each', () => {
    // _Arr.each(getarr(), () => null);
});

bench.add('Arr.each', () => {
    Arr.each(getarr(), () => null);
});

bench.add('Arr.each (obj)', () => {
    Arr.each(getobj(), () => null);
});

// Arr.map

TASK_CFG.detail && bench.add('_.map', () => {
    _.map(getarr(), () => null);
});

TASK_CFG.legacy && bench.add('Legacy Arr.map', () => {
    // _Arr.map(getarr(), () => null);
});

bench.add('Arr.map', () => {
    Arr.map(getarr(), () => null);
});

// Arr.clone

TASK_CFG.detail && bench.add('_.cloneDeep', () => {
    _.cloneDeep(getarr());
});

TASK_CFG.legacy && bench.add('Legacy Arr.clone', () => {
    // _Arr.clone(getarr());
});

bench.add('Arr.clone', () => {
    Arr.clone(getarr());
});

// Arr.includes

TASK_CFG.legacy && bench.add('Legacy Arr.includes', () => {
    // _Arr.includes([1, 2, 3, 4, 5], [1, 3, 5]);
});

bench.add('Arr.includes', () => {
    Arr.includes([1, 2, 3, 4, 5], [1, 3, 5]);
});

// Arr.filterIndex

TASK_CFG.legacy && bench.add('Legacy Arr.filterIndex', () => {
    // _Arr.filterIndex(arr1, { foo: 'bar1' });
});

bench.add('Arr.filterIndex', () => {
    Arr.filterIndex(arr1, { foo: 'bar1' });
});

// Arr.filter

TASK_CFG.legacy && bench.add('Legacy Arr.filter', () => {
    // _Arr.filter(arr1, { foo: 'bar1' });
});

bench.add('Arr.filter', () => {
    Arr.filter(arr1, { foo: 'bar1' });
});

// Arr.findIndex

TASK_CFG.legacy && bench.add('Legacy Arr.findIndex', () => {
    // _Arr.findIndex(arr1, { foo: 'bar3' });
});

bench.add('Arr.findIndex', () => {
    Arr.findIndex(arr1, { foo: 'bar3' });
});

// Arr.find

TASK_CFG.legacy && bench.add('Legacy Arr.find', () => {
    // _Arr.find(arr1, { foo: 'bar3' });
});

bench.add('Arr.find', () => {
    Arr.find(arr1, { foo: 'bar3' });
});

// Arr.unique

TASK_CFG.detail && bench.add('_.uniq', () => {
    _.uniq(['a', 'b', 'c', 'd', 'e', 'a', 'c', 'f']);
});

bench.add('Arr.unique', () => {
    Arr.unique(['a', 'b', 'c', 'd', 'e', 'a', 'c', 'f']);
});

// Arr.has

TASK_CFG.legacy && bench.add('Legacy Arr.has', () => {
    // _Arr.has(['1', 2, '3', 4, '5'], 4);
    // _Arr.has(['1', 2, '3', 4, '5'], '2');
});

bench.add('Arr.has', () => {
    Arr.has(['1', 2, '3', 4, '5'], 4);
    Arr.has(['1', 2, '3', 4, '5'], '2');
});

// Print start time
console.log(`[${Now.make().format()}]: Running Arr load test ...`);

// Run bench
await bench.run().then(() => output(bench));
