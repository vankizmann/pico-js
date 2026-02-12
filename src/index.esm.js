import { default as Str } from "#src/utils/String.js";
import { default as Num } from "#src/utils/Number.js";
import { default as Arr } from "#src/utils/Array.js";
import { default as Obj } from "#src/utils/Object.js";
import { default as Mix } from "#src/utils/Mixed.js";
import { default as Hash } from "#src/utils/Hash.js";
import { default as Run } from "#src/utils/Runner.js";
import { default as Event } from "#src/utils/Event.js";
import { default as Locale } from "#src/utils/Locale.js";
import { default as Cookie } from "#src/utils/Cookie.js";
import { default as NowBuilder } from "#src/utils/Now.js";
import { default as DomBuilder } from "#src/utils/Dom.js";
import { default as ForBuilder } from "#src/utils/Format.js";

// You will be removed soon
import { default as Data } from "#src/utils/Data.js";
import { default as Route } from "#src/utils/Route.js";

// Work in progress (not started yet)
import { default as Map } from "#src/wip/Map.js";
//import { default as Element } from "#src/wip/Element.js";

import { go } from "#src/tool/scope.js";

export {
    go, Run, Mix, Str, Num, Arr, Obj, Hash, Locale, Cookie, Event, Map, Data, Route, //Element
}

export let Dom = DomBuilder();
export let Now = NowBuilder();
export let For = ForBuilder();

// Polyfills
export const Any = new Proxy({}, {
    get: function (target, prop) {
        console.warn(`Any.${prop} is deprecated, use Mix.${prop}() instead.`);
        return (...args) => Mix[prop](...args);
    }
});

export const UUID = function () {
    console.warn('UUID() is deprecated, use Hash.make() instead.');
    return Hash.make();
};