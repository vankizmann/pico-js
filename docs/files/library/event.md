# Event Class

A utility class for custom event management.

```js
import { Event } from "@kizmann/pico-js";
```

<hr>

### Event.bind
Binds a callback to a named event.

```js
// Event.bind(name, callback, options = {}, paused = false)

Event.bind('user:login', (userData) => {
  console.log('User logged in:', userData);
});

// Bind multiple events
Event.bind(['user:login', 'user:logout'], (userData) => {
  console.log('Auth event:', userData);
});
```

**Arguments:**  
name `String|Array`: Event name(s) to bind to.  
callback `Function`: Event handler to execute.  
options `Object`: Additional event options.  
paused `boolean`: Whether to start in paused state.

**Returns:**  
`Event`: The Event class for chaining.

<hr>

### Event.unbind
Removes event bindings.

```js
// Event.unbind(name, options = {})

Event.unbind('user:login');

// Unbind multiple events
Event.unbind(['user:login', 'user:logout']);
```

**Arguments:**  
name `String|Array`: Event name(s) to unbind.  
options `Object`: Options to match with bound events.

**Returns:**  
`Event`: The Event class for chaining.

<hr>

### Event.fire
Triggers a named event with optional arguments.

```js
// Event.fire(name, ...args)

Event.fire('user:login', { id: 123, name: 'John' });
```

**Arguments:**  
name `String`: Event name to trigger.  
args `Any`: Arguments to pass to event handlers.

**Returns:**  
`Event`: The Event class for chaining.

<hr>

### Event.pause
Temporarily disables event handlers for specified events.

```js
// Event.pause(name, options = {})

Event.pause('user:login');

// Pause multiple events
Event.pause(['user:login', 'user:logout']);
```

**Arguments:**  
name `String|Array`: Event name(s) to pause.  
options `Object`: Options to match with bound events.

**Returns:**  
`Event`: The Event class for chaining.

<hr>

### Event.unpause
Re-enables event handlers for specified events.

```js
// Event.unpause(name, options = {})

Event.unpause('user:login');

// Unpause multiple events
Event.unpause(['user:login', 'user:logout']);
```

**Arguments:**  
name `String|Array`: Event name(s) to unpause.  
options `Object`: Options to match with bound events.

**Returns:**  
`Event`: The Event class for chaining.