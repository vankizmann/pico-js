// types/index.d.ts
import Cookie from "./library/cookie";
import Data from "./library/data";
import Element from "./library/element";
import Event from "./library/event";
import Locale from "./library/locale";
import Map from "./library/map";
import Queue from "./library/queue";
import Route from "./library/route";

import Dom from "./utility/dom";
import Arr from "./utility/array";
import Obj from "./utility/object";
import Any from "./utility/any";
import Num from "./utility/number";
import Str from "./utility/string";
import Now from "./utility/now";

export declare module "@kizmann/pico-js" {

    function UUID(): string;

    const Cookie: Cookie;
    const Data: Data;
    const Element: Element;
    const Event: Event;
    const Locale: Locale;
    const Map: Map;
    const Queue: Queue;
    const Route: Route;

    const Dom: Dom;
    const Arr: Arr;
    const Obj: Obj;
    const Any: Any;
    const Str: Str;
    const Num: Num;
    const Now: Now;

    export {
        UUID,
        Cookie,
        Data,
        Element,
        Event,
        Locale,
        Map,
        Queue,
        Route,
        Dom,
        Arr,
        Obj,
        Any,
        Str,
        Num,
        Now,
    };

    export default {
        UUID,
        Cookie,
        Data,
        Element,
        Event,
        Locale,
        Map,
        Queue,
        Route,
        Dom,
        Arr,
        Obj,
        Any,
        Str,
        Num,
        Now
    };
}