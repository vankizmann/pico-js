# Obj Class

A utility class for working with objects.

```js
import { Obj } from "@kizmann/pico-js";
```

<hr>

### Obj.has
Checks if a nested property exists in an object.

```js
// Obj.has(obj, keys)

Obj.has({ user: { id: 1 } }, 'user.id');
// => true
```

**Arguments:**  
obj `Object`: The object to check.  
keys `String|Array`: Dot-notation path or array of keys.

**Returns:**  
`boolean`: Whether the property exists.

<hr>

### Obj.empty
Checks if a property value is empty.

```js
// Obj.empty(obj, key)

Obj.empty({ user: {} }, 'user');
// => true
```

**Arguments:**  
obj `Object`: The object to check.  
key `String|Array`: The property path.

**Returns:**  
`boolean`: Whether the value is empty.

<hr>

### Obj.get
Gets a property value by path or returns a fallback.

```js
// Obj.get(obj, keys, fallback = null)

Obj.get({ user: { name: 'John' } }, 'user.name');
// => 'John'

Obj.get({ user: {} }, 'user.name', 'Unknown');
// => 'Unknown'
```

**Arguments:**  
obj `Object`: The object to query.  
keys `String|Array`: The property path.  
fallback `Any`: Value returned if property doesn't exist.

**Returns:**  
`Any`: The property value or fallback.

<hr>

### Obj.set
Sets a property value at a specific path, creating objects as needed.

```js
// Obj.set(obj, keys, val)

Obj.set({}, 'user.name', 'John');
// => { user: { name: 'John' } }
```

**Arguments:**  
obj `Object`: The object to modify.  
keys `String|Array`: The property path.  
val `Any`: The value to set.

**Returns:**  
`Object`: The modified object.

<hr>

### Obj.unset
Removes a property at a specific path.

```js
// Obj.unset(obj, keys)

Obj.unset({ user: { name: 'John', age: 30 } }, 'user.name');
// => { user: { age: 30 } }
```

**Arguments:**  
obj `Object`: The object to modify.  
keys `String|Array`: The property path.

**Returns:**  
`Object`: The modified object.

<hr>

### Obj.pluck
Retrieves a property value and then removes it from the object.

```js
// Obj.pluck(obj, keys, fallback = null)

Obj.pluck({ user: { name: 'John' } }, 'user.name');
// => 'John' (and modifies original object to { user: {} })
```

**Arguments:**  
obj `Object`: The object to modify.  
keys `String|Array`: The property path.  
fallback `Any`: Value returned if property doesn't exist.

**Returns:**  
`Any`: The removed property value or fallback.

<hr>

### Obj.only
Creates a new object with only the specified properties.

```js
// Obj.only(obj, keys, assign = null)

Obj.only({ id: 1, name: 'John', age: 30 }, ['id', 'name']);
// => { id: 1, name: 'John' }
```

**Arguments:**  
obj `Object`: The source object.  
keys `Array`: Keys to include.  
assign `Object`: Optional additional properties to assign.

**Returns:**  
`Object`: New object with selected properties.

<hr>

### Obj.except
Creates a new object excluding the specified properties.

```js
// Obj.except(obj, keys, assign = null)

Obj.except({ id: 1, name: 'John', age: 30 }, ['age']);
// => { id: 1, name: 'John' }
```

**Arguments:**  
obj `Object`: The source object.  
keys `Array`: Keys to exclude.  
assign `Object`: Optional additional properties to assign.

**Returns:**  
`Object`: New object without excluded properties.

<hr>

### Obj.includes
Checks if an object includes all properties from another object.

```js
// Obj.includes(obj, val)

Obj.includes({ id: 1, name: 'John' }, { id: 1 });
// => true
```

**Arguments:**  
obj `Object`: The object to check.  
val `Object`: Properties to look for.

**Returns:**  
`boolean`: Whether all properties are included.

<hr>

### Obj.matches
Checks if object properties match another object's properties.

```js
// Obj.matches(obj, val)

Obj.matches({ user: { id: 1 } }, { user: { id: 1 } });
// => true
```

**Arguments:**  
obj `Object`: The object to check.  
val `Object`: Properties to match against.

**Returns:**  
`boolean`: Whether properties match.

<hr>

### Obj.sort
Sorts object values by a key or custom function.

```js
// Obj.sort(obj, key)

Obj.sort({ a: { val: 2 }, b: { val: 1 } }, 'val');
// => [{ val: 1, _key: 'b' }, { val: 2, _key: 'a' }]
```

**Arguments:**  
obj `Object`: The object to sort.  
key `String|Function`: Property to sort by or comparison function.

**Returns:**  
`Array`: Sorted array of values, each with `_key` property.

<hr>

### Obj.sortString
Sorts object values alphabetically by a string key.

```js
// Obj.sortString(obj, key)

Obj.sortString({ a: { name: 'Zoe' }, b: { name: 'Anna' } }, 'name');
// => [{ name: 'Anna', _key: 'b' }, { name: 'Zoe', _key: 'a' }]
```

**Arguments:**  
obj `Object`: The object to sort.  
key `String`: Property to sort by (case-insensitive).

**Returns:**  
`Array`: Alphabetically sorted values with `_key` property.

<hr>

### Obj.filter
Filters object properties by a condition.

```js
// Obj.filter(obj, filter)

Obj.filter({ a: 1, b: 2, c: 3 }, val => val > 1);
// => { b: 2, c: 3 }
```

**Arguments:**  
obj `Object`: The object to filter.  
filter `Function|Object|Array`: Filter condition.

**Returns:**  
`Object`: Filtered object.

<hr>

### Obj.filterIndex
Gets keys of properties that match a filter condition.

```js
// Obj.filterIndex(obj, filter)

Obj.filterIndex({ a: 1, b: 2, c: 3 }, val => val > 1);
// => ['b', 'c']
```

**Arguments:**  
obj `Object`: The object to filter.  
filter `Function|Object|Array`: Filter condition.

**Returns:**  
`Array<String>`: Keys that match the condition.

<hr>

### Obj.find
Finds the first matching value in an object.

```js
// Obj.find(obj, filter, fallback = null)

Obj.find({ users: [{ id: 1 }, { id: 2 }] }, { id: 1 });
// => { id: 1 }
```

**Arguments:**  
obj `Object`: The object to search.  
filter `Function|Object|Array`: Match condition.  
fallback `Any`: Value returned if nothing is found.

**Returns:**  
`Any`: The found value or fallback.

<hr>

### Obj.findIndex
Finds the key of the first matching value.

```js
// Obj.findIndex(obj, filter, fallback = -1)

Obj.findIndex({ a: 1, b: 2 }, val => val === 2);
// => 'b'
```

**Arguments:**  
obj `Object`: The object to search.  
filter `Function|Object|Array`: Match condition.  
fallback `Any`: Value returned if nothing is found.

**Returns:**  
`String|Number`: The found key or fallback.

<hr>

### Obj.clone
Creates a deep clone of an object.

```js
// Obj.clone(obj)

Obj.clone({ user: { name: 'John' } });
// => { user: { name: 'John' } } (new reference)
```

**Arguments:**  
obj `Object`: The object to clone.

**Returns:**  
`Object`: Deep clone of the object.

<hr>

### Obj.assign
Assigns properties from one or more source objects.

```js
// Obj.assign(...args)

Obj.assign({ id: 1 }, { name: 'John' }, { age: 30 });
// => { id: 1, name: 'John', age: 30 }
```

**Arguments:**  
args `Object[]`: Objects to merge.

**Returns:**  
`Object`: Combined object.

<hr>

### Obj.remove
Removes multiple properties from an object.

```js
// Obj.remove(obj, keys)

Obj.remove({ id: 1, name: 'John', age: 30 }, ['name', 'age']);
// => { id: 1 }
```

**Arguments:**  
obj `Object`: The object to modify.  
keys `Array`: Keys to remove.

**Returns:**  
`Object`: Modified object.

<hr>

### Obj.each
Iterates over object properties and applies a callback.

```js
// Obj.each(obj, callback)

Obj.each({ a: 1, b: 2 }, (val, key) => console.log(key, val));
// => Logs "a 1" and "b 2"
```

**Arguments:**  
obj `Object`: The object to iterate.  
callback `Function`: Called with (value, key) for each property.

**Returns:**  
`Object`: Object of callback results.

<hr>

### Obj.map
Transforms object properties using a callback.

```js
// Obj.map(obj, callback)

Obj.map({ a: 1, b: 2 }, val => val * 2);
// => { a: 2, b: 4 }
```

**Arguments:**  
obj `Object`: The object to transform.  
callback `Function`: Called with (value, key) for each property.

**Returns:**  
`Object`: Transformed object.

<hr>

### Obj.values
Extracts all values from an object into an array.

```js
// Obj.values(obj)

Obj.values({ a: 1, b: 2, c: 3 });
// => [1, 2, 3]
```

**Arguments:**  
obj `Object`: The object to extract from.

**Returns:**  
`Array`: Array of object values.

<hr>

### Obj.flatten
Creates a flattened object with dot notation keys.

```js
// Obj.flatten(obj)

Obj.flatten({ user: { name: 'John', details: { age: 30 } } });
// => { 'user.name': 'John', 'user.details.age': 30 }
```

**Arguments:**  
obj `Object`: The object to flatten.

**Returns:**  
`Object`: Flattened object with dot notation paths as keys.