
import Arr from "./utility/array";
export { Arr };

import Obj from "./utility/object";
export { Obj };

import Num from "./utility/number";
export { Num };

import Str from "./utility/string";
export { Str };

import Now from "./utility/now";
export { Now };

import Any from "./utility/any";
export { Any };

import Dom from "./utility/dom";
export { Dom };

import Cookie from "./library/cookie";
export { Cookie };

import Data from "./library/data";
export { Data };

import Element from "./library/element";
export { Element };

import Event from "./library/event";
export { Event };

import Locale from "./library/locale";
export { Locale };

import Map from "./library/map";
export { Map };

import Queue from "./library/queue";
export { Queue };

import Route from "./library/route";
export { Route };

import { v4 as UUID } from 'uuid'
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

if ( typeof global.IE === 'undefined' ) {
    global.IE = !! global.navigator.userAgent.match(/Edge\/|Trident\/|MSIE /);
}

if ( typeof global.WIN === 'undefined' ) {
    global.WIN = !! global.navigator.userAgent.match(/Windows/);
}

// if ( typeof global.pi === 'undefined' ) {
//     global.pi = Pico;
// }

export default Pico;
