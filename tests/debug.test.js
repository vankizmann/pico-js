import { Arr, Hash, Mix, Obj, Str } from "#src/index.esm.js";
import { Obj as _Obj,  Arr as _Arr } from "#src/index.js";
import _ from "lodash";
import * as util from "node:util";

let obj = {
    radix: {}, number: {}
};

for (let i = 0; i < 2000; i++) {
    obj.radix[Hash.radix(36, Hash.$radix)] = true;
}

for (let i = 0; i < 2000; i++) {
    obj.number[Hash.number(10)] = true;
}

let sortedRadix = {};

// Mix.keys(obj.radix).sort().forEach(key => {
//     sortedRadix[key] = obj.radix[key];
// });

// console.log(obj, sortedRadix, Hash.password(12));

const form = new FormData();

form.append('a', 'v1');
form.append('b', 'v2');

// console.log(Mix.keys(form), Mix.vals(form));

// console.log(Mix.keys({ a: 'v1', b: 'v2', c: 'v3' }))
// console.log(Mix.keys(['a', 'b', 'c', 'f'].reverse()))


// console.log(Mix.isObj({}), true);
// console.log(Mix.isObj([]), false);
// console.log(Mix.isObj(() => {}), false);
// console.log(Mix.isObj(null), false);
// console.log(Mix.isObj(undefined), false);
// console.log(Mix.isObj(form), false);
// console.log(Mix.isArr(form), false);

// console.log(Mix.isEmpty(null), true);
// console.log(Mix.isEmpty(undefined), true);
// console.log(Mix.isEmpty(''), true);
// console.log(Mix.isEmpty({}), true);
// console.log(Mix.isEmpty({ a: 'v1' }), false);
// console.log(Mix.isEmpty([]), true);
// console.log(Mix.isEmpty(['v1']), false);
// console.log(Mix.isEmpty(form), false);
// console.log(Mix.isEmpty(0), false);

Obj.each(['a', 'b'], () => null);
Arr.each(['c', 'd'], () => null);

Obj.each({ a: 'a', b: 'b' }, () => null);
Arr.each({ c: 'c', d: 'd' }, () => null);

let test = {
    'foo.nope.du.hund': null,
    'not': { you: null },
};

// console.log(Obj.unset(test, 'foo.nope.du.hund'));
// console.log(Obj.unset(test, 'not.you'));

let obj1 = {
    foo: { bar: 'baz' }, bar: 'foo', nix: [1, 2]
}

let equals = Obj.matches(obj1, {
    foo: { bar: 'baz' }, bar: 'foo', nix: [1, 2]
});

// console.log(equals);

let flatten = Obj.flatten(obj1);

// console.log(flatten);

let unpack = Obj.unpack(flatten);
// console.log(unpack);

let arr1 = [
    { foo: 'bar1', baz: 'v1' },
    { foo: 'bar2', baz: 'v2' },
    { foo: 'bar1', baz: 'v3' },
    { foo: 'bar3', baz: 'v2' },
];

// console.log(Arr.filter(arr1, { foo: 'bar1' }));
// console.log(Arr.filterIndex(arr1, { foo: 'bar1' }));
// console.log(Arr.find(arr1, { foo: 'bar3' }));
// console.log(Arr.findIndex(arr1, { foo: 'bar1' }));

let obj2 = {
    foo: { bar: 'v1' }, bar: 'v1'
};

// console.log(Obj.filter(obj2, (val) => ! Mix.isRef(val)));

let arr2 = [
    {
        foo: 'v1',
        childs: [
            {
                foo: 'v1.1',
                childs: []
            },
            {
                foo: 'v1.2',
                childs: []
            }
        ]
    },
    {
        foo: 'v2',
        childs: [
            {
                foo: 'v2.2',
                childs: [
                    {
                        foo: 'v2.2.1',
                        childs: []
                    },
                    {
                        foo: 'v2.2.2',
                        childs: []
                    }
                ]
            },
            {
                foo: 'v2.2',
                childs: []
            }
        ]
    }
];

console.log('xxxx');

_Arr.recursive(arr2, 'childs', (el, cascade) => {
    console.log('----', cascade);
    // console.log(...args);
    el.foo = 'no-' + el.foo;
});

console.log('xxxx', util.inspect(arr2, { depth: null }));

Arr.recursive(arr2, 'childs', (el, cascade) => {
    console.log('----', cascade);
    // console.log(...args);
    el.foo = 'ye-' + el.foo;
});

console.log('xxxx', util.inspect(arr2, { depth: null }));

