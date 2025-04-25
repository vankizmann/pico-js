# Num Class

A utility class for number operations and formatting.

```js
import { Num } from "@kizmann/pico-js";
```

<hr>

### Num.int
Converts a value to an integer, removing 'px' if present.

```js
// Num.int(num)

Num.int('123');
// => 123

Num.int('123px');
// => 123
```

**Arguments:**  
num `String|Number`: The value to convert.

**Returns:**  
`Number`: Integer representation of the value.

<hr>

### Num.float
Converts a value to a floating point number, removing 'px' if present.

```js
// Num.float(num)

Num.float('123.45');
// => 123.45

Num.float('123.45px');
// => 123.45
```

**Arguments:**  
num `String|Number`: The value to convert.

**Returns:**  
`Number`: Float representation of the value.

<hr>

### Num.ceil
Rounds a number up to the nearest integer.

```js
// Num.ceil(num)

Num.ceil(4.3);
// => 5
```

**Arguments:**  
num `Number`: The number to round up.

**Returns:**  
`Number`: Rounded up integer.

<hr>

### Num.round
Rounds a number to the nearest integer.

```js
// Num.round(num)

Num.round(4.3);
// => 4

Num.round(4.7);
// => 5
```

**Arguments:**  
num `Number`: The number to round.

**Returns:**  
`Number`: Rounded integer.

<hr>

### Num.floor
Rounds a number down to the nearest integer.

```js
// Num.floor(num)

Num.floor(4.7);
// => 4
```

**Arguments:**  
num `Number`: The number to round down.

**Returns:**  
`Number`: Rounded down integer.

<hr>

### Num.fixed
Formats a number with a fixed number of decimal places.

```js
// Num.fixed(num, fixed = 2)

Num.fixed(123.456, 2);
// => '123.46'
```

**Arguments:**  
num `Number`: The number to format.  
fixed `Number`: Number of decimal places.

**Returns:**  
`String`: Formatted number with fixed decimal places.

<hr>

### Num.random
Generates a random integer between two values.

```js
// Num.random(start = 0, end = 100)

Num.random(1, 10);
// => Random number between 1 and 10
```

**Arguments:**  
start `Number`: Lower bound (inclusive).  
end `Number`: Upper bound (inclusive).

**Returns:**  
`Number`: Random integer between start and end.

<hr>

### Num.matrix
Converts a number to a binary representation as an array of powers of 2.

```js
// Num.matrix(num, limit = 10, base = [])

Num.matrix(42);
// => [32, 8, 2]
```

**Arguments:**  
num `Number`: The number to convert.  
limit `Number`: Maximum power of 2 to consider.  
base `Array`: Initial array to add values to.

**Returns:**  
`Array`: Array of powers of 2 that sum to the input number.

<hr>

### Num.combine
Sums all numbers in an array.

```js
// Num.combine(arr)

Num.combine([1, 2, 3, 4]);
// => 10
```

**Arguments:**  
arr `Array<Number>`: Array of numbers to sum.

**Returns:**  
`Number`: Sum of all numbers in the array.

<hr>

### Num.distance
Calculates the distance between two geographical coordinates.

```js
// Num.distance(cord1, cord2, miles = false)

Num.distance({ lat: 40.7128, lng: -74.0060 }, { lat: 34.0522, lng: -118.2437 });
// => Distance in kilometers

Num.distance({ lat: 40.7128, lng: -74.0060 }, { lat: 34.0522, lng: -118.2437 }, true);
// => Distance in miles
```

**Arguments:**  
cord1 `Object`: First coordinate with lat and lng properties.  
cord2 `Object`: Second coordinate with lat and lng properties.  
miles `boolean`: Whether to return distance in miles (default: kilometers).

**Returns:**  
`Number`: Distance between the coordinates.

<hr>

### Num.format
Formats a number with thousands separators and decimal places.

```js
// Num.format(num, decimal = '.', thousand = ',', fixed = null)

Num.format(1234567.89);
// => '1,234,567.89'

Num.format(1234567.89, ',', '.', 2);
// => '1.234.567,89'
```

**Arguments:**  
num `Number`: The number to format.  
decimal `String`: Decimal separator.  
thousand `String`: Thousands separator.  
fixed `Number`: Number of decimal places, or null for auto.

**Returns:**  
`String`: Formatted number string.