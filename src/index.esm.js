import { PicoRunner, default as Run } from "./utils/Runner.js";
import { PicoString, default as Str } from "./utils/String.js";
import { PicoNumber, default as Num } from "./utils/Number.js";
import { PicoArray, default as Arr } from "./utils/Array.js";
import { PicoObject, default as Obj } from "./utils/Object.js";
import { PicoMixed, default as Mix } from "./utils/Mixed.js";
import { PicoHash, default as Hash } from "./utils/Hash.js";
import { PicoSignal, default as Signal } from "./utils/Signal.js";
import { PicoLocale, default as Locale } from "./utils/Locale.js";
import { PicoCookie, default as Cookie } from "./utils/Cookie.js";

/**
 * @type {typeof PicoDom}
 */
const Dom = DomBuilder();

/**
 * @type {typeof PicoNow}
 */
const Now = NowBuilder();

/**
 * @type {typeof PicoFormat}
 */
const For = ForBuilder();

export {
    Dom, Now, For, Run, Str, Num, Arr, Obj, Mix, Hash, Signal, Locale, Cookie
}

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
 * @type {typeof PicoMixed}
 */
export const Any = new Proxy({}, {
    get: function (target, prop) {
        console.warn(`Any.${prop} is deprecated, use Mix.${prop}() instead.`);
        return (...args) => Mix[prop](...args);
    }
});

/**
 * @type {typeof PicoMixed}
 */
export const Event = new Proxy({}, {
    get: function (target, prop) {
        console.warn(`Event.${prop} is deprecated, use Signal.${prop}() instead.`);
        return (...args) => Signal[prop](...args);
    }
});

/**
 * @returns {string}
 */
export const UUID = function () {
    console.warn('UUID() is deprecated, use Hash.make() instead.');
    return Hash.make();
};