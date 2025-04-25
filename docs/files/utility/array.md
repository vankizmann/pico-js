
# pi.Arr Class

A lightweight utility class for working with arrays.

```js
import { Arr } from "@kizmann/pico-js";
```

<hr>

### make
Creates an array of a given count filled with incrementing integers starting from 1.

```js
// Arr.make(count)

Arr.make(3);
// => [1, 2, 3]
```

**Arguments:**  
count `Number`: The number of elements in the new array.

**Returns:**  
`Array<Number>`: An array of integers `[1, 2, ..., count]`.

<hr>

### all
Ensures the input is always returned as an array.

```js
// Arr.all(arr)

Arr.all(5);
// => [5]

Arr.all([1, 2]);
// => [1, 2]
```

**Arguments:**  
arr `Any`: The value to wrap in an array if it isn't already.

**Returns:**  
`Array`: The original array or a single-element array.

<hr>

### get
Returns the value at a given index or a fallback if it doesn't exist.

```js
// Arr.get(arr, index, fallback = null)

Arr.get([1, 2, 3], 1);
// => 2

Arr.get([1, 2, 3], 5, null);
// => null
```

**Arguments:**  
arr `Array`: The array to query.  
index `Number`: The index to access.  
fallback `Any`: Value returned if the index is out of bounds.  

**Returns:**  
`Any`: The element at the index or the fallback.

<hr>

### set
Sets a value at the specified index of the array.

```js
// Arr.set(arr, index, value)

Arr.set([0, 2, 44], 1, 42);
// => [0, 42, 44]
```

**Arguments:**  
arr `Array`: The array to modify.  
index `Number`: The index to set.  
value `Any`: The value to assign.  

**Returns:**  
`Any`: The assigned value.

<hr>

### first
Gets the first element of the array or a fallback.

```js
// Arr.first(arr, fallback = null)

Arr.first([10, 20]);
// => 10

Arr.first([], null);
// => null
```

**Arguments:**  
arr `Array`: The array to query.  
fallback `Any`: Returned if array is empty or invalid.  

**Returns:**  
`Any`: First element or fallback.

<hr>

### second
Gets the second element of the array, falling back to the first or a fallback.

```js
// Arr.second(arr, fallback = null)

Arr.second([10, 20]);
// => 20

Arr.second([10], 'none');
// => 10
```

**Arguments:**  
arr `Array`: The array to query.  
fallback `Any`: Returned if array is empty or invalid.

**Returns:**  
`Any`: Second element or fallback.

<hr>

### third
Gets the third element, or falls back to second, first, or fallback.

```js
// Arr.third(arr, fallback = null)

Arr.third([1, 2, 3]);
// => 3

Arr.third([1], 'none');
// => 1
```

**Arguments:**  
arr `Array`: The array to query.  
fallback `Any`: Returned if array is empty or invalid.

**Returns:**  
`Any`: Third element or fallback.

<hr>

### last
Gets the last element of the array.

```js
// Arr.last(arr, fallback = null)

Arr.last([5, 6, 7]);
// => 7
```

**Arguments:**  
arr `Array`: The array to query.  
fallback `Any`: Returned if array is empty or invalid.  

**Returns:**  
`Any`: Last element or fallback.

<hr>

### prepend
Adds a value to the beginning of an array.

```js
// Arr.prepend(arr, val)

Arr.prepend([2, 3], 1);
// => [1, 2, 3]
```

**Arguments:**  
arr `Array`: The array to modify.  
val `Any`: The value to prepend.  

**Returns:**  
`Array`: The updated array.

<hr>

### append
Adds a value to the end of an array.

```js
// Arr.append(arr, val)

Arr.append([1, 2], 3);
// => [1, 2, 3]
```

**Arguments:**  
arr `Array`: The array to modify.  
val `Any`: The value to append.  

**Returns:**  
`Array`: The updated array.

<hr>

### sort
Sorts an object of keyed values by a key or a custom function.

```js
// Arr.sort(obj, key)

Arr.sort([{ val: 2 }, { val: 1 }], 'val');
// => [{ val: 1, _key: 1 }, { val: 2, _key: 0 }]
```

**Arguments:**  
obj `Object`: The object to sort.  
key `String|Function`: A key to sort by or a custom comparison function.  

**Returns:**  
`Array`: Sorted array of values, each augmented with `_key`.

<hr>

### sortString
Sorts an object’s values alphabetically by a string key.

```js
// Arr.sortString(obj, key)

Arr.sortString([{ name: "Zoe" }, { name: "Anna" }], 'name');
// => [{ name: "Anna", _key: 1 }, { name: "Zoe", _key: 0 }]
```

**Arguments:**  
obj `Object`: The object to sort.  
key `String`: Key to sort values by (case-insensitive).  

**Returns:**  
`Array`: Alphabetically sorted values.

<hr>

### filter
Filters array values by a function, object, or array.

```js
// Arr.filter(arr, filter)

Arr.filter([1, 2, 3, 4], n => n > 2);
// => [3, 4]
```

**Arguments:**  
arr `Array`: The array to filter.  
filter `Function|Object|Array`: Filter logic.  

**Returns:**  
`Array`: Filtered array.

<hr>

### filterIndex
Gets indexes of values matching a filter.

```js
// Arr.filterIndex(arr, filter)

Arr.filterIndex([1, 2, 3, 4], n => n > 2);
// => ['2', '3']
```

**Arguments:**  
arr `Array`: The array to filter.  
filter `Function|Object|Array`: Filter logic.  

**Returns:**  
`Array<Number>`: Array of indexes matching the condition.

### find
Finds the first matching value in an array.

```js
// Arr.find(arr, val, fallback)

Arr.find([1, 2, 3], 2);
// => 2
```

**Arguments:**  
arr `Array`: The array to search.  
val `Function|Object|Array`: The match condition.  
fallback `Any`: Value returned if nothing is found (default: `null`).

**Returns:**  
`Any`: The found value or fallback.

<hr>

### findIndex
Finds the index of the first matching value.

```js
// Arr.findIndex(arr, val, fallback)

Arr.findIndex([1, 2, 3], 2);
// => 1
```

**Arguments:**  
arr `Array`: The array to search.  
val `Function|Object|Array`: The match condition.  
fallback `Number`: Index returned if not found (default: `-1`).

**Returns:**  
`Number`: The index or fallback.

<hr>

### has
Checks if a value exists in an array.

```js
// Arr.has(arr, val)

Arr.has([1, 2, 3], 2);
// => true
```

**Arguments:**  
arr `Array`: The array to search.  
val `Any`: Value to check.

**Returns:**  
`boolean`: Whether the value exists.

<hr>

### add
Adds a value to the array if it doesn't exist.

```js
// Arr.add(arr, val, finder)

Arr.add([1, 2], 3);
// => [1, 2, 3]
```

**Arguments:**  
arr `Array`: The array to modify.  
val `Any`: Value to add.  
finder `Function|Object|Array`: Optional match logic.

**Returns:**  
`Array`: Updated array.

<hr>

### replace
Replaces an existing value or adds it if not found.

```js
// Arr.replace(arr, val, finder)

Arr.replace([1, 2], 2);
// => [1, 2]
```

**Arguments:**  
arr `Array`: The array to modify.  
val `Any`: Value to add or replace.  
finder `Function|Object|Array`: Optional match logic.

**Returns:**  
`Array`: Updated array.

<hr>

### remove
Removes the first matching value from the array.

```js
// Arr.remove(arr, val)

Arr.remove([1, 2, 3], 2);
// => [1, 3]
```

**Arguments:**  
arr `Array`: The array to modify.  
val `Function|Object|Array`: Match logic.

**Returns:**  
`Array`: Updated array.

<hr>

### toggle
Adds or removes a value from the array depending on its presence.

```js
// Arr.toggle(arr, val)

Arr.toggle([1, 2], 2);
// => [1]
```

**Arguments:**  
arr `Array`: The array to modify.  
val `Any`: Value to toggle.

**Returns:**  
`Array`: Updated array.

<hr>

### removeIndex
Removes an element at a specific index.

```js
// Arr.removeIndex(arr, index)

Arr.removeIndex([1, 2, 3], 1);
// => [1, 3]
```

**Arguments:**  
arr `Array`: The array to modify.  
val `Number`: Index to remove.

**Returns:**  
`Array`: Updated array.

<hr>

### insert
Inserts a value at a specific index.

```js
// Arr.insert(arr, index, val)

Arr.insert([1, 3], 1, 2);
// => [1, 2, 3]
```

**Arguments:**  
arr `Array`: The array to modify.  
key `Number`: Index to insert at.  
val `Any`: Value to insert.

**Returns:**  
`Array`: Updated array.

<hr>

### slice
Returns a shallow slice of the array.

```js
// Arr.slice(arr, index, count)

Arr.slice([1, 2, 3, 4], 1, 3);
// => [2, 3, 4]
```

**Arguments:**  
arr `Array`: The array to slice.  
key `Number`: Start index.  
count `Number`: Number of elements (default: `1`).

**Returns:**  
`Array`: Sliced portion.

<hr>

### splice
Modifies the array by removing elements.

```js
// Arr.splice(arr, index, count)

Arr.splice([1, 2, 3, 4], 1, 2);
// => [2, 3]
```

**Arguments:**  
arr `Array`: The array to modify.  
key `Number`: Start index.  
count `Number`: Number of elements to remove (default: `1`).

**Returns:**  
`Array`: Removed elements.

<hr>

### equal
Checks if two arrays have the same elements, order-independent.

```js
// Arr.equal(arr1, arr2)

Arr.equal([1, 2], [2, 1]);
// => true
```

**Arguments:**  
arr1 `Array`: First array.  
arr2 `Array`: Second array.

**Returns:**  
`boolean`: Whether arrays are equal.

<hr>

### includes
Checks if an array includes any of the provided values.

```js
// Arr.includes(arr, val)

Arr.includes(["a", "b", "c"], "b");
// => true
```

**Arguments:**  
arr `Array`: The array to check.  
val `String|Array`: Value or values to check.

**Returns:**  
`boolean`: Whether any value is included.

<hr>

### contains
Checks if all values are present in the array.

```js
// Arr.contains(arr, val)

Arr.contains(["a", "b", "c"], ["a", "b"]);
// => true
```

**Arguments:**  
arr `Array`: The array to check.  
val `Array`: Values to be contained.

**Returns:**  
`boolean`: Whether all values are found.

<hr>

### concat
Concatenates arrays into one.

```js
// Arr.concat(arr, ...args)

Arr.concat([1], [2, 3]);
// => [1, 2, 3]
```

**Arguments:**  
arr `Array`: Base array.  
args `Array[]`: Arrays to concatenate.

**Returns:**  
`Array`: Concatenated result.

<hr>

### clone
Creates a deep clone of the array or object.

```js
// Arr.clone(arr)

Arr.clone([1, 2, { a: 3 }]);
// => [1, 2, { a: 3 }]
```

**Arguments:**  
arr `Array|Object`: Data to clone.

**Returns:**  
`Array|Object`: Deep clone.

<hr>

### merge
Merges multiple arrays.

```js
// Arr.merge(arr, ...args)

Arr.merge([1], [2, 3]);
// => [1, 2, 3]
```

**Arguments:**  
arr `Array`: Base array.  
args `Array[]`: Arrays to merge.

**Returns:**  
`Array`: Merged array.

<hr>

### push
Pushes elements to the array.

```js
// Arr.push(arr, ...args)

Arr.push([1, 2], 3, 4);
// => [1, 2, 3, 4]
```

**Arguments:**  
arr `Array`: The array to modify.  
args `any[]`: Values to push.

**Returns:**  
`Array`: Updated array.

<hr>

### diff
Returns values from the first array not in the second.

```js
// Arr.diff(arr, val)

Arr.diff([1, 2, 3], [2, 3]);
// => [1]
```

**Arguments:**  
arr `Array`: Source array.  
val `Array`: Values to exclude.

**Returns:**  
`Array`: Difference.

<hr>

### intersect
Finds the intersection of multiple arrays.

```js
// Arr.intersect(...args)

Arr.intersect([1, 2], [2, 3]);
// => [2]
```

**Arguments:**  
args `Array[]`: Arrays to intersect.

**Returns:**  
`Array`: Common values.

<hr>

### chunk
Splits an array into chunks.

```js
// Arr.chunk(arr, chunk)

Arr.chunk([1, 2, 3, 4], 2);
// => [[1, 2], [3, 4]]
```

**Arguments:**  
arr `Array`: The array to chunk.  
chunk `Number`: Chunk size (default: `10`).

**Returns:**  
`Array[]`: Chunked arrays.

<hr>

### reduce
Reduces array to a value using a callback.

```js
// Arr.reduce(arr, callback, accumulator)

Arr.reduce([1, 2, 3], (a, b) => a + b, 0);
// => 6
```

**Arguments:**  
arr `Array`: The array to reduce.  
callback `Function`: Reducer function.  
accumulator `Any`: Initial value.

**Returns:**  
`Any`: Reduced value.

<hr>

### extract
Extracts nested values from objects in an array.

```js
// Arr.extract(arr, path)

Arr.extract([{ user: { id: 1 } }], 'user.id');
// => [1]
```

**Arguments:**  
arr `Array`: Array of objects.  
path `String`: Dot-notated path.

**Returns:**  
`Array`: Extracted values.

<hr>

### each
Applies a callback to each value.

```js
// Arr.each(arr, callback)

Arr.each([1, 2], n => n * 2);
// => [2, 4]
```

**Arguments:**  
arr `Array`: The array to iterate.  
callback `Function`: Applied to each value.

**Returns:**  
`Array`: Modified values.

<hr>

### map
Maps each value using a callback.

```js
// Arr.map(arr, callback)

Arr.map([1, 2], n => n + 1);
// => [2, 3]
```

**Arguments:**  
arr `Array`: The array to map.  
callback `Function`: Transformation logic.

**Returns:**  
`Array`: Mapped array.

<hr>

### recursive
Recursively applies a callback to nested values.

```js
// Arr.recursive(arr, key, callback)

Arr.recursive([{ items: [{ val: 1 }] }], 'items', v => v);
// => [{ items: [{ val: 1 }] }]
```

**Arguments:**  
arr `Array|Object`: Structure to iterate.  
key `String`: Key to recurse into.  
callback `Function`: Transformation logic.  
cascade `Array`: Track of parent objects (default: `[]`).

**Returns:**  
`Array|Object`: Recursively processed data.


