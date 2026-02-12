# Any Class

A utility class for type checking and conversion operations.

```js
import { Any } from "@kizmann/pico-js";
```

<hr>

### Any.isEmpty
Checks if a value is empty based on its type.

```js
// Any.isEmpty(val)

Mixed.isEmpty('');
// => true

Mixed.isEmpty([]);
// => true

Mixed.isEmpty(0);
// => false
```

**Arguments:**  
val `Any`: The value to check.

**Returns:**  
`boolean`: Whether the value is empty.

<hr>

### Any.isNull
Checks if a value is strictly null.

```js
// Any.isNull(val)

Mixed.isNull(null);
// => true

Mixed.isNull(undefined);
// => false
```

**Arguments:**  
val `Any`: The value to check.

**Returns:**  
`boolean`: Whether the value is null.

<hr>

### Any.isEqual
Checks if two values are equal with special handling for objects and DOM nodes.

```js
// Any.isEqual(obj, val)

Mixed.isEqual('test', 'test');
// => true
```

**Arguments:**  
obj `Any`: First value to compare.  
val `Any`: Second value to compare.

**Returns:**  
`boolean`: Whether the values are equal.

<hr>

### Any.isString
Checks if a value is a string.

```js
// Any.isString(val)

Mixed.isString('test');
// => true
```

**Arguments:**  
val `Any`: The value to check.

**Returns:**  
`boolean`: Whether the value is a string.

<hr>

### Any.isNumber
Checks if a value is a number or numeric string.

```js
// Any.isNumber(val)

Mixed.isNumber(5);
// => true

Mixed.isNumber('123');
// => true
```

**Arguments:**  
val `Any`: The value to check.

**Returns:**  
`boolean`: Whether the value is a number.

<hr>

### Any.isBool
Checks if a value is a boolean or boolean string.

```js
// Any.isBool(val)

Mixed.isBool(true);
// => true

Mixed.isBool('false');
// => true
```

**Arguments:**  
val `Any`: The value to check.

**Returns:**  
`boolean`: Whether the value is a boolean.

<hr>

### Any.isFunction
Checks if a value is a function.

```js
// Any.isFunction(val)

Mixed.isFunction(() => {
});
// => true
```

**Arguments:**  
val `Any`: The value to check.

**Returns:**  
`boolean`: Whether the value is a function.

<hr>

### Any.isObject
Checks if a value is an object.

```js
// Any.isObject(val)

Mixed.isObject({});
// => true

Mixed.isObject(null);
// => false
```

**Arguments:**  
val `Any`: The value to check.

**Returns:**  
`boolean`: Whether the value is an object.

<hr>

### Any.isPlain
Checks if a value is a plain JavaScript object.

```js
// Any.isPlain(val)

Mixed.isPlain({});
// => true

Mixed.isPlain([]);
// => false
```

**Arguments:**  
val `Any`: The value to check.

**Returns:**  
`boolean`: Whether the value is a plain object.

<hr>

### Any.isArray
Checks if a value is an array.

```js
// Any.isArray(val)

Mixed.isArray([]);
// => true
```

**Arguments:**  
val `Any`: The value to check.

**Returns:**  
`boolean`: Whether the value is an array.

<hr>

### Any.isDate
Checks if a value is a Date object.

```js
// Any.isDate(val)

Mixed.isDate(new Date());
// => true
```

**Arguments:**  
val `Any`: The value to check.

**Returns:**  
`boolean`: Whether the value is a Date.

<hr>

### Any.string
Converts a value to a string.

```js
// Any.string(val)

Mixed.string(123);
// => '123'
```

**Arguments:**  
val `Any`: The value to convert.

**Returns:**  
`String`: String representation of the value.

<hr>

### Any.number
Converts a value to a number with fallback for invalid values.

```js
// Any.number(val, fallback = NaN)

Mixed.number('123');
// => 123

Mixed.number('abc', 0);
// => 0
```

**Arguments:**  
val `Any`: The value to convert.  
fallback `Number`: Fallback for invalid numbers.

**Returns:**  
`Number`: Numeric representation or fallback.

<hr>

### Any.integer
Converts a value to an integer.

```js
// Any.integer(val)

Mixed.integer('123');
// => 123
```

**Arguments:**  
val `Any`: The value to convert.

**Returns:**  
`Number`: Integer representation or NaN.

<hr>

### Any.float
Converts a value to a floating point number.

```js
// Any.float(val)

Mixed.float('12.5');
// => 12.5

Mixed.float('12,5');
// => 12.5
```

**Arguments:**  
val `Any`: The value to convert.

**Returns:**  
`Number`: Float representation or NaN.

<hr>

### Any.bool
Converts a value to a boolean.

```js
// Any.bool(val)

Mixed.bool('yes');
// => true

Mixed.bool(0);
// => false
```

**Arguments:**  
val `Any`: The value to convert.

**Returns:**  
`boolean`: Boolean representation.

<hr>

### Any.boolean
Alias for bool method. Converts a value to a boolean.

```js
// Any.boolean(val)

Mixed.boolean('true');
// => true
```

**Arguments:**  
val `Any`: The value to convert.

**Returns:**  
`boolean`: Boolean representation.

<hr>

### Any.convertString
Converts a value to a string or returns a fallback for empty values.

```js
// Any.convertString(val, empty = '-')

Mixed.convertString('', '-');
// => '-'
```

**Arguments:**  
val `Any`: The value to convert.  
empty `String`: Fallback for empty values.

**Returns:**  
`String`: String representation or fallback.

<hr>

### Any.convertBool
Converts a boolean value to a string representation.

```js
// Any.convertBool(val, yes = 'Yes', no = 'No')

Mixed.convertBool(true, 'Yes', 'No');
// => 'Yes'
```

**Arguments:**  
val `Any`: The value to convert.  
yes `String`: Text for true values.  
no `String`: Text for false values.

**Returns:**  
`String`: String representation.

<hr>

### Any.convertBoolean
Alias for convertBool. Converts a boolean value to a string representation.

```js
// Any.convertBoolean(val, yes = 'Yes', no = 'No')

Mixed.convertBoolean(false, 'Yes', 'No');
// => 'No'
```

**Arguments:**  
val `Any`: The value to convert.  
yes `String`: Text for true values.  
no `String`: Text for false values.

**Returns:**  
`String`: String representation.

<hr>

### Any.convertDatetime
Formats a date value with a specified format.

```js
// Any.convertDatetime(val, format = 'YYYY-MM-DD hh:mm:ss', empty = '-')

Mixed.convertDatetime(new Date(2023, 0, 1), 'MM/DD/YYYY');
// => '01/01/2023'
```

**Arguments:**  
val `Date|String|Number`: The date to format.  
format `String`: Date format string.  
empty `String`: Text for empty values.

**Returns:**  
`String`: Formatted date or fallback.

<hr>

### Any.vals
Gets all values from an object.

```js
// Any.vals(obj)

Mixed.vals({ a: 1, b: 2 });
// => [1, 2]
```

**Arguments:**  
obj `Object`: The object to extract from.

**Returns:**  
`Array`: Array of object values.

<hr>

### Any.keys
Gets all keys from an object.

```js
// Any.keys(obj)

Mixed.keys({ a: 1, b: 2 });
// => ['a', 'b']
```

**Arguments:**  
obj `Object`: The object to extract from.

**Returns:**  
`Array`: Array of object keys.

<hr>

### Any.async
Executes a callback asynchronously on the next tick.

```js
// Any.async(callback, ...args)

Mixed.async(console.log, 'Hello');
// => Logs 'Hello' asynchronously
```

**Arguments:**  
callback `Function`: Function to execute.  
args `Any[]`: Arguments to pass to the callback.

**Returns:**  
`Any`: The Any instance for chaining.

<hr>

### Any.delay
Executes a callback after a specified delay.

```js
// Any.delay(callback, delay = 100, ...args)

Mixed.delay(console.log, 500, 'Delayed');
// => Logs 'Delayed' after 500ms
```

**Arguments:**  
callback `Function`: Function to execute.  
delay `Number`: Milliseconds to wait.  
args `Any[]`: Arguments to pass to the callback.

**Returns:**  
`Any`: The Any instance for chaining.

<hr>

### Any.debounce
Creates a debounced version of a function.

```js
// Any.debounce(callback, delay = 100, ref = null)

const debouncedSearch = Mixed.debounce(searchFn, 300);
```

**Arguments:**  
callback `Function`: Function to debounce.  
delay `Number`: Milliseconds to wait.  
ref `Function`: Optional reference holder function.

**Returns:**  
`Function`: Debounced function.

<hr>

### Any.throttle
Creates a throttled version of a function.

```js
// Any.throttle(callback, delay = 100, ref = null)

const throttledScroll = Mixed.throttle(scrollHandler, 200);
```

**Arguments:**  
callback `Function`: Function to throttle.  
delay `Number`: Milliseconds to limit calls.  
ref `Function`: Optional reference holder function.

**Returns:**  
`Function`: Throttled function.

<hr>

### Any.framerate
Limits a function to execute at a specific frame rate.

```js
// Any.framerate(callback, rate = 30, ref = null)

const animationFn = Mixed.framerate(updateAnimation, 60);
```

**Arguments:**  
callback `Function`: Function to limit.  
rate `Number`: Maximum calls per second.  
ref `Function`: Optional reference holder function.

**Returns:**  
`Function`: Frame-limited function.

<hr>

### Any.form
Converts an object to FormData, handling nested objects and arrays.

```js
// Any.form(obj)

Mixed.form({ user: { name: 'John' } });
// => FormData with 'user[name]' field
```

**Arguments:**  
obj `Object`: Data to convert.

**Returns:**  
`FormData`: Form data representation of the object.