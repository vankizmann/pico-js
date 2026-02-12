import { Bench } from 'tinybench';
import { Now, Locale } from "#src/index.esm.js";
import { Locale as _Locale } from "#src/index.js";

const bench = new Bench(BENCH_CFG || {});

let locales = {
    'foo': 'bar', ':count foo|:count foo|:count foos': ':count bar|:count bar|:count bars'
};

locales.en = {
    'foo': 'bar',
};

Locale.INTL_TEXT = locales;
_Locale.locales = locales;

// Locale.trans

TASK_CFG.legacy && bench.add('Legacy Locale.trans', () => {
    _Locale.trans('foo');
    _Locale.trans('en.foo');
    _Locale.trans('i cant :nix', { nix: 'code' });
});

bench.add('Locale.trans', () => {
    Locale.trans('foo');
    Locale.trans('en.foo');
    Locale.trans('i cant :nix', { nix: 'code' });
});

// Locale.choice

TASK_CFG.legacy && bench.add('Legacy Locale.choice', () => {
    _Locale.choice(':count foo|:count foo|:count foos', 0);
    _Locale.choice(':count foo|:count foo|:count foos', 1);
    _Locale.choice(':count foo|:count foo|:count foos', 2);
});

bench.add('Locale.choice', () => {
    Locale.choice(':count foo|:count foo|:count foos', 0);
    Locale.choice(':count foo|:count foo|:count foos', 1);
    Locale.choice(':count foo|:count foo|:count foos', 2);
});

// Print start time
console.log(`[${Now.make().format()}]: Running Locale load test ...`);

// Run bench
await bench.run().then(() => output(bench));
