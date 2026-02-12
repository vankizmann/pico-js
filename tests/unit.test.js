
if ( typeof window === 'undefined' ) {
    globalThis.chrome = true;
}

globalThis.testobj = {
    'foo.bar': 'foobar',
};

testobj.not = {
    you: null, don: undefined
};

testobj.arr = ['av', 'bv'];

globalThis.getobj = () => {
    return { ...testobj };
}

globalThis.testarr = [];

globalThis.getarr = () => {
    return [ ...testarr ];
}

globalThis.form = new FormData();

globalThis.form.append('a', 'v1');
globalThis.form.append('b', 'v2');
globalThis.form.append('c', 'v2');

import("./unit/Locale.unit.test.js");
import("./unit/Hash.unit.test.js");
import("./unit/Object.unit.test.js");
import("./unit/Mixed.unit.test.js");
