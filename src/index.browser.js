import * as pi from "./index.esm.js";

/**
 * @typedef {Object} PicoLibrary
 * @property {function(): *} [go]
 * @property {function(): void} [browser]
 * @property {function(): void} [device]
 * @property {PicoMixed} [Any]
 * @property {PicoArray} [Arr]
 * @property {PicoDom} [Dom]
 * @property {PicoFormat} [For]
 * @property {PicoMap} [Map]
 * @property {PicoMixed} [Mix]
 * @property {PicoNow} [Now]
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
 * @property {PicoElement} [Element]
 */

/**
 * @type {PicoLibrary}
 */
globalThis.pi = pi;