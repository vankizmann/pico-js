# Cookie Class

A utility class for browser cookie management.

```js
import { Cookie } from "@kizmann/pico-js";
```

<hr>

### Cookie.get
Retrieves a cookie value from the current session.

```js
// Cookie.get(key, fallback = null, decode = 'string')

Cookie.get('user_id');
// => '123'

Cookie.get('user_id', 0, 'integer');
// => 123

Cookie.get('settings', {}, 'object');
// => { theme: 'dark', fontSize: 'medium' }
```

**Arguments:**  
key `String`: The cookie name to retrieve.  
fallback `Any`: Value returned if cookie doesn't exist.  
decode `String`: Conversion type ('string', 'boolean', 'float', 'integer', 'object', 'array').

**Returns:**  
`Any`: The cookie value converted to the specified type or fallback.

<hr>

### Cookie.set
Sets a cookie in the current session.

```js
// Cookie.set(key, value, expire = null, options = {})

Cookie.set('user_id', 123, 86400);
// => Sets cookie 'user_id' with value '123' for 24 hours

Cookie.set('settings', { theme: 'dark' }, 604800, { secure: true });
// => Sets cookie 'settings' with object value for 7 days with secure flag
```

**Arguments:**  
key `String`: The cookie name to set.  
value `Any`: The value to store in the cookie.  
expire `Number`: Expiration time in seconds from now (null for session cookie).  
options `Object`: Additional cookie options (path, domain, secure, etc.).

**Returns:**  
`undefined`

<hr>

### Cookie.forget
Removes a cookie from the current session.

```js
// Cookie.forget(key, options = {})

Cookie.forget('user_id');
// => Removes the 'user_id' cookie

Cookie.forget('settings', { domain: 'example.com' });
// => Removes the 'settings' cookie with domain option
```

**Arguments:**  
key `String`: The cookie name to remove.  
options `Object`: Additional cookie options (path, domain, etc.).

**Returns:**  
`undefined`