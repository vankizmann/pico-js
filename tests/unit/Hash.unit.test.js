import { test, describe } from 'node:test';
import assert from 'node:assert';
import { Hash } from "#src/index.esm.js";

describe('Hash.js', () => {

    // test('Hash.letter does not fail on diffrent inputs', () => {
    //     Hash.letter('0');
    //     Hash.letter(1);
    // });

    test('Hash.make is fixed length of 601', () => {
        const isFixedLength = Hash.make(601);
        assert.strictEqual(isFixedLength.length, 601);
    });

    test('Hash.make has only letters from a to f', () => {
        const hasOnlyLettersFromAToF = Hash.make(601, 16);
        assert.match(hasOnlyLettersFromAToF, /^[a-f0-9]+$/i);
    });

    test('Hash.make has symbol on specific positon', () => {
        const hasSymbolOnSpecificPosition = Hash.make(601, 16, { 44: '%' });
        assert.strictEqual(hasSymbolOnSpecificPosition.indexOf('%'), 44);
    });

    test('Hash.uuid has no dublicates on 200k items', () => {

        const uids = [];

        for (let i = 0; i < 200000; i++) {
            uids.push(Hash.uuid());
        }

        const comp = {};

        for (let v of uids) {
            comp[v] = 1;
        }

        assert.strictEqual(Object.keys(comp).length, uids.length);
    });

    test('Hash.uuid is a valid v4 uuid on 1k items', () => {

        const uids = [];

        for (let i = 0; i < 1000; i++) {
            uids.push(Hash.uuid());
        }

        const fails = uids.filter((val) => {
            return ! val.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        });

        assert.strictEqual(fails.length, 0);
    });

});
