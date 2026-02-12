import { test, describe } from 'node:test';
import assert from 'node:assert';
import { Mix } from "#src/index.esm.js";

describe('Mixed.js', () => {

    let obj = {
        'foo.bar': 'foobar',
    };

    obj.not = {
        you: null, don: undefined
    };

    obj.arr = ['av', 'bv'];

    const form = new FormData();

    form.append('a', 'v1');
    form.append('b', 'v2');

    test('Mix.isEmpty test', () => {
        assert.strictEqual(Mix.isEmpty(null), true);
        assert.strictEqual(Mix.isEmpty(undefined), true);
        assert.strictEqual(Mix.isEmpty(''), true);
        assert.strictEqual(Mix.isEmpty({}), true);
        assert.strictEqual(Mix.isEmpty({ a: 'v1' }), false);
        assert.strictEqual(Mix.isEmpty([]), true);
        assert.strictEqual(Mix.isEmpty(['v1']), false);
        assert.strictEqual(Mix.isEmpty(form), false);
        assert.strictEqual(Mix.isEmpty(0), false);
    });

    test('Mix.isNix test', () => {
        assert.strictEqual(Mix.isNix(null), true);
        assert.strictEqual(Mix.isNix(undefined), true);
        assert.strictEqual(Mix.isNix(0), false);
        assert.strictEqual(Mix.isNix(''), false);
        assert.strictEqual(Mix.isNix({}), false);
        assert.strictEqual(Mix.isNix([]), false);
    });

    test('Mix.isPrim test', () => {
        assert.strictEqual(Mix.isPrim(0), true);
        assert.strictEqual(Mix.isPrim(2.3), true);
        assert.strictEqual(Mix.isPrim(''), true);
        assert.strictEqual(Mix.isPrim('asda'), true);
        assert.strictEqual(Mix.isPrim(null), false);
        assert.strictEqual(Mix.isPrim(undefined), false);
        assert.strictEqual(Mix.isPrim({}), false);
        assert.strictEqual(Mix.isPrim([]), false);
        assert.strictEqual(Mix.isPrim(() => {}), false);
    });

    test('Mix.isStr test', () => {
        assert.strictEqual(Mix.isStr(''), true);
        assert.strictEqual(Mix.isStr('foo'), true);
        assert.strictEqual(Mix.isStr(0), false);
        assert.strictEqual(Mix.isStr({}), false);
        assert.strictEqual(Mix.isStr([]), false);
    });

    test('Mix.isNum test', () => {
        assert.strictEqual(Mix.isNum('1.3'), true);
        assert.strictEqual(Mix.isNum(2.2), true);
        assert.strictEqual(Mix.isNum('-1.3'), true);
        assert.strictEqual(Mix.isNum(-5), true);
        assert.strictEqual(Mix.isNum('2.'), false);
    });

    test('Mix.isInt test', () => {
        assert.strictEqual(Mix.isInt('1'), true);
        assert.strictEqual(Mix.isInt(2), true);
        assert.strictEqual(Mix.isInt('-2'), true);
        assert.strictEqual(Mix.isInt('-1.3'), false);
        assert.strictEqual(Mix.isInt(5.2), false);
        assert.strictEqual(Mix.isInt('2.'), false);
    });

    test('Mix.isBool test', () => {
        assert.strictEqual(Mix.isBool(true), true);
        assert.strictEqual(Mix.isBool(false), true);
        assert.strictEqual(Mix.isBool('true'), true);
        assert.strictEqual(Mix.isBool('false'), true);
        assert.strictEqual(Mix.isBool('ja'), false);
        assert.strictEqual(Mix.isBool(null), false);
        assert.strictEqual(Mix.isBool(0), false);
        assert.strictEqual(Mix.isBool(1), false);
        assert.strictEqual(Mix.isBool({}), false);
    });

    test('Mix.isRef test', () => {
        assert.strictEqual(Mix.isRef({}), true);
        assert.strictEqual(Mix.isRef([]), true);
        assert.strictEqual(Mix.isRef(() => {}), false);
        assert.strictEqual(Mix.isRef(null), false);
        assert.strictEqual(Mix.isRef(undefined), false);
    });

    test('Mix.isObj test', () => {
        assert.strictEqual(Mix.isObj({}), true);
        assert.strictEqual(Mix.isObj([]), false);
        assert.strictEqual(Mix.isObj(() => {}), false);
        assert.strictEqual(Mix.isObj(null), false);
        assert.strictEqual(Mix.isObj(undefined), false);
    });

    test('Mix.isArr test', () => {
        assert.strictEqual(Mix.isArr([]), true);
        assert.strictEqual(Mix.isArr({}), false);
        assert.strictEqual(Mix.isArr(() => {}), false);
        assert.strictEqual(Mix.isArr(null), false);
        assert.strictEqual(Mix.isArr(undefined), false);
    });

    test('Mix.isFunc test', () => {
        assert.strictEqual(Mix.isFunc(() => {}), true);
        assert.strictEqual(Mix.isFunc(Mix.isFunc), true);
        assert.strictEqual(Mix.isFunc({}), false);
        assert.strictEqual(Mix.isFunc([]), false);
        assert.strictEqual(Mix.isFunc(null), false);
        assert.strictEqual(Mix.isFunc(undefined), false);
    });

    test('Mix.keys test', () => {
        assert.deepStrictEqual(Mix.keys(['v1', 'v2']), ['0', '1']);
        assert.deepStrictEqual(Mix.keys({a: 'v1', b: 'v2'}), ['a', 'b']);
        assert.deepStrictEqual(Mix.keys(form), ['a', 'b']);
    });

    test('Mix.vals test', () => {
        assert.deepStrictEqual(Mix.vals(['v1', 'v2']), ['v1', 'v2']);
        assert.deepStrictEqual(Mix.vals({a: 'v1', b: 'v2'}), ['v1', 'v2']);
        assert.deepStrictEqual(Mix.vals(form), ['v1', 'v2']);
    });

    test('Mix.len test', () => {
        assert.strictEqual(Mix.len(['v1', 'v2', 'v3']), 3);
        assert.strictEqual(Mix.len({a: 'v1', b: 'v2'}), 2);
        assert.strictEqual(Mix.len('foobar'), 6);
        assert.strictEqual(Mix.len(7), 1);
    });

    test('Mix.str test', () => {
        assert.strictEqual(Mix.str('foo'), 'foo');
        assert.strictEqual(Mix.str(12), '12');
        assert.strictEqual(Mix.str(null), 'null');
        assert.strictEqual(Mix.str(undefined), 'undefined');
        assert.strictEqual(typeof Mix.str({}), 'string');
        assert.strictEqual(typeof Mix.str([]), 'string');
        assert.strictEqual(typeof Mix.str(() => {}), 'string');
    });

    test('Mix.num test', () => {
        assert.strictEqual(Mix.num('foo'), NaN);
        assert.strictEqual(Mix.num([]), NaN);
        assert.strictEqual(Mix.num(true), NaN);
        assert.strictEqual(Mix.num('12'), 12.0);
        assert.strictEqual(Mix.num(15.3), 15.3);
        assert.strictEqual(Mix.num('2.8'), 2.8);
    });

    test('Mix.int test', () => {
        assert.strictEqual(Mix.int('foo'), NaN);
        assert.strictEqual(Mix.int([]), NaN);
        assert.strictEqual(Mix.num(true), NaN);
        assert.strictEqual(Mix.int('12'), 12);
        assert.strictEqual(Mix.int(15.3), 15);
        assert.strictEqual(Mix.int('2.8'), 3);
    });

    test('Mix.bool test', () => {
        assert.strictEqual(Mix.bool('1'), true);
        assert.strictEqual(Mix.bool('0'), false);
        assert.strictEqual(Mix.bool(true), true);
        assert.strictEqual(Mix.bool('true'), true);
        assert.strictEqual(Mix.bool('yes'), true);
        assert.strictEqual(Mix.bool('foobar'), false);
        assert.strictEqual(Mix.bool('no'), false);
        assert.strictEqual(Mix.bool(['v1']), true);
        assert.strictEqual(Mix.bool([]), false);
        assert.strictEqual(Mix.bool({a: 'v1'}), true);
        assert.strictEqual(Mix.bool({}), false);
        assert.strictEqual(Mix.bool(15.3), true);
        assert.strictEqual(Mix.bool(0.5), true);
        assert.strictEqual(Mix.bool(0), false);
    });

});
