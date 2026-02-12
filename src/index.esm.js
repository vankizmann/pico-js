// You will be removed soon
import { default as Data } from "#src/utils/Data.js";
import { default as Route } from "#src/utils/Route.js";

// Work in progress (not started yet)
import { default as Map } from "#src/wip/Map.js";
import { default as Element } from "#src/wip/Element.js";

export {
    Map, Data, Route, Element
}

/**
 * @typedef {typeof import("#src/tool/scope.js").go} PicoToolGo
 * @type {PicoToolGo}
 */
import { go as PicoToolGo } from "#src/tool/scope.js";
export const go = PicoToolGo;

/**
 * @typedef {typeof import("#src/tool/scope.js").browser} PicoToolBrowser
 * @type {PicoToolBrowser}
 */
import { browser as PicoToolBrowser } from "#src/tool/scope.js";
export const browser = PicoToolBrowser;

/**
 * @typedef {typeof import("#src/tool/scope.js").device} PicoToolDevice
 * @type {PicoToolDevice}
 */
import { device as PicoToolDevice } from "#src/tool/scope.js";
export const device = PicoToolDevice;

/**
 * @typedef {typeof import("#src/utils/Dom.js").PicoDom} PicoDom
 * @type {PicoDom}
 */
import { default as DomBuilder } from "#src/utils/Dom.js";
export const Dom = DomBuilder();

/**
 * @typedef {typeof import("#src/utils/Now.js").PicoNow} PicoNow
 * @type {PicoNow}
 */
import { default as NowBuilder } from "#src/utils/Now.js";
export const Now = NowBuilder();

/**
 * @typedef {typeof import("#src/utils/Format.js").PicoFormat} PicoFormat
 * @type {PicoFormat}
 */
import { default as ForBuilder } from "#src/utils/Format.js";
export const For = ForBuilder();

/**
 * @typedef {typeof import("#src/utils/Runner.js").PicoRunner} PicoRunner
 * @type {PicoRunner}
 */
import { default as PicoRunner } from "#src/utils/Runner.js";
export const Run = PicoRunner;

/**
 * @typedef {typeof import("#src/utils/String.js").PicoString} PicoString
 * @type {PicoString}
 */
import { default as PicoString } from "#src/utils/String.js";
export const Str = PicoString;

/**
 * @typedef {typeof import("#src/utils/Number.js").PicoNumber} PicoNumber
 * @type {PicoNumber}
 */
import { default as PicoNumber } from "#src/utils/Number.js";
export const Num = PicoNumber;

/**
 * @typedef {typeof import("#src/utils/Array.js").PicoArray} PicoArray
 * @type {PicoArray}
 */
import { default as PicoArray } from "#src/utils/Array.js";
export const Arr = PicoArray;

/**
 * @typedef {typeof import("#src/utils/Object.js").PicoObject} PicoObject
 * @type {PicoObject}
 */
import { default as PicoObject } from "#src/utils/Object.js";
export const Obj = PicoObject;

/**
 * @typedef {typeof import("#src/utils/Mixed.js").PicoMixed} PicoMixed
 * @type {PicoMixed}
 */
import { default as PicoMixed } from "#src/utils/Mixed.js";
export const Mix = PicoMixed;

/**
 * @typedef {typeof import("#src/utils/Hash.js").PicoHash} PicoHash
 * @type {PicoHash}
 */
import { default as PicoHash } from "#src/utils/Hash.js";
export const Hash = PicoHash;

/**
 * @typedef {typeof import("#src/utils/Event.js").PicoEvent} PicoEvent
 * @type {PicoEvent}
 */
import { default as PicoEvent } from "#src/utils/Event.js";
export const Event = PicoEvent;

/**
 * @typedef {typeof import("#src/utils/Locale.js").PicoLocale} PicoLocale
 * @type {PicoLocale}
 */
import { default as PicoLocale } from "#src/utils/Locale.js";
export const Locale = PicoLocale;

/**
 * @typedef {typeof import("#src/utils/Cookie.js").PicoCookie} PicoCookie
 * @type {PicoCookie}
 */
import { default as PicoCookie } from "#src/utils/Cookie.js";
export const Cookie = PicoCookie;


// Polyfills Any
export const Any = new Proxy({}, {
    get: function (target, prop) {
        console.warn(`Any.${prop} is deprecated, use Mix.${prop}() instead.`);
        return (...args) => Mix[prop](...args);
    }
});

// Polyfills UUID
export const UUID = function () {
    console.warn('UUID() is deprecated, use Hash.make() instead.');
    return Hash.make();
};