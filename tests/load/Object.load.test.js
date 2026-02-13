import { Bench } from 'tinybench';
import { Now, Obj } from "#src/index.esm.js";
// import { Obj as _Obj } from "#src/index.js";
import _ from "lodash";

const bench = new Bench(BENCH_CFG || {});

const OBJECT_CFG = {
    has: false, get: true, set: true, unset: false
}

// Obj.has

if ( OBJECT_CFG.has ) {
    TASK_CFG.detail && bench.add('_.has (string)', () => {
        _.has(medobj, 'name.cheese.noway.swiss.foobar');
    });

    TASK_CFG.legacy && bench.add('Legacy Obj.has (string)', () => {
        // _Obj.has(medobj, 'name.cheese.noway.swiss.foobar');
    });

    bench.add('Obj.has (string)', () => {
        Obj.has(medobj, 'name.cheese.noway.swiss.foobar');
    });

    TASK_CFG.detail && bench.add('_.has (array)', () => {
        _.has(medobj, ['name', 'cheese', 'noway', 'swiss', 'foobar']);
    });

    TASK_CFG.legacy && bench.add('Legacy Obj.has (array)', () => {
        // _Obj.has(medobj, ['name', 'cheese', 'noway', 'swiss', 'foobar']);
    });

    bench.add('Obj.has (array)', () => {
        Obj.has(medobj, ['name', 'cheese', 'noway', 'swiss', 'foobar']);
    });
}

// Obj.get
if ( OBJECT_CFG.get ) {
    TASK_CFG.detail && bench.add('_.get (string)', () => {
        _.get(medobj, 'name.cheese.noway.swiss.foobar');
    });

    TASK_CFG.legacy && bench.add('Legacy Obj.get (string)', () => {
        // _Obj.get(medobj, 'name.cheese.noway.swiss.foobar');
    });

    bench.add('Obj.get (string)', () => {
        Obj.get(medobj, 'name.cheese.noway.swiss.foobar');
    });

    TASK_CFG.detail && bench.add('_.get (array)', () => {
        _.get(medobj, ['name', 'cheese', 'noway', 'swiss', 'foobar']);
    });

    TASK_CFG.legacy && bench.add('Legacy Obj.get (array)', () => {
        // _Obj.get(medobj, ['name', 'cheese', 'noway', 'swiss', 'foobar']);
    });

    bench.add('Obj.get (array)', () => {
        Obj.get(medobj, ['name', 'cheese', 'noway', 'swiss', 'foobar']);
    });
}

// Obj.set

if ( OBJECT_CFG.set ) {
    TASK_CFG.detail && bench.add('_.set (string)', () => {
        _.set(getobj(), 'name.cheese.noway.swiss.foobar', 'nowo');
    });

    TASK_CFG.legacy && bench.add('Legacy Obj.set (string)', () => {
        // _Obj.set({}, 'name.cheese.noway.swiss.foobar', 'nowo');
    });

    bench.add('Obj.set (string)', () => {
        Obj.set({}, 'name.cheese.noway.swiss.foobar', 'nowo');
    });

    TASK_CFG.detail && bench.add('_.set (array)', () => {
        _.set({}, ['name', 'cheese', 'noway', 'swiss', 'foobar'], 'nowo');
    });

    TASK_CFG.legacy && bench.add('Legacy Obj.set (array)', () => {
        // _Obj.set({}, ['name', 'cheese', 'noway', 'swiss', 'foobar'], 'nowo');
    });

    bench.add('Obj.set (array)', () => {
        Obj.set({}, ['name', 'cheese', 'noway', 'swiss', 'foobar'], 'nowo');
    });
}

// Obj.unset

if ( OBJECT_CFG.unset ) {
    TASK_CFG.detail && bench.add('_.unset (string)', () => {
        _.unset(getobj(), 'name.cheese.noway.swiss.foobar');
    });

    TASK_CFG.legacy && bench.add('Legacy Obj.unset (string)', () => {
        // _Obj.unset(getobj(), 'name.cheese.noway.swiss.foobar');
    });

    bench.add('Obj.unset (string)', () => {
        Obj.unset(getobj(), 'name.cheese.noway.swiss.foobar');
    });

    TASK_CFG.detail && bench.add('_.unset (array)', () => {
        _.unset(getobj(), ['name', 'cheese', 'noway', 'swiss', 'foobar']);
    });

    TASK_CFG.legacy && bench.add('Legacy Obj.unset (array)', () => {
        // _Obj.unset(getobj(), ['name', 'cheese', 'noway', 'swiss', 'foobar']);
    });

    bench.add('Obj.unset (array)', () => {
        Obj.unset(getobj(), ['name', 'cheese', 'noway', 'swiss', 'foobar']);
    });
}

// Obj.each

TASK_CFG.detail && bench.add('_.each', () => {
    _.each(getobj(), () => null);
});

TASK_CFG.legacy && bench.add('Legacy Obj.each', () => {
    _Obj.each(getobj(), () => null);
});

bench.add('Obj.each', () => {
    Obj.each(getobj(), () => null);
});

// Obj.map

TASK_CFG.detail && bench.add('_.map', () => {
    _.map(getobj(), () => null);
});

TASK_CFG.legacy && bench.add('Legacy Obj.map', () => {
    _Obj.map(getobj(), () => null);
});

bench.add('Obj.map', () => {
    Obj.map(getobj(), () => null);
});

// Obj.assign

TASK_CFG.detail && bench.add('_.assign', () => {
    _.assign(getobj(), { foo: 'bar' }, { 'ed': 'brad' });
});

TASK_CFG.legacy && bench.add('Legacy Obj.assign', () => {
    _Obj.assign(getobj(), { foo: 'bar' }, { 'ed': 'brad' });
});

bench.add('Obj.assign', () => {
    Obj.assign(getobj(), { foo: 'bar' }, { 'ed': 'brad' });
});

// Obj.clone

TASK_CFG.detail && bench.add('_.cloneDeep', () => {
    _.cloneDeep(getobj());
});

TASK_CFG.legacy && bench.add('Legacy Obj.clone', () => {
    _Obj.clone(getobj());
});

bench.add('Obj.clone', () => {
    Obj.clone(getobj());
});

// Obj.flatten

TASK_CFG.legacy && bench.add('Legacy Obj.flatten', () => {
    _Obj.flatten(getobj());
});

bench.add('Obj.flatten', () => {
    Obj.flatten(getobj());
});

// Obj.includes

TASK_CFG.legacy && bench.add('Legacy Obj.includes', () => {
    _Obj.includes({ foo: { bar: 'v1' }, bar: 'v1' }, { bar: 'v1' });
});

bench.add('Obj.includes', () => {
    Obj.includes({ foo: { bar: 'v1' }, bar: 'v1' }, { bar: 'v1' });
});

// Obj.filterIndex

TASK_CFG.legacy && bench.add('Legacy Obj.filterIndex', () => {
    _Obj.filterIndex({ foo: { bar: 'v1' }, bar: 'v1' }, { bar: 'v1' });
});

bench.add('Obj.filterIndex', () => {
    Obj.filterIndex({ foo: { bar: 'v1' }, bar: 'v1' }, { bar: 'v1' });
});

// Obj.filter

TASK_CFG.legacy && bench.add('Legacy Obj.filter', () => {
    _Obj.filter({ foo: { bar: 'v1' }, bar: 'v1' }, { bar: 'v1' });
});

bench.add('Obj.filter', () => {
    Obj.filterIndex({ foo: { bar: 'v1' }, bar: 'v1' }, { bar: 'v1' });
});

// Print start time
console.log(`[${Now.make().format()}]: Running Obj load test ...`);

// Run bench
await bench.run().then(() => output(bench));
