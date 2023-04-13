
import Arr from "./utility/array.js";
export { Arr };

import Obj from "./utility/object.js";
export { Obj };

import Num from "./utility/number.js";
export { Num };

import Str from "./utility/string.js";
export { Str };

import Now from "./utility/now.js";
export { Now };

import Any from "./utility/any.js";
export { Any };

import Dom from "./utility/dom.js";
export { Dom };

import Cookie from "./library/cookie.js";
export { Cookie };

import Data from "./library/data.js";
export { Data };

import Element from "./library/element.js";
export { Element };

import Event from "./library/event.js";
export { Event };

import Locale from "./library/locale.js";
export { Locale };

import Map from "./library/map.js";
export { Map };

import Queue from "./library/queue.js";
export { Queue };

import Route from "./library/route.js";
export { Route };

import { v4 as UUID } from "uuid"
export { UUID };

export const Pico = {

    UUID: UUID,

    Arr: Arr,
    Obj: Obj,
    Num: Num,
    Str: Str,
    Now: Now,
    Any: Any,
    Dom: Dom,

    Cookie: Cookie,
    Data: Data,
    Element: Element,
    Event: Event,
    Locale: Locale,
    Map: Map,
    Queue: Queue,
    Route: Route,
}

/**
 * @const global
 */

if ( typeof global.IE === 'undefined' && global.navigator ) {
    global.IE = !! global.navigator.userAgent.match(/Edge\/|Trident\/|MSIE /);
}

if ( typeof global.WIN === 'undefined' && global.navigator ) {
    global.WIN = !! global.navigator.userAgent.match(/Windows/);
}

if ( typeof global.pi === 'undefined' && global.navigator ) {
    global.pi = Pico;
}

global.pi.Dom.ready(function () {

    // Apply dom scroll event
    document.addEventListener("scroll",
        global.pi.Element.scroll);

    // Apply initial scroll event
    global.pi.Element.scroll();
});

export default Pico;
