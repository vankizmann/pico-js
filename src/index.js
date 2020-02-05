
import Arr from "./utility/array";
import Obj from "./utility/object";
import Num from "./utility/number";
import Str from "./utility/string";
import Now from "./utility/now";
import Any from "./utility/any";
import Dom from "./utility/dom";

export {
    Arr, Obj, Num, Str, Any, Dom, Now
}

import Ajax from "./library/ajax";
import Asset from "./library/asset";
import Data from "./library/data";
import Element from "./library/element";
import Event from "./library/event";
import Extension from "./library/extension";
import Locale from "./library/locale";
import Map from "./library/map";
import Queue from "./library/queue";
import Route from "./library/route";

export {
    Ajax, Asset, Data, Element, Event, Extension, Locale, Map, Queue, Route
}

let UUID = require('uuid/v1');
export { UUID };

let Cookie = require('js-cookie');
export { Cookie };

export function NanoInstance() {

    this.UUID = UUID;
    this.Cookie =  Cookie;

    this.Arr = Arr;
    this.Obj =  Obj;
    this.Num =  Num;
    this.Str =  Str;
    this.Now =  Now;
    this.Any =  Any;
    this.Dom =  Dom;

    this.Ajax =  Ajax;
    this.Asset =  Asset;
    this.Data =  Data;
    this.Element =  Element;
    this.Event =  Event;
    this.Extension =  Extension;
    this.Locale =  Locale;
    this.Map =  Map;
    this.Queue =  Queue;
    this.Route =  Route;

    this.extends = (extend) => {
        Any.keys(extend).forEach((key) => this[key] = extend[key]);
    };

    this.install = (target) => {
        Any.keys(this).forEach((key) => target[key] = this[key]);
    };

    return this;
}

let scope = {};

if (typeof global !== 'undefined') {
    scope = global;
}

if (typeof window !== 'undefined') {
    scope = window;
}

export const Nano = new NanoInstance;

if ( typeof scope.Nano === 'undefined' ) {
    scope.Nano = Nano;
}

if ( typeof scope.IE === 'undefined' ) {
    scope.IE = scope.navigator.userAgent
        .match(/Edge\/|Trident\/|MSIE /) !== null;
}

import ReadyElement from './element/ready';
scope.Nano.Element.alias('ready', ReadyElement);

import MenuElement from './element/menu';
scope.Nano.Element.alias('menu', MenuElement);

import ResizerElement from './element/resizer';
scope.Nano.Element.alias('resizer', ResizerElement);

export default scope.Nano;
