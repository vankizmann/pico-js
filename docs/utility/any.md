# Any Utility

The `Any` class provides a wide range of utility functions for various data type checks, conversions, and operations such as debounce and throttle. This class is part of a larger utility library and can be imported as shown below.

Here is a list of all headlines with anchor links:

- [isEmpty](#isempty)
- [isNull](#isnull)
- [isEqual](#isequal)
- [isString](#isstring)
- [isNumber](#isnumber)
- [isBool](#isbool)
- [isFunction](#isfunction)
- [isObject](#isobject)
- [isPlain](#isplain)
- [isArray](#isarray)
- [isDate](#isdate)
- [string](#string)
- [convertString](#convertstring)
- [integer](#integer)
- [float](#float)
- [bool](#bool)
- [boolean](#boolean)
- [convertBool](#convertbool)
- [convertBoolean](#convertboolean)
- [convertDatetime](#convertdatetime)
- [vals](#vals)
- [keys](#keys)
- [async](#async)
- [delay](#delay)
- [debounce](#debounce)
- [throttle](#throttle)
- [framerate](#framerate)
- [form](#form)

You can click on any of these links to navigate to the respective section in the documentation.

## Import

```javascript
import { Any } from "../index.js";
```

## Methods

### [isEmpty](#isempty)

Checks if a value is empty.

- **Parameters**:
    - `val`: The value to check.
- **Returns**: `true` if the value is empty, `false` otherwise.

```javascript
Any.isEmpty(''); // true
Any.isEmpty([]); // true
Any.isEmpty({}); // true
Any.isEmpty(0);  // false
```

### [isNull](#isnull)

Checks if a value is `null`.

- **Parameters**:
    - `val`: The value to check.
- **Returns**: `true` if the value is `null`, `false` otherwise.

```javascript
Any.isNull(null); // true
Any.isNull(undefined); // false
```

### [isEqual](#isequal)

Checks if two values are equal.

- **Parameters**:
    - `obj`: The first value.
    - `val`: The second value.
- **Returns**: `true` if the values are equal, `false` otherwise.

```javascript
Any.isEqual(1, '1'); // false
Any.isEqual({a: 1}, {a: 1}); // true
```

### [isString](#isstring)

Checks if a value is a string.

- **Parameters**:
    - `val`: The value to check.
- **Returns**: `true` if the value is a string, `false` otherwise.

```javascript
Any.isString('hello'); // true
Any.isString(123); // false
```

### [isNumber](#isnumber)

Checks if a value is a number or a numeric string.

- **Parameters**:
    - `val`: The value to check.
- **Returns**: `true` if the value is a number or numeric string, `false` otherwise.

```javascript
Any.isNumber(123); // true
Any.isNumber('123'); // true
Any.isNumber('abc'); // false
```

### [isBool](#isbool)

Checks if a value is a boolean or a boolean string.

- **Parameters**:
    - `val`: The value to check.
- **Returns**: `true` if the value is a boolean or boolean string, `false` otherwise.

```javascript
Any.isBool(true); // true
Any.isBool('false'); // true
Any.isBool('yes'); // false
```

### [isFunction](#isfunction)

Checks if a value is a function.

- **Parameters**:
    - `val`: The value to check.
- **Returns**: `true` if the value is a function, `false` otherwise.

```javascript
Any.isFunction(function() {}); // true
Any.isFunction(() => {}); // true
```

### [isObject](#isobject)

Checks if a value is an object.

- **Parameters**:
    - `val`: The value to check.
- **Returns**: `true` if the value is an object, `false` otherwise.

```javascript
Any.isObject({}); // true
Any.isObject(null); // false
```

### [isPlain](#isplain)

Checks if a value is a plain object.

- **Parameters**:
    - `val`: The value to check.
- **Returns**: `true` if the value is a plain object, `false` otherwise.

```javascript
Any.isPlain({}); // true
Any.isPlain(new Date()); // false
```

### [isArray](#isarray)

Checks if a value is an array.

- **Parameters**:
    - `val`: The value to check.
- **Returns**: `true` if the value is an array, `false` otherwise.

```javascript
Any.isArray([]); // true
Any.isArray({}); // false
```

### [isDate](#isdate)

Checks if a value is a `Date` object.

- **Parameters**:
    - `val`: The value to check.
- **Returns**: `true` if the value is a `Date` object, `false` otherwise.

```javascript
Any.isDate(new Date()); // true
Any.isDate('2021-01-01'); // false
```

### [string](#string)

Converts a value to a string.

- **Parameters**:
    - `val`: The value to convert.
- **Returns**: The value as a string.

```javascript
Any.string(123); // '123'
```

### [convertString](#convertstring)

Converts a value to a string or returns a default string if the value is empty.

- **Parameters**:
    - `val`: The value to convert.
    - `empty`: The default string if the value is empty (default is `'-'`).
- **Returns**: The value as a string or the default string if empty.

```javascript
Any.convertString(123); // '123'
Any.convertString('', '-'); // '-'
```

### [integer](#integer)

Converts a value to an integer.

- **Parameters**:
    - `val`: The value to convert.
- **Returns**: The value as an integer.

```javascript
Any.integer('123'); // 123
```

### [float](#float)

Converts a value to a float.

- **Parameters**:
    - `val`: The value to convert.
- **Returns**: The value as a float.

```javascript
Any.float('123.45'); // 123.45
```

### [bool](#bool)

Converts a value to a boolean.

- **Parameters**:
    - `val`: The value to convert.
- **Returns**: The value as a boolean.

```javascript
Any.bool('true'); // true
Any.bool(0); // false
```

### [boolean](#boolean)

Alias for `bool`.

- **Parameters**:
    - `val`: The value to convert.
- **Returns**: The value as a boolean.

```javascript
Any.boolean('yes'); // true
Any.boolean('no'); // false
```

### [convertBool](#convertbool)

Converts a value to a boolean string representation.

- **Parameters**:
    - `val`: The value to convert.
    - `yes`: The string to return if the value is truthy (default is `'Yes'`).
    - `no`: The string to return if the value is falsy (default is `'No'`).
- **Returns**: The string representation of the boolean value.

```javascript
Any.convertBool(true); // 'Yes'
Any.convertBool(false); // 'No'
```

### [convertBoolean](#convertboolean)

Alias for `convertBool`.

- **Parameters**:
    - `val`: The value to convert.
    - `yes`: The string to return if the value is truthy (default is `'Yes'`).
    - `no`: The string to return if the value is falsy (default is `'No'`).
- **Returns**: The string representation of the boolean value.

```javascript
Any.convertBoolean('1'); // 'Yes'
Any.convertBoolean('0'); // 'No'
```

### [convertDatetime](#convertdatetime)

Converts a value to a formatted datetime string.

- **Parameters**:
    - `val`: The value to convert.
    - `format`: The datetime format (default is `'YYYY-MM-DD hh:mm:ss'`).
    - `empty`: The default string if the value is empty (default is `'-'`).
- **Returns**: The formatted datetime string or the default string if empty.

```javascript
Any.convertDatetime(new Date(), 'MM/DD/YYYY'); // '05/28/2024'
```

### [vals](#vals)

Gets the values of an object.

- **Parameters**:
    - `obj`: The object to get values from.
- **Returns**: An array of the object's values.

```javascript
Any.vals({a: 1, b: 2}); // [1, 2]
```

### [keys](#keys)

Gets the keys of an object.

- **Parameters**:
    - `obj`: The object to get keys from.
- **Returns**: An array of the object's keys.

```javascript
Any.keys({a: 1, b: 2}); // ['a', 'b']
```

### [async](#async)

Executes a callback asynchronously.

- **Parameters**:
    - `callback`: The callback function.
    - `...args`: The arguments to pass to the callback.
- **Returns**: The `Any` class.

```javascript
Any.async(() => console.log('Async call'));
```

### [delay](#delay)

Executes a callback after a delay.

- **Parameters**:
    - `callback`: The callback function.
    - `delay`: The delay in milliseconds (default is `100`).
    - `...args`: The arguments to pass to the callback.
- **Returns**: The `Any` class.

```javascript
Any.delay(() => console.log('Delayed call'), 500);
```

### [debounce](#debounce)

Creates a debounced function that delays invoking the callback

until after the specified delay.

- **Parameters**:
    - `callback`: The callback function.
    - `delay`: The delay in milliseconds (default is `100`).
    - `ref`: Optional reference to store the debounce timer.
- **Returns**: A debounced function.

```javascript
const debouncedFn = Any.debounce(() => console.log('Debounced call'), 300);
debouncedFn();
```

### [throttle](#throttle)

Creates a throttled function that only invokes the callback at most once per every specified delay.

- **Parameters**:
    - `callback`: The callback function.
    - `delay`: The delay in milliseconds (default is `100`).
    - `ref`: Optional reference to store the throttle state.
- **Returns**: A throttled function.

```javascript
const throttledFn = Any.throttle(() => console.log('Throttled call'), 300);
throttledFn();
```

### [framerate](#framerate)

Creates a function that invokes the callback at a specified frame rate.

- **Parameters**:
    - `callback`: The callback function.
    - `rate`: The frame rate in frames per second (default is `30`).
    - `ref`: Optional reference to store the last invocation time.
- **Returns**: A function that enforces the specified frame rate.

```javascript
const frameRateFn = Any.framerate(() => console.log('Frame rate call'), 60);
frameRateFn();
```

### [form](#form)

Creates a `FormData` object from a plain object.

- **Parameters**:
    - `obj`: The plain object to convert.
- **Returns**: A `FormData` object.

```javascript
const formData = Any.form({a: 1, b: 2});
```

## License

This documentation is based on the source code of the `Any` class. The `Any` class is part of a utility library. Please refer to the library's license for more information.
```