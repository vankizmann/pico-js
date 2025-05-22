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

    const Cookie: typeof Cookie;
    const Data: typeof Data;
    const Element: typeof Element;
    const Event: typeof Event;
    const Locale: typeof Locale;
    const Map: typeof Map;
    const Queue: typeof Queue;
    const Route: typeof Route;

    const Dom: typeof Dom;
    const Arr: typeof Arr;
    const Obj: typeof Obj;
    const Any: typeof Any;
    const Str: typeof Str;
    const Num: typeof Num;
    const Now: typeof Now;

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