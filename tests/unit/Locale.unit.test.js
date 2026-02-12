import { test, describe } from 'node:test';
import assert from 'node:assert';
import { Locale } from "#src/index.esm.js";

Locale.INTL_TEXT = {
    'foo': 'bar', 'bar': { 'foo': 'nix' }
};

describe('Locale.js', () => {

    test('Locale.trans', () => {
        assert.strictEqual(Locale.trans('bar.foo'), 'nix');
        assert.strictEqual(Locale.trans('foo'), 'bar');
        assert.strictEqual(Locale.trans('zisu'), 'zisu');
        assert.strictEqual(Locale.trans('i cant :nix', { nix: 'code' }), 'i cant code');
    });

    test('Locale.choice', () => {
        assert.strictEqual(Locale.choice(':count :nix', 0, { nix: 'fo' }), '0 fo');
        assert.strictEqual(Locale.choice(':count :nix', 1, { nix: 'fo' }), '1 fo');
        assert.strictEqual(Locale.choice(':count :nix', 2, { nix: 'fo' }), '2 fo');
        assert.strictEqual(Locale.choice(':count A|:count B', 0), '0 B');
        assert.strictEqual(Locale.choice(':count A|:count B', 1), '1 A');
        assert.strictEqual(Locale.choice(':count A|:count B', 2), '2 B');
        assert.strictEqual(Locale.choice(':count A|:count B|:count C', 0), '0 A');
        assert.strictEqual(Locale.choice(':count A|:count B|:count C', 1), '1 B');
        assert.strictEqual(Locale.choice(':count A|:count B|:count C', 2), '2 C');
    });

});
