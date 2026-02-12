import { test, describe } from 'node:test';
import assert from 'node:assert';
import { Obj } from "#src/index.esm.js";

describe('PicoObject.js', () => {

    test('Obj.keyoptim test', () => {
        assert.deepStrictEqual(Obj.keyoptim('foo.bar'), ['foo', 'bar']);
        assert.deepStrictEqual(Obj.keyoptim(['foo', 'bar']), ['foo', 'bar']);
        assert.deepStrictEqual(Obj.keyoptim(['foo.bar', 'no']), ['foo.bar', 'no']);
        assert.deepStrictEqual(Obj.keyoptim(['foo.bar', 'no'], true), ['foo', 'bar', 'no']);
    });

    test('Obj.has test', () => {
        assert.strictEqual(Obj.has({ foo: { bar: null } }, 'foo.bar'), true);
        assert.strictEqual(Obj.has({ foo: { bar: undefined } }, 'foo.bar'), false);
        assert.strictEqual(Obj.has(getobj(), 'foo.bar'), true);
        assert.strictEqual(Obj.has(getobj(), 'not.you'), true);
        assert.strictEqual(Obj.has(getobj(), 'not.ned'), false);
        assert.strictEqual(Obj.has(getobj(), 'not.don'), false);
        assert.strictEqual(Obj.has(getobj(), 'arr.0'), true);
        assert.strictEqual(Obj.has(getobj(), 'arr.3'), false);
        assert.strictEqual(Obj.has(getobj(), ['foo', 'bar']), false);
        assert.strictEqual(Obj.has(getobj(), ['not', 'you']), true);
        assert.strictEqual(Obj.has(getobj(), ['not', 'ned']), false);
        assert.strictEqual(Obj.has(getobj(), ['not', 'don']), false);
        assert.strictEqual(Obj.has(getobj(), ['arr', '0']), true);
        assert.strictEqual(Obj.has(getobj(), ['arr', '3']), false);
    });

    test('Obj.get test', () => {
        assert.strictEqual(Obj.get(getobj(), null, 'nix1'), 'nix1');
        assert.strictEqual(Obj.get(getobj(), 'no.bar', 'nix2'), 'nix2');
        assert.strictEqual(Obj.get(getobj(), ['no', 'bar'], 'nix3'), 'nix3');
        assert.strictEqual(Obj.get(getobj(), 'foo.bar'), 'foobar');
        assert.strictEqual(Obj.get(getobj(), ['foo', 'bar']), null);
        assert.strictEqual(Obj.get(getobj(), 'arr.1'), 'bv');
        assert.strictEqual(Obj.get(getobj(), ['arr', '1']), 'bv');
        assert.strictEqual(Obj.get(getobj().arr, 1), 'bv');
        assert.strictEqual(Obj.get(getobj().arr, '1'), 'bv');
        assert.strictEqual(Obj.get(getobj().arr, ['1']), 'bv');
    });

    test('Obj.set/get test', () => {
        let obj1 = Obj.set(getobj(), 'foo.bar', 'v1');
        assert.strictEqual(Obj.get(obj1, 'foo.bar'), 'v1');
        let obj2 = Obj.set(getobj(), ['foo', 'bar'], 'v2');
        assert.strictEqual(Obj.get(obj2, ['foo', 'bar']), 'v2');
        let obj3 = Obj.set(getobj(), 'fooz.super.deep.womba', 'v3');
        assert.strictEqual(Obj.get(obj3, 'fooz.super.deep.womba'), 'v3');
    });

    test('Obj.empty test', () => {
        assert.strictEqual(Obj.empty({ foo: { bar: null } }, 'foo.bar'), true);
        assert.strictEqual(Obj.empty({ foo: { bar: undefined } }, 'foo.bar'), true);
        assert.strictEqual(Obj.empty({ foo: { bar: '' } }, 'foo.bar'), true);
        assert.strictEqual(Obj.empty({ foo: { bar: [] } }, 'foo.bar'), true);
        assert.strictEqual(Obj.empty({ foo: { bar: {} } }, 'foo.bar'), true);
        assert.strictEqual(Obj.empty({ foo: { bar: 0 } }, 'foo.bar'), false);
        assert.strictEqual(Obj.empty({ foo: { bar: 'x' } }, 'foo.bar'), false);
    });

    test('Obj.each test', () => {
        let obj1 = { no: 'yes', foo: 'v1' };
        Obj.each(obj1, (val, key) => key);
        assert.deepStrictEqual(obj1, { no: 'yes', foo: 'v1' });
    });

    test('Obj.each test', () => {
        let obj1 = { no: 'yes', foo: 'v1' };
        let obj2 = Obj.map(obj1, (val, key) => key);
        assert.deepStrictEqual(obj1, { no: 'yes', foo: 'v1' });
        assert.deepStrictEqual(obj2, { no: 'no', foo: 'foo' });
    });

    test('Obj.assign test', () => {
        assert.deepStrictEqual(Obj.assign({ no: 'yes', foo: 'v1' }, { foo: 'v3', bar: 'v2' }), { no: 'yes', foo: 'v3', bar: 'v2' });
    });

    test('Obj.clone test', () => {
        let obj1 = { no: 'yes', foo: 'v1' };
        let obj2 = Obj.clone(obj1, { bar: 'v2' });
        obj1.foo = 'v3';
        assert.deepStrictEqual(obj1, { no: 'yes', foo: 'v3' });
        assert.deepStrictEqual(obj2, { no: 'yes', foo: 'v1', bar: 'v2' });
    });

    test('Obj.pluck test', () => {
        let obj1 = { foo: 'v1', bar: 'v2' };
        assert.deepStrictEqual(Obj.pluck(obj1, 'bar'), 'v2');
        assert.deepStrictEqual(Obj.pluck(obj1, 'sisi', 'v3'), 'v3');
        assert.deepStrictEqual(obj1, { foo: 'v1' });
    });

    test('Obj.only test', () => {
        let obj1 = { no: 'yes', foo: 'v1', bar: 'v2' };
        assert.deepStrictEqual(Obj.only(obj1, ['foo', 'bar'], { yes: 1 }), { foo: 'v1', bar: 'v2', yes: 1 });
    });

    test('Obj.except test', () => {
        let obj1 = { no: 'yes', foo: 'v1', bar: 'v2' };
        assert.deepStrictEqual(Obj.except(obj1, ['no'], { yes: 1 }), { foo: 'v1', bar: 'v2', yes: 1 });
    });

    test('Obj.flatten test', () => {
        assert.deepStrictEqual(Obj.flatten({ foo: { bar: 'v1' } }), { 'foo.bar': 'v1' });
        assert.deepStrictEqual(Obj.flatten({ foo: [{ no: ['v1'] }] }), { 'foo.0.no.0': 'v1' });
    });

    test('Obj.unpack test', () => {
        assert.deepStrictEqual(Obj.unpack({ 'foo.bar': 'v1' }), { foo: { bar: 'v1' } });
    });

    test('Obj.includes test', () => {
        assert.strictEqual(Obj.includes({ bar: 'foo', nix: [1, 2] }, { bar: 'foo', nix: [1, 2] }), true);
        assert.strictEqual(Obj.includes({ bar: 'foo', nix: [1, 2] }, { bar: 'foo', nix: [1, 3] }), true);
        assert.strictEqual(Obj.includes({ bar: 'foo', nix: [1, 2] }, { bar: 'foo', nix: [] }), true);
        assert.strictEqual(Obj.includes({ bar: 'foo', nix: [1, 2] }, { bar: 'foo', nix: [3] }), false);
        assert.strictEqual(Obj.includes({ foo: { bar: 'v1' }, bar: 'v1' }, { bar: 'v1' }), true);
        assert.strictEqual(Obj.includes({ foo: { bar: 'v1' }, bar: 'v1' }, { foo: 'v1' }), false);
    });

    test('Obj.matches test', () => {
        assert.strictEqual(Obj.matches({ bar: 'foo', nix: [1, 2] }, { bar: 'foo', nix: [1, 2] }), true);
        assert.strictEqual(Obj.matches({ bar: 'foo', nix: [1, 2] }, { bar: 'foo', nix: [1, 3] }), false);
        assert.strictEqual(Obj.matches({ bar: 'foo', nix: [1, 2] }, { bar: 'foo', nix: [1, 1] }), false);
        assert.strictEqual(Obj.matches({ bar: 'foo', nix: [1, 2] }, { bar: 'fo2', nix: [1, 2] }), false);
    });

});
