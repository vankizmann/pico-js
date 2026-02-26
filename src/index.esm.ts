import { default as Run } from "./utils/Runner.ts";
import { default as Str } from "./utils/String.ts";
import { default as Num } from "./utils/Number.ts";
import { default as Arr } from "./utils/Array.ts";
import { default as Obj } from "./utils/Object.ts";
import { default as Mix } from "./utils/Mixed.ts";
import { default as Hash } from "./utils/Hash.ts";
import { default as Signal } from "./utils/Signal.ts";
import { default as Locale } from "./utils/Locale.ts";
import { default as Cookie } from "./utils/Cookie.ts";
import { default as Now } from "./utils/Now.ts";
import { default as Dom } from "./utils/Dom.ts";
import { default as For } from "./utils/Format.ts";

export {
    Dom, Now, For, Run, Str, Num, Arr, Obj, Mix, Hash, Signal, Locale, Cookie
};

import { go, browser, device, trait } from "./tool/scope.ts";
export { go, browser, device, trait };

// You will be removed soon
import { default as Data } from "./utils/Data.ts";
import { default as Route } from "./utils/Route.ts";

export {
    Route, Data
}

// Work in progress (not started yet)
// import { default as Map } from "./wip/Map.ts";
// import { default as Element } from "./wip/Element.ts";

// export {
//     Map, Element
// }

/**
 * @type {Mix}
 */
export const Any : Mix = new Proxy({}, {
    get: function (target : any, prop : string) {
        console.warn(`Any.${prop} is deprecated, use Mix.${prop}() instead.`);
        return (...args : any[]) => Mix[prop](...args);
    }
});

/**
 * @type {Signal}
 */
export const Event : Signal = new Proxy({}, {
    get: function (target : any, prop : string) {
        console.warn(`Event.${prop} is deprecated, use Signal.${prop}() instead.`);
        return (...args : any[]) => Signal[prop](...args);
    }
});

/**
 * @returns {string}
 */
export const UUID = function () : string {
    console.warn('UUID() is deprecated, use Hash.make() instead.');
    return Hash.make();
};