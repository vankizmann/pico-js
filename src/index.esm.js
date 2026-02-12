import { default as PicoRunner } from "./utils/Runner.js";
import { default as PicoString } from "./utils/String.js";
import { default as PicoNumber } from "./utils/Number.js";
import { default as PicoArray } from "./utils/Array.js";
import { default as PicoObject } from "./utils/Object.js";
import { default as PicoMixed } from "./utils/Mixed.js";
import { default as PicoHash } from "./utils/Hash.js";
import { default as PicoEvent } from "./utils/Event.js";
import { default as PicoLocale } from "./utils/Locale.js";
import { default as PicoCookie } from "./utils/Cookie.js";
import { PicoDom, default as DomBuilder } from "./utils/Dom.js";
import { PicoNow, default as NowBuilder } from "./utils/Now.js";
import { PicoFormat, default as ForBuilder } from "./utils/Format.js";

import { go, browser, device } from "./tool/scope.js";
export { go, browser, device };

// You will be removed soon
import { default as Data } from "./utils/Data.js";
import { default as Route } from "./utils/Route.js";

export {
    Map, Data
}

// Work in progress (not started yet)
import { default as Map } from "./wip/Map.js";
import { default as Element } from "./wip/Element.js";

export {
    Route, Element
}

/**
 * @type {typeof PicoDom}
 */
export const Dom = DomBuilder();

/**
 * @type {typeof PicoNow}
 */
export const Now = NowBuilder();

/**
 * @type {typeof PicoFormat}
 */
export const For = ForBuilder();

/**
 * @type {typeof PicoRunner}
 */
export const Run = PicoRunner;

/**
 * @type {typeof PicoString}
 */
export const Str = PicoString;

/**
 * @type {typeof PicoNumber}
 */
export const Num = PicoNumber;

/**
 * @type {typeof PicoArray}
 */
export const Arr = PicoArray;

/**
 * @type {typeof PicoObject}
 */
export const Obj = PicoObject;

/**
 * @type {typeof PicoMixed}
 */
export const Mix = PicoMixed;

/**
 * @type {typeof PicoHash}
 */
export const Hash = PicoHash;

/**
 * @type {typeof PicoEvent}
 */
export const Event = PicoEvent;

/**
 * @type {typeof PicoLocale}
 */
export const Locale = PicoLocale;

/**
 * @type {typeof PicoCookie}
 */
export const Cookie = PicoCookie;


/**
 * @type {typeof PicoMixed}
 */
export const Any = new Proxy({}, {
    get: function (target, prop) {
        console.warn(`Any.${prop} is deprecated, use Mix.${prop}() instead.`);
        return (...args) => Mix[prop](...args);
    }
});

/**
 * @returns {string}
 */
export const UUID = function () {
    console.warn('UUID() is deprecated, use Hash.make() instead.');
    return PicoHash.make();
};