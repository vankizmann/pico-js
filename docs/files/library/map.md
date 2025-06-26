# pi.Map Class

A utility class for Google Maps integration and marker management.

```js
import Map from "@kizmann/pico-js";
```

<hr>

### constructor
Creates a new Map instance with Google Maps.

```js
// new Map(el, options = {})

const map = new Map('#map-container', {
  lat: 37.7749,
  lng: -122.4194,
  zoom: 12
});
```

**Arguments:**  
el `String|Element`: DOM element or selector for the map container.  
options `Object`: Google Maps options including lat, lng, zoom, etc.

**Returns:**  
`Map`: New Map instance.

<hr>

### setMapStyle
Sets the default map style for all Map instances.

```js
// Map.setMapStyle(style = [])

Map.setMapStyle([
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#e9e9e9' }]
  }
]);
```

**Arguments:**  
style `Array`: Google Maps style array.

**Returns:**  
`Map`: The Map class for chaining.

<hr>

### setMarkerStyle
Sets marker styles for different states.

```js
// Map.setMarkerStyle(key, style = {}, extra = {})

Map.setMarkerStyle('restaurant', {
  default: '/icons/restaurant.png',
  hover: '/icons/restaurant-hover.png',
  active: '/icons/restaurant-active.png',
  width: 32,
  height: 32
});
```

**Arguments:**  
key `String`: Style identifier.  
style `Object`: Style configuration with default, hover, active icons.  
extra `Object`: Additional style states.

**Returns:**  
`Map`: The Map class for chaining.

<hr>

### clusterMarkers
Groups nearby markers into clusters.

```js
// Map.prototype.clusterMarkers(options = {}, filter = null, allowCreate = true)

map.clusterMarkers({
  imagePath: '/images/cluster/m',
  maxZoom: 15
});
```

**Arguments:**  
options `Object`: Clustering options.  
filter `Function`: Function to filter which markers to cluster.  
allowCreate `boolean`: Whether to create a new cluster if none exists.

**Returns:**  
`undefined`

<hr>

### createMarker
Creates a new marker on the map.

```js
// Map.prototype.createMarker(key = null, options = {})

const marker = map.createMarker('restaurant-1', {
  lat: 37.7749,
  lng: -122.4194,
  style: 'restaurant',
  html: '<div>Great Restaurant</div>',
  title: 'Restaurant Name'
});
```

**Arguments:**  
key `String`: Unique identifier for the marker (auto-generated if null).  
options `Object`: Marker options including position, style, html, etc.

**Returns:**  
`Object`: Created marker object with key, marker, and info properties.

<hr>

### getMarker
Gets a marker by its key.

```js
// Map.prototype.getMarker(key)

const marker = map.getMarker('restaurant-1');
```

**Arguments:**  
key `String`: Marker identifier.

**Returns:**  
`Object`: Marker object or undefined if not found.

<hr>

### showMarker
Makes a marker visible on the map.

```js
// Map.prototype.showMarker(key)

map.showMarker('restaurant-1');
```

**Arguments:**  
key `String`: Marker identifier.

**Returns:**  
`boolean`: Whether the marker was previously hidden.

<hr>

### hideMarker
Hides a marker from the map.

```js
// Map.prototype.hideMarker(key)

map.hideMarker('restaurant-1');
```

**Arguments:**  
key `String`: Marker identifier.

**Returns:**  
`boolean`: Whether the marker was previously visible.

<hr>

### toggleMarker
Toggles marker visibility.

```js
// Map.prototype.toggleMarker(key)

map.toggleMarker('restaurant-1');
```

**Arguments:**  
key `String`: Marker identifier.

**Returns:**  
`Map`: The Map instance for chaining.

<hr>

### getMarkerVisibility
Checks if a marker is visible.

```js
// Map.prototype.getMarkerVisibility(key, fallback = false)

map.getMarkerVisibility('restaurant-1');
// => true if visible
```

**Arguments:**  
key `String`: Marker identifier.  
fallback `boolean`: Default value if marker not found.

**Returns:**  
`boolean`: Whether the marker is visible.

<hr>

### getMarkerPosition
Gets a marker's position.

```js
// Map.prototype.getMarkerPosition(key, fallback = null)

const position = map.getMarkerPosition('restaurant-1');
// => Google Maps LatLng object
```

**Arguments:**  
key `String`: Marker identifier.  
fallback `Any`: Default value if marker not found.

**Returns:**  
`Object`: Google Maps LatLng position or fallback.

<hr>

### setMarkerPosition
Sets a marker's position.

```js
// Map.prototype.setMarkerPosition(key, options = {})

map.setMarkerPosition('restaurant-1', {
  lat: 37.7849,
  lng: -122.4094
});
```

**Arguments:**  
key `String`: Marker identifier.  
options `Object`: Position with lat and lng properties.

**Returns:**  
`undefined`

<hr>

### setMarkerByAddress
Sets a marker's position by geocoding an address.

```js
// Map.prototype.setMarkerByAddress(key, address)

map.setMarkerByAddress('restaurant-1', '123 Main St, San Francisco, CA');
```

**Arguments:**  
key `String`: Marker identifier.  
address `String`: Address to geocode.

**Returns:**  
`Promise`: Geocoding promise.

<hr>

### styleMarker
Applies a style to a marker.

```js
// Map.prototype.styleMarker(key, type = null)

map.styleMarker('restaurant-1', 'hover');
```

**Arguments:**  
key `String`: Marker identifier.  
type `String`: Style type ('default', 'hover', 'active').

**Returns:**  
`undefined`

<hr>

### enterMarker
Applies hover style to a marker.

```js
// Map.prototype.enterMarker(key)

map.enterMarker('restaurant-1');
```

**Arguments:**  
key `String`: Marker identifier.

**Returns:**  
`Map`: The Map instance for chaining.

<hr>

### leaveMarker
Removes hover style from a marker.

```js
// Map.prototype.leaveMarker(key)

map.leaveMarker('restaurant-1');
```

**Arguments:**  
key `String`: Marker identifier.

**Returns:**  
`Map`: The Map instance for chaining.

<hr>

### openInfo
Opens a marker's info window.

```js
// Map.prototype.openInfo(key)

map.openInfo('restaurant-1');
```

**Arguments:**  
key `String`: Marker identifier.

**Returns:**  
`boolean`: Whether the info window was previously closed.

<hr>

### closeInfo
Closes a marker's info window.

```js
// Map.prototype.closeInfo(key)

map.closeInfo('restaurant-1');
```

**Arguments:**  
key `String`: Marker identifier.

**Returns:**  
`boolean`: Whether the info window was previously open.

<hr>

### toggleInfo
Toggles a marker's info window.

```js
// Map.prototype.toggleInfo(key)

map.toggleInfo('restaurant-1');
```

**Arguments:**  
key `String`: Marker identifier.

**Returns:**  
`Map`: The Map instance for chaining.

<hr>

### getInfoVisibility
Checks if a marker's info window is open.

```js
// Map.prototype.getInfoVisibility(key, fallback = false)

map.getInfoVisibility('restaurant-1');
// => true if info window is open
```

**Arguments:**  
key `String`: Marker identifier.  
fallback `boolean`: Default value if marker not found.

**Returns:**  
`boolean`: Whether the info window is visible.

<hr>

### showMarkers
Shows markers based on a filter.

```js
// Map.prototype.showMarkers(filter = null)

map.showMarkers((marker) => marker.extras.category === 'restaurant');
```

**Arguments:**  
filter `Function`: Function to filter which markers to show.

**Returns:**  
`Map`: The Map instance for chaining.

<hr>

### getMarkerBoundary
Gets the boundary that contains all visible markers.

```js
// Map.prototype.getMarkerBoundary(filter = null)

const bounds = map.getMarkerBoundary();
```

**Arguments:**  
filter `Function`: Function to filter which markers to include.

**Returns:**  
`Object`: Google Maps LatLngBounds object.

<hr>

### focusMarkers
Adjusts map view to show all visible markers.

```js
// Map.prototype.focusMarkers(filter = null, maxZoom = 14, boundSpace = 15)

map.focusMarkers(null, 12, 20);
```

**Arguments:**  
filter `Function`: Function to filter which markers to focus on.  
maxZoom `Number`: Maximum zoom level.  
boundSpace `Number`: Padding around markers.

**Returns:**  
`Map`: The Map instance for chaining.

<hr>

### getLocationByAddress
Geocodes an address to get coordinates.

```js
// Map.prototype.getLocationByAddress(address, callback = null)

map.getLocationByAddress('123 Main St, San Francisco, CA', (results) => {
  console.log('Location:', results[0].geometry.location);
});
```

**Arguments:**  
address `String`: Address to geocode.  
callback `Function`: Callback function for results.

**Returns:**  
`Promise`: Geocoding promise.

<hr>

### renderDirections
Displays directions between two points.

```js
// Map.prototype.renderDirections(options)

map.renderDirections({
  origin: 'San Francisco, CA',
  destination: 'Los Angeles, CA',
  travelMode: 'DRIVING',
  panel: '#directions-panel'
});
```

**Arguments:**  
options `Object`: Direction options including origin, destination, travel mode.

**Returns:**  
`Promise`: Directions promise.