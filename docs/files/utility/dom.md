# Dom Class

A utility class for DOM manipulation and traversal.

```js
import { Dom } from "@kizmann/pico-js";
```

<hr>

### Dom.constructor
Creates a new Dom instance wrapping DOM elements.

```js
// new Dom(el)

const element = new Dom(document.querySelector('.my-element'));
```

**Arguments:**  
el `Element|NodeList`: The DOM element or elements to wrap.

**Returns:**  
`Dom`: New Dom instance.

<hr>

### Dom.ready
Executes a callback when the DOM is ready.

```js
// Dom.ready(callback, delay = 0, count = 0)

Dom.ready(() => {
    console.log('DOM is ready');
});
```

**Arguments:**  
callback `Function`: Function to execute.  
delay `Number`: Optional delay in milliseconds.  
count `Number`: Internal counter for delayed execution.

**Returns:**  
`Dom`: The Dom class for chaining.

<hr>

### Dom.complete
Executes a callback when the page is fully loaded.

```js
// Dom.complete(callback, delay = 0, count = 0)

Dom.complete(() => {
  console.log('Page is fully loaded');
});
```

**Arguments:**  
callback `Function`: Function to execute.  
delay `Number`: Optional delay in milliseconds.  
count `Number`: Internal counter for delayed execution.

**Returns:**  
`Dom`: The Dom class for chaining.

<hr>

### Dom.required
Waits for specified global variables to be available before executing a callback.

```js
// Dom.required(callback, globals = [], timer = 100)

Dom.required(() => {
  console.log('jQuery is loaded');
}, ['jQuery']);
```

**Arguments:**  
callback `Function`: Function to execute.  
globals `Array`: Global variable names to wait for.  
timer `Number`: Polling interval in milliseconds.

**Returns:**  
`Dom`: The Dom class for chaining.

<hr>

### Dom.find
Finds elements in the document and returns a Dom instance.

```js
// Dom.find(element)

Dom.find('.my-element');
// => Dom instance with matched elements
```

**Arguments:**  
element `String|Element|NodeList`: Selector or element(s).

**Returns:**  
`Dom`: Dom instance with matched elements.

<hr>

### Dom.make
Creates a new DOM element and returns a Dom instance.

```js
// Dom.make(element, options = {})

Dom.make('div', { className: 'my-class' });
// => Dom instance with new div element
```

**Arguments:**  
element `String|Element`: Element tag name or existing element.  
options `Object`: Properties to assign to the element.

**Returns:**  
`Dom`: Dom instance with the created element.

<hr>

### Dom.location
Gets elements at the specified coordinates.

```js
// Dom.location(posx, posy)

Dom.location(100, 200);
// => Dom instance with elements at position
```

**Arguments:**  
posx `Number`: X coordinate.  
posy `Number`: Y coordinate.

**Returns:**  
`Dom`: Dom instance with elements at the position.

<hr>

### Dom.title
Sets the document title.

```js
// Dom.title(text = null, glue = ' - ')

Dom.title('Home Page');
// => Sets document.title
```

**Arguments:**  
text `String`: The title text.  
glue `String`: Separator for base title (if defined).

**Returns:**  
`Dom`: The Dom class for chaining.

<hr>

### Dom.length
Gets the number of elements in the Dom instance.

```js
// Dom.prototype.length()

Dom.find('.item').length();
// => 5
```

**Returns:**  
`Number`: Element count.

<hr>

### Dom.empty
Checks if the Dom instance has no elements.

```js
// Dom.prototype.empty()

Dom.find('.not-exists').empty();
// => true
```

**Returns:**  
`boolean`: Whether the instance is empty.

<hr>

### Dom.visible
Checks if the first element is visible.

```js
// Dom.prototype.visible()

Dom.find('#my-element').visible();
// => true
```

**Returns:**  
`boolean`: Whether the element is visible.

<hr>

### Dom.inviewX
Checks if the element is in the horizontal viewport.

```js
// Dom.prototype.inviewX(ratio = 0)

Dom.find('.sidebar').inviewX(0.5);
// => true if at least 50% visible horizontally
```

**Arguments:**  
ratio `Number`: Visibility ratio (0-1).

**Returns:**  
`boolean`: Whether the element is in horizontal view.

<hr>

### Dom.inviewY
Checks if the element is in the vertical viewport.

```js
// Dom.prototype.inviewY(ratio = 0)

Dom.find('.section').inviewY(0.5);
// => true if at least 50% visible vertically
```

**Arguments:**  
ratio `Number`: Visibility ratio (0-1).

**Returns:**  
`boolean`: Whether the element is in vertical view.

<hr>

### Dom.is
Checks if the element matches a selector.

```js
// Dom.prototype.is(selector)

Dom.find('#element').is('.active');
// => true if element has class 'active'
```

**Arguments:**  
selector `String`: Selector to match against.

**Returns:**  
`boolean`: Whether the element matches.

<hr>

### Dom.isParent
Checks if the element's parent matches a selector.

```js
// Dom.prototype.isParent(selector)

Dom.find('.child').isParent('.parent');
// => true if parent has class 'parent'
```

**Arguments:**  
selector `String|Element`: Selector or element to match against.

**Returns:**  
`boolean`: Whether the parent matches.

<hr>

### Dom.first
Gets the first element with optional offset.

```js
// Dom.prototype.first(offset = 0)

Dom.find('.items').first();
// => First element
```

**Arguments:**  
offset `Number`: Optional index offset.

**Returns:**  
`Element`: The first element (+offset).

<hr>

### Dom.last
Gets the last element with optional offset.

```js
// Dom.prototype.last(offset = 1)

Dom.find('.items').last();
// => Last element
```

**Arguments:**  
offset `Number`: Optional index offset from end.

**Returns:**  
`Element`: The last element (-offset).

<hr>

### Dom.get
Gets elements at the specified index or all elements.

```js
// Dom.prototype.get(index = -1)

Dom.find('.items').get(2);
// => Third element (index 2)

Dom.find('.items').get();
// => Array of all elements
```

**Arguments:**  
index `Number`: Index to retrieve, or -1 for all.

**Returns:**  
`Element|Array`: Element at index or array of all elements.

<hr>

### Dom.getNot
Gets the first element that doesn't match the specified element.

```js
// Dom.prototype.getNot(el)

const otherElement = Dom.find('.items').getNot(specificElement);
```

**Arguments:**  
el `Element`: Element to exclude.

**Returns:**  
`Dom`: Dom instance with first non-matching element.

<hr>

### Dom.each
Iterates over elements and applies a callback.

```js
// Dom.prototype.each(callback)

Dom.find('.items').each((el, index) => {
  el.textContent = `Item ${index}`;
});
```

**Arguments:**  
callback `Function`: Called with (element, index) for each element.

**Returns:**  
`Array|Mixed`: Results of callback or single result.

<hr>

### Dom.matches
Checks if the element matches a given selector.

```js
// Dom.prototype.matches(selector)

Dom.find('#element').matches('.active');
// => true if element has class 'active'
```

**Arguments:**  
selector `String`: Selector to match against.

**Returns:**  
`boolean`: Whether the element matches.

<hr>

### Dom.closest
Finds the closest ancestor matching a selector.

```js
// Dom.prototype.closest(selector)

Dom.find('.button').closest('.card');
// => First ancestor with class 'card'
```

**Arguments:**  
selector `String`: Selector to match against.

**Returns:**  
`Element`: The matching ancestor or null.

<hr>

### Dom.closestScrollable
Finds the closest scrollable ancestor.

```js
// Dom.prototype.closestScrollable(fallback = document.body)

Dom.find('.content').closestScrollable();
// => First scrollable parent element
```

**Arguments:**  
fallback `Element`: Element to return if no scrollable parent is found.

**Returns:**  
`Element`: The scrollable ancestor or fallback.

<hr>

### Dom.contains
Checks if an element contains another element or selector match.

```js
// Dom.prototype.contains(selector)

Dom.find('.container').contains('.item');
// => true if container has an element with class 'item'
```

**Arguments:**  
selector `String|Element`: Selector or element to check.

**Returns:**  
`boolean`: Whether the element contains the target.

<hr>

### Dom.inside
Checks if the element is inside an element matching the selector.

```js
// Dom.prototype.inside(selector)

Dom.find('.button').inside('.card');
// => true if button is inside an element with class 'card'
```

**Arguments:**  
selector `String`: Selector to match against.

**Returns:**  
`boolean`: Whether the element is inside a match.

<hr>

### Dom.parent
Gets the parent element.

```js
// Dom.prototype.parent()

Dom.find('.child').parent();
// => Dom instance with parent element
```

**Returns:**  
`Dom`: Dom instance with parent element.

<hr>

### Dom.child
Gets the first child element, optionally filtered by a selector.

```js
// Dom.prototype.child(selector)

Dom.find('.container').child('.special');
// => Dom instance with first child matching '.special'
```

**Arguments:**  
selector `String`: Optional selector to filter children.

**Returns:**  
`Dom`: Dom instance with first matching child.

<hr>

### Dom.childs
Gets all child elements, optionally filtered by a selector.

```js
// Dom.prototype.childs(selector = null, filter = true)

Dom.find('.container').childs('.item');
// => Dom instance with all children matching '.item'
```

**Arguments:**  
selector `String`: Optional selector to filter children.  
filter `boolean`: Whether to filter out text nodes.

**Returns:**  
`Dom`: Dom instance with matching children.

<hr>

### Dom.find
Finds elements within the current element using a selector.

```js
// Dom.prototype.find(selector)

Dom.find('.container').find('.item');
// => Dom instance with all '.item' elements inside the container
```

**Arguments:**  
selector `String`: Selector to find elements.

**Returns:**  
`Dom`: Dom instance with matched elements.

<hr>

### Dom.where
Filters elements to those matching a selector.

```js
// Dom.prototype.where(selector)

Dom.find('.items').where('.active');
// => Dom instance with only '.active' elements
```

**Arguments:**  
selector `String`: Selector to filter by.

**Returns:**  
`Dom`: Dom instance with filtered elements.

<hr>

### Dom.not
Filters elements to those not matching a selector.

```js
// Dom.prototype.not(selector)

Dom.find('.items').not('.disabled');
// => Dom instance with elements that don't have class 'disabled'
```

**Arguments:**  
selector `String`: Selector to exclude.

**Returns:**  
`Dom`: Dom instance with filtered elements.

<hr>

### Dom.prepend
Prepends content to each element.

```js
// Dom.prototype.prepend(val)

Dom.find('.container').prepend('<span>Start</span>');
```

**Arguments:**  
val `String|Element`: Content to prepend.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.prependTo
Prepends elements to a target element.

```js
// Dom.prototype.prependTo(el)

Dom.make('span', { textContent: 'Start' }).prependTo('.container');
```

**Arguments:**  
el `String|Element`: Target to prepend to.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.append
Appends content to each element.

```js
// Dom.prototype.append(val)

Dom.find('.container').append('<span>End</span>');
```

**Arguments:**  
val `String|Element`: Content to append.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.appendTo
Appends elements to a target element.

```js
// Dom.prototype.appendTo(el)

Dom.make('span', { textContent: 'End' }).appendTo('.container');
```

**Arguments:**  
el `String|Element`: Target to append to.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.replace
Replaces the element with another element.

```js
// Dom.prototype.replace(el)

Dom.find('.old').replace(newElement);
```

**Arguments:**  
el `Element`: Element to replace with.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.previous
Gets the previous sibling element.

```js
// Dom.prototype.previous()

Dom.find('.current').previous();
// => Dom instance with previous element
```

**Returns:**  
`Dom`: Dom instance with previous element.

<hr>

### Dom.next
Gets the next sibling element.

```js
// Dom.prototype.next()

Dom.find('.current').next();
// => Dom instance with next element
```

**Returns:**  
`Dom`: Dom instance with next element.

<hr>

### Dom.loaded
Executes a callback when an image is loaded.

```js
// Dom.prototype.loaded(callback)

Dom.find('img').loaded((img) => {
  console.log('Image loaded', img.naturalWidth);
});
```

**Arguments:**  
callback `Function`: Function called when loaded.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.bind
Binds a direct event handler to elements.

```js
// Dom.prototype.bind(event, callback)

Dom.find('.button').bind('click', function(e) {
  console.log('Clicked', this);
});
```

**Arguments:**  
event `String`: Event name.  
callback `Function`: Event handler.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.unbind
Removes a direct event handler.

```js
// Dom.prototype.unbind(event)

Dom.find('.button').unbind('click');
```

**Arguments:**  
event `String`: Event name to unbind.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.on
Attaches an event listener to elements.

```js
// Dom.prototype.on(event, callback, options = {}, paused = false)

Dom.find('.button').on('click', (e, target) => {
  console.log('Clicked', target);
});
```

**Arguments:**  
event `String|Array`: Event name(s).  
callback `Function`: Event handler.  
options `Object`: Event listener options.  
paused `boolean`: Whether to start paused.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.live
Attaches a delegated event listener.

```js
// Dom.prototype.live(event, selector, callback, options = {}, paused = false)

Dom.find('body').live('click', '.button', (e, target) => {
  console.log('Button clicked', target);
});
```

**Arguments:**  
event `String|Array`: Event name(s).  
selector `String`: Delegate selector.  
callback `Function`: Event handler.  
options `Object`: Event listener options.  
paused `boolean`: Whether to start paused.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.one
Attaches a one-time event listener.

```js
// Dom.prototype.one(event, callback, options = {})

Dom.find('.button').one('click', (e) => {
  console.log('Clicked once');
});
```

**Arguments:**  
event `String`: Event name.  
callback `Function`: Event handler.  
options `Object`: Event listener options.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.fire
Triggers an event on elements.

```js
// Dom.prototype.fire(event)

Dom.find('.button').fire('click');
```

**Arguments:**  
event `String`: Event name to trigger.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.delayed
Attaches a debounced event listener.

```js
// Dom.prototype.delayed(event, callback, delay = 0, options = {})

Dom.find('.search').delayed('input', (e) => {
  console.log('Search after typing stops', e.target.value);
}, 300);
```

**Arguments:**  
event `String`: Event name.  
callback `Function`: Event handler.  
delay `Number`: Debounce delay in milliseconds.  
options `Object`: Event listener options.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.off
Removes event listeners.

```js
// Dom.prototype.off(event, selector = null, options = {})

Dom.find('.button').off('click');
```

**Arguments:**  
event `String|Array`: Event name(s).  
selector `String`: Optional delegate selector.  
options `Object`: Event listener options.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.unpause
Resumes paused event listeners.

```js
// Dom.prototype.unpause(event, selector = null, options = {})

Dom.find('.button').unpause('click');
```

**Arguments:**  
event `String|Array`: Event name(s).  
selector `String`: Optional delegate selector.  
options `Object`: Event listener options.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.pause
Pauses event listeners.

```js
// Dom.prototype.pause(event, selector = null, options = {})

Dom.find('.button').pause('click');
```

**Arguments:**  
event `String|Array`: Event name(s).  
selector `String`: Optional delegate selector.  
options `Object`: Event listener options.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.observer
Creates a MutationObserver for elements.

```js
// Dom.prototype.observer(callback, initial = true)

const observe = Dom.find('.container').observer((el, mutations) => {
  console.log('Container changed', mutations);
});

observe('.container', { childList: true });
```

**Arguments:**  
callback `Function`: Observer callback.  
initial `boolean`: Whether to call immediately.

**Returns:**  
`Function`: Observer initialization function.

<hr>

### Dom.observerResize
Creates a ResizeObserver for elements.

```js
// Dom.prototype.observerResize(callback, initial = true)

const observe = Dom.find('.container').observerResize((el) => {
  console.log('Container resized');
});

observe('.container');
```

**Arguments:**  
callback `Function`: Observer callback.  
initial `boolean`: Whether to call immediately.

**Returns:**  
`Function`: Observer initialization function.

<hr>

### Dom.data
Gets or sets custom data for an element.

```js
// Dom.prototype.data(key = undefined, val = undefined, fallback = null)

Dom.find('.element').data('config', { active: true });
// => Sets data

Dom.find('.element').data('config');
// => { active: true }
```

**Arguments:**  
key `String`: Data key.  
val `Any`: Data value to set.  
fallback `Any`: Default value if data doesn't exist.

**Returns:**  
`Any|Dom`: Data value or Dom instance (when setting).

<hr>

### Dom.value
Gets or sets the value of form elements.

```js
// Dom.prototype.value(val = undefined)

Dom.find('input').value('New text');
// => Sets input value

Dom.find('input').value();
// => 'New text'
```

**Arguments:**  
val `String`: Value to set.

**Returns:**  
`String|Dom`: Value or Dom instance (when setting).

<hr>

### Dom.html
Sets the inner HTML of elements.

```js
// Dom.prototype.html(html)

Dom.find('.container').html('<p>New content</p>');
```

**Arguments:**  
html `String`: HTML content.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.computed
Gets computed styles for an element.

```js
// Dom.prototype.computed(key = null, fallback = null)

Dom.find('.element').computed('color');
// => 'rgb(0, 0, 0)'
```

**Arguments:**  
key `String`: Style property to get.  
fallback `Any`: Default value if style doesn't exist.

**Returns:**  
`String|Object`: Style value or all computed styles.

<hr>

### Dom.css
Gets or sets inline styles.

```js
// Dom.prototype.css(vals = undefined)

Dom.find('.element').css({ color: 'red', fontSize: '16px' });
// => Sets styles

Dom.find('.element').css();
// => Gets all styles
```

**Arguments:**  
vals `Object|String`: Styles to set or null to remove.

**Returns:**  
`Object|Dom`: Style object or Dom instance (when setting).

<hr>

### Dom.class
Sets classes on elements.

```js
// Dom.prototype.class(vals)

Dom.find('.element').class('btn btn-primary');
```

**Arguments:**  
vals `String|Array`: Classes to set.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.hasClass
Checks if elements have specified classes.

```js
// Dom.prototype.hasClass(vals)

Dom.find('.button').hasClass('active');
// => true if has 'active' class
```

**Arguments:**  
vals `String|Array`: Classes to check.

**Returns:**  
`boolean`: Whether any class is present.

<hr>

### Dom.addClass
Adds classes to elements.

```js
// Dom.prototype.addClass(vals)

Dom.find('.button').addClass('active highlight');
```

**Arguments:**  
vals `String|Array`: Classes to add.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.removeClass
Removes classes from elements.

```js
// Dom.prototype.removeClass(vals)

Dom.find('.button').removeClass('active highlight');
```

**Arguments:**  
vals `String|Array`: Classes to remove.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.toggleClass
Toggles classes on elements.

```js
// Dom.prototype.toggleClass(vals)

Dom.find('.button').toggleClass('active');
```

**Arguments:**  
vals `String|Array`: Classes to toggle.

**Returns:**  
`Dom`: The Dom instance for chaining.

<hr>

### Dom.attr
Gets or sets attributes on elements.

```js
// Dom.prototype.attr(attr, val = undefined)

Dom.find('a').attr('href', 'https://example.com');
// => Sets attribute

Dom.find('a').attr('href');
// => 'https://example.com'
```

**Arguments:**  
attr `String|Object`: Attribute name or object of attributes.  
val `String`: Value to set or undefined to get.

**Returns:**  
`String|Dom`: Attribute value or Dom instance (when setting).

<hr>

### Dom.actual
Temporarily applies styles and executes a callback.

```js
// Dom.prototype.actual(callback, val = null)

Dom.find('.element').actual(function() {
  return this.clientWidth;
}, { display: 'block' });
// => Width with display:block
```

**Arguments:**  
callback `Function`: Function to execute.  
val `String`: Temporary style to apply.

**Returns:**  
`Any`: Result of the callback.

<hr>

### Dom.loopParent
Iterates through parent elements.

```js
// Dom.prototype.loopParent(callback, target = null)

Dom.find('.element').loopParent((el) => {
  console.log('Parent:', el);
});
```

**Arguments:**  
callback `Function`: Called for each parent.  
target `String`: Selector to stop at.

**Returns:**  
`boolean`: Whether the loop was completed.

<hr>

### Dom.loopOffsetParent
Iterates through offset parent elements.

```js
// Dom.prototype.loopOffsetParent(callback, target = document.body)

Dom.find('.element').loopOffsetParent((el) => {
  console.log('Offset parent:', el);
});
```

**Arguments:**  
callback `Function`: Called for each offset parent.  
target `Element`: Element to stop at.

**Returns:**  
`boolean`: Whether the loop was completed.

<hr>

### Dom.offset
Gets element offset relative to the document or boundary.

```js
// Dom.prototype.offset(key = null, boundry = null)

Dom.find('.element').offset();
// => { top: 100, left: 50, bottom: 400, right: 200 }

Dom.find('.element').offset('top');
// => 100
```

**Arguments:**  
key `String`: Specific offset property to get.  
boundry `Element`: Optional reference element.

**Returns:**  
`Object|Number`: Offset object or specific value.

<hr>

### Dom.offsetTop
Gets element top offset.

```js
// Dom.prototype.offsetTop(boundry = null)

Dom.find('.element').offsetTop();
// => 100
```

**Arguments:**  
boundry `Element`: Optional reference element.

**Returns:**  
`Number`: Top offset.

<hr>

### Dom.offsetBottom
Gets element bottom offset.

```js
// Dom.prototype.offsetBottom(boundry = null)

Dom.find('.element').offsetBottom();
// => 400
```

**Arguments:**  
boundry `Element`: Optional reference element.

**Returns:**  
`Number`: Bottom offset.

<hr>

### Dom.offsetLeft
Gets element left offset.

```js
// Dom.prototype.offsetLeft(boundry = null)

Dom.find('.element').offsetLeft();
// => 50
```

**Arguments:**  
boundry `Element`: Optional reference element.

**Returns:**  
`Number`: Left offset.

<hr>

### Dom.offsetRight
Gets element right offset.

```js
// Dom.prototype.offsetRight(boundry = null)

Dom.find('.element').offsetRight();
// => 200
```

**Arguments:**  
boundry `Element`: Optional reference element.

**Returns:**  
`Number`: Right offset.

<hr>

### Dom.scroll
Gets scroll position relative to document or boundary.

```js
// Dom.prototype.scroll(key = null, boundry = null)

Dom.find('.scrollable').scroll();
// => { top: 100, left: 0 }

Dom.find('.scrollable').scroll('top');
// => 100
```

**Arguments:**  
key `String`: Specific scroll property to get.  
boundry `Element`: Optional reference element.

**Returns:**  
`Object|Number`: Scroll object or specific value.

<hr>

### Dom.scrollTop
Gets or sets vertical scroll position.

```js
// Dom.prototype.scrollTop(val = null, boundry = null)

Dom.find('.scrollable').scrollTop(100);
// => Sets scroll position

Dom.find('.scrollable').scrollTop();
// => 100
```

**Arguments:**  
val `Number`: Value to set or null to get.  
boundry `Element`: Optional reference element.

**Returns:**  
`Number|Dom`: Scroll position or Dom instance (when setting).

<hr>

### Dom.scrollTopGlobal
Gets vertical scroll position relative to document.

```js
// Dom.prototype.scrollTopGlobal()

Dom.find('.element').scrollTopGlobal();
// => 150
```

**Returns:**  
`Number`: Global vertical scroll position.

<hr>

### Dom.scrollLeft
Gets or sets horizontal scroll position.

```js
// Dom.prototype.scrollLeft(val = null, boundry = null)

Dom.find('.scrollable').scrollLeft(50);
// => Sets scroll position

Dom.find('.scrollable').scrollLeft();
// => 50
```

**Arguments:**  
val `Number`: Value to set or null to get.  
boundry `Element`: Optional reference element.

**Returns:**  
`Number|Dom`: Scroll position or Dom instance (when setting).

<hr>

### Dom.scrollLeftGlobal
Gets horizontal scroll position relative to document.

```js
// Dom.prototype.scrollLeftGlobal()

Dom.find('.element').scrollLeftGlobal();
// => 75
```

**Returns:**  
`Number`: Global horizontal scroll position.

<hr>

### Dom.margin
Gets element margin values.

```js
// Dom.prototype.margin(key = null)

Dom.find('.element').margin();
// => { top: 10, right: 15, bottom: 10, left: 15 }

Dom.find('.element').margin('top');
// => 10
```

**Arguments:**  
key `String`: Specific margin property to get.

**Returns:**  
`Object|Number`: Margin object or specific value.

<hr>

### Dom.padding
Gets element padding values.

```js
// Dom.prototype.padding(key = null)

Dom.find('.element').padding();
// => { top: 20, right: 15, bottom: 20, left: 15 }

Dom.find('.element').padding('left');
// => 15
```

**Arguments:**  
key `String`: Specific padding property to get.

**Returns:**  
`Object|Number`: Padding object or specific value.

<hr>

### Dom.height
Gets element height including borders and padding.

```js
// Dom.prototype.height()

Dom.find('.element').height();
// => 200
```

**Returns:**  
`Number`: Element height in pixels.

<hr>

### Dom.clientHeight
Gets element content height without borders and padding.

```js
// Dom.prototype.clientHeight()

Dom.find('.element').clientHeight();
// => 160
```

**Returns:**  
`Number`: Content height in pixels.

<hr>

### Dom.scrollHeight
Gets element scroll height.

```js
// Dom.prototype.scrollHeight()

Dom.find('.scrollable').scrollHeight();
// => 500
```

**Returns:**  
`Number`: Scroll height in pixels.

<hr>

### Dom.innerHeight
Gets element height without padding.

```js
// Dom.prototype.innerHeight()

Dom.find('.element').innerHeight();
// => 180
```

**Returns:**  
`Number`: Inner height in pixels.

<hr>

### Dom.realHeight
Gets element height with specified styles temporarily applied.

```js
// Dom.prototype.realHeight(styles = {})

Dom.find('.hidden-element').realHeight({ display: 'block' });
// => Height as if element was displayed
```

**Arguments:**  
styles `Object`: Temporary styles to apply.

**Returns:**  
`Number`: Height in pixels.

<hr>

### Dom.evaluateHeight
Calculates element height relative to a target and optionally applies it.

```js
// Dom.prototype.evaluateHeight(target = null, auto = true)

Dom.find('.element').evaluateHeight('.container');
// => Height and applies it to element
```

**Arguments:**  
target `String|Element`: Reference element (defaults to parent).  
auto `boolean`: Whether to apply height automatically.

**Returns:**  
`Number`: Calculated height.

<hr>

### Dom.width
Gets element width including borders and padding.

```js
// Dom.prototype.width()

Dom.find('.element').width();
// => 300
```

**Returns:**  
`Number`: Element width in pixels.

<hr>

### Dom.clientWidth
Gets element content width without borders and padding.

```js
// Dom.prototype.clientWidth()

Dom.find('.element').clientWidth();
// => 270
```

**Returns:**  
`Number`: Content width in pixels.

<hr>

### Dom.scrollWidth
Gets element scroll width.

```js
// Dom.prototype.scrollWidth()

Dom.find('.scrollable').scrollWidth();
// => 800
```

**Returns:**  
`Number`: Scroll width in pixels.

<hr>

### Dom.innerWidth
Gets element width without padding.

```js
// Dom.prototype.innerWidth()

Dom.find('.element').innerWidth();
// => 280
```

**Returns:**  
`Number`: Inner width in pixels.

<hr>

### Dom.realWidth
Gets element width with specified styles temporarily applied.

```js
// Dom.prototype.realWidth(styles = {})

Dom.find('.hidden-element').realWidth({ display: 'block' });
// => Width as if element was displayed
```

**Arguments:**  
styles `Object`: Temporary styles to apply.

**Returns:**  
`Number`: Width in pixels.

<hr>

### Dom.evaluateWidth
Calculates element width relative to a target and optionally applies it.

```js
// Dom.prototype.evaluateWidth(target = null, auto = true)

Dom.find('.element').evaluateWidth('.container');
// => Width and applies it to element
```

**Arguments:**  
target `String|Element`: Reference element (defaults to parent).  
auto `boolean`: Whether to apply width automatically.

**Returns:**  
`Number`: Calculated width.