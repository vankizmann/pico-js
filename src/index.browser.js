import * as pi from "./index.esm.js";

/**
 * @typedef {Object} PicoLibrary
 * @property {function(): *} [go]
 * @property {function(): void} [browser]
 * @property {function(): void} [device]
 * @property {PicoDom} [Dom]
 * @property {PicoNow} [Now]
 * @property {PicoFormat} [For]
 * @property {PicoArray} [Arr]
 * @property {PicoMixed} [Mix]
 * @property {PicoNumber} [Num]
 * @property {PicoObject} [Obj]
 * @property {PicoRunner} [Run]
 * @property {PicoString} [Str]
 * @property {PicoHash} [Hash]
 * @property {PicoEvent} [Event]
 * @property {PicoLocale} [Locale]
 * @property {PicoCookie} [Cookie]
 * @property {PicoData} [Data]
 * @property {PicoRoute} [Route]
 * @property {PicoMap} [Map]
 * @property {PicoElement} [Element]
 */

/**
 * @type {PicoLibrary}
 */
globalThis.pi = pi;

globalThis.addEventListener && globalThis.addEventListener('beforeunload', (e) => {
    pi.Arr.map(pi.Dom.$events, ({ el, cb, event }) => {
        return (el.removeEventListener(event, cb), null);
    });
});