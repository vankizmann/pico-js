import * as pi from "./index.esm.ts";

type Pico = {
    // Active
    Dom: typeof pi.Dom,
    Now: typeof pi.Now,
    For: typeof pi.For,
    Run: typeof pi.Run,
    Str: typeof pi.Str,
    Num: typeof pi.Num,
    Arr: typeof pi.Arr,
    Obj: typeof pi.Obj,
    Mix: typeof pi.Mix,
    Hash: typeof pi.Hash,
    Signal: typeof pi.Signal,
    Locale: typeof pi.Locale,
    Cookie: typeof pi.Cookie,
    // Legacy
    Route: typeof pi.Route,
    Data: typeof pi.Data,
    // Polyfill
    Any: typeof pi.Any,
    Event: typeof pi.Event,
    UUID: typeof pi.UUID,
}
globalThis.pi = pi;

globalThis.addEventListener && globalThis.addEventListener('beforeunload', () => {
    pi.Arr.map(pi.Dom.$events, ({ el, cb, event }) => {
        return (el.removeEventListener(event, cb), null);
    });
});