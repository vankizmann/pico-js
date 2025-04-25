# Locale Class

A utility class for internationalization and localization.

```js
import { Locale } from "@kizmann/pico-js";
```

<hr>

### Locale.has
Checks if a translation key exists in the locales.

```js
// Locale.has(key)

Locale.has('messages.welcome');
// => true if the translation key exists
```

**Arguments:**  
key `String`: The translation key to check.

**Returns:**  
`boolean`: Whether the key exists in locales.

<hr>

### Locale.get
Gets a translation value for a key.

```js
// Locale.get(key, fallback = null)

Locale.get('messages.welcome');
// => 'Welcome to our application'

Locale.get('messages.unknown', 'Default message');
// => 'Default message' if the key doesn't exist
```

**Arguments:**  
key `String`: The translation key.  
fallback `String`: Value returned if key doesn't exist (defaults to key itself).

**Returns:**  
`String`: The translation or fallback.

<hr>

### Locale.set
Sets a translation value for a key.

```js
// Locale.set(key, value)

Locale.set('messages.welcome', 'Welcome to our application');
```

**Arguments:**  
key `String`: The translation key.  
value `String`: The translation value.

**Returns:**  
`Locale`: The Locale class for chaining.

<hr>

### Locale.trans
Translates a key with variable replacements.

```js
// Locale.trans(key, values = {})

// Translation: 'Hello, :name!'
Locale.trans('messages.greeting', { name: 'John' });
// => 'Hello, John!'
```

**Arguments:**  
key `String`: The translation key.  
values `Object`: Variables to replace in the translation.

**Returns:**  
`String`: The translated string with replacements.

<hr>

### Locale.choice
Selects a translation variation based on a count.

```js
// Locale.choice(key, count = 0, values = {})

// Translation: 'No items|One item|Many items'
Locale.choice('messages.items', 0);
// => 'No items'

Locale.choice('messages.items', 1);
// => 'One item'

Locale.choice('messages.items', 5);
// => 'Many items'

// Translation: 'You have :count messages'
Locale.choice('messages.count', 3);
// => 'You have 3 messages'
```

**Arguments:**  
key `String`: The translation key.  
count `Number`: The count to determine which variation to use.  
values `Object`: Variables to replace in the translation.

**Returns:**  
`String`: The selected translation with replacements.

<hr>

### Locale.pickByCount
Helper method to select the appropriate translation based on count.

```js
// Locale.pickByCount(splits, count)

Locale.pickByCount(['No items', 'One item', 'Many items'], 2);
// => 'Many items'
```

**Arguments:**  
splits `Array<String>`: Array of translation variations.  
count `Number`: The count to determine which variation to use.

**Returns:**  
`String`: The selected translation variation.