# Str Class

A utility class for string manipulation and conversion operations.

```js
import { Str } from "@kizmann/pico-js";
```

<hr>

### Str.regexEscape
Escapes special characters for use in regular expressions.

```js
// Str.regexEscape(val)

Str.regexEscape('hello(world)');
// => 'hello\\(world\\)'
```

**Arguments:**  
val `String`: The string to escape.

**Returns:**  
`String`: Escaped string safe for regex.

<hr>

### Str.upper
Converts a string to uppercase.

```js
// Str.upper(val)

Str.upper('hello');
// => 'HELLO'
```

**Arguments:**  
val `String`: The string to convert.

**Returns:**  
`String`: Uppercase string.

<hr>

### Str.lower
Converts a string to lowercase.

```js
// Str.lower(val)

Str.lower('HELLO');
// => 'hello'
```

**Arguments:**  
val `String`: The string to convert.

**Returns:**  
`String`: Lowercase string.

<hr>

### Str.camelcase
Converts a string to camelCase format.

```js
// Str.camelcase(val)

Str.camelcase('hello world');
// => 'helloWorld'
```

**Arguments:**  
val `String`: The string to convert.

**Returns:**  
`String`: camelCase formatted string.

<hr>

### Str.humancase
Converts a string to Title Case format with spaces.

```js
// Str.humancase(val)

Str.humancase('hello-world');
// => 'Hello World'
```

**Arguments:**  
val `String`: The string to convert.

**Returns:**  
`String`: Title Case formatted string.

<hr>

### Str.slugify
Converts a string to a URL-friendly slug.

```js
// Str.slugify(val)

Str.slugify('Hello World!');
// => 'hello-world'
```

**Arguments:**  
val `String`: The string to convert.

**Returns:**  
`String`: URL-friendly slug.

<hr>

### Str.ucfirst
Capitalizes the first character of a string.

```js
// Str.ucfirst(val)

Str.ucfirst('hello');
// => 'Hello'
```

**Arguments:**  
val `String`: The string to convert.

**Returns:**  
`String`: String with first character capitalized.

<hr>

### Str.lcfirst
Lowercases the first character of a string.

```js
// Str.lcfirst(val)

Str.lcfirst('Hello');
// => 'hello'
```

**Arguments:**  
val `String`: The string to convert.

**Returns:**  
`String`: String with first character lowercased.

<hr>

### Str.has
Checks if a string contains a substring (case-insensitive).

```js
// Str.has(val, search)

Str.has('Hello World', 'world');
// => true
```

**Arguments:**  
val `String`: The string to search in.  
search `String`: The substring to look for.

**Returns:**  
`boolean`: Whether the substring exists.

<hr>

### Str.filesize
Formats a number of bytes into a human-readable file size.

```js
// Str.filesize(val, decimals = 1)

Str.filesize(1024);
// => '1.0 KB'
```

**Arguments:**  
val `Number`: The size in bytes.  
decimals `Number`: Number of decimal places.

**Returns:**  
`String`: Human-readable file size.

<hr>

### Str.array
Converts a string representation to an array.

```js
// Str.array(value, fallback = [])

Str.array('@[a,b,c]');
// => ['a', 'b', 'c']
```

**Arguments:**  
value `String`: The string to convert.  
fallback `Array`: Default value if string is empty.

**Returns:**  
`Array`: Converted array.

<hr>

### Str.real
Converts a string to its real data type.

```js
// Str.real(value)

Str.real('123');
// => 123

Str.real('true');
// => true
```

**Arguments:**  
value `String`: The string to convert.

**Returns:**  
`Any`: Value converted to appropriate type.

<hr>

### Str.objectify
Parses a string into an object using various formats.

```js
// Str.objectify(value, mode = 'options', isArray = false)

Str.objectify('foo:bar;test:lorem', 'options');
// => { foo: 'bar', test: 'lorem' }
```

**Arguments:**  
value `String|Object`: The string to parse.  
mode `String`: Parse mode ('options', 'params', or 'json').  
isArray `boolean`: Whether to return an array of values.

**Returns:**  
`Object|Array`: Parsed object or array.

<hr>

### Str.stringify
Converts an object to a string using various formats.

```js
// Str.stringify(value, mode = 'options')

Str.stringify({ foo: 'bar', test: 'lorem' }, 'options');
// => 'foo:bar;test:lorem;'
```

**Arguments:**  
value `Object|String`: The object to convert.  
mode `String`: Conversion mode ('options', 'params', or 'json').

**Returns:**  
`String`: String representation of the object.

<hr>

### Str.options
Converts an object to a string using key:value;key2:value2 format.

```js
// Str.options(params, quota = null)

Str.options({ foo: 'bar', test: 'lorem' });
// => 'foo:bar;test:lorem;'
```

**Arguments:**  
params `Object`: The object to convert.  
quota `String`: Optional namespace prefix.

**Returns:**  
`String`: Options string representation.

<hr>

### Str.fromOptions
Parses an options string into an object.

```js
// Str.fromOptions(value, isArray = false)

Str.fromOptions('foo:bar;test:lorem');
// => { foo: 'bar', test: 'lorem' }
```

**Arguments:**  
value `String`: The options string to parse.  
isArray `boolean`: Whether to return an array of values.

**Returns:**  
`Object|Array`: Parsed object or array.

<hr>

### Str.convertFromOptions
Helper method for fromOptions to process a single option match.

```js
// Str.convertFromOptions(result, match)

// Internal use for processing regex matches
```

**Arguments:**  
result `Object`: Accumulating result object.  
match `String`: Regex match for a single option.

**Returns:**  
`Object`: Updated result with processed match.

<hr>

### Str.params
Converts an object to a URL query string.

```js
// Str.params(params, quota = null)

Str.params({ foo: 'bar', test: 'lorem' });
// => 'foo=bar&test=lorem'
```

**Arguments:**  
params `Object`: The object to convert.  
quota `String`: Optional namespace prefix.

**Returns:**  
`String`: URL query string.

<hr>

### Str.fromParams
Parses a URL query string into an object.

```js
// Str.fromParams(value, isArray = false)

Str.fromParams('foo=bar&test=lorem');
// => { foo: 'bar', test: 'lorem' }
```

**Arguments:**  
value `String`: The query string to parse.  
isArray `boolean`: Whether to return an array of values.

**Returns:**  
`Object|Array`: Parsed object or array.

<hr>

### Str.convertFromParams
Helper method for fromParams to process a single parameter match.

```js
// Str.convertFromParams(result, match)

// Internal use for processing regex matches
```

**Arguments:**  
result `Object`: Accumulating result object.  
match `String`: Regex match for a single parameter.

**Returns:**  
`Object`: Updated result with processed match.