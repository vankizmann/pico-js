import * as pi from "#src/index.esm.js";

// Force immediate global access
if (typeof globalThis !== 'undefined') {
    if ( globalThis.pi === undefined ) {
        globalThis.pi = pi;
    } else {
        globalThis.pix = pi;
    }
}