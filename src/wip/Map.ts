import { go, Obj, Arr, Mix, Dom, Event, Hash } from "#src/index.esm.ts";

/**
 * @const {object} google
 */

export class PicoMap
{
    map = null;

    static mapStyle = [];

    markers = {};

    static markerStyles = {};

    cluster = null;

    clusterFilter = null;

    clusterOptions = {};

    static hideMarkers = true;

    static closeInfoWindows = true;

    /**
     * Create map instance
     *
     * @example new Map("#map", { lat: 0, lng: 0 })
     *
     * @param {any} el Target element
     * @param {any} [options] Map options
     */
    constructor(el, options = {})
    {
        if ( ! globalThis.google ) {
            throw new Error('Google Maps is required for pi.Map');
        }

        let center = Obj.only(options, ['lat', 'lng']);

        if ( ! Obj.has(options, 'styles') ) {
            options.styles = Map.mapStyle;
        }

        options = Obj.assign({ gestureHandling: 'cooperative', scrollwheel: null, zoom: 12, center },
            Obj.except(options, ['lat', 'lng']));

        this.map = new globalThis.google.maps.Map(Dom.find(el).get(0), options)
    }

    /**
     * Set global map style
     *
     * @example Map.setMapStyle(style)
     *
     * @param {Array<any>} [style] Style array
     * @returns {PicoMap} Current class
     */
    static setMapStyle(style = [])
    {
        Map.mapStyle = style;

        return this;
    }

    /**
     * Set marker style
     *
     * @example Map.setMarkerStyle("default", { default: "icon.png" })
     *
     * @param {string} key Style key
     * @param {any} [style] Style options
     * @param {any} [extra] Extra options
     * @returns {PicoMap} Current class
     */
    static setMarkerStyle(key, style = {}, extra = {})
    {
        if ( ! globalThis.google ) {
            throw new Error('Google Maps is required for pi.Map');
        }

        if ( ! Obj.has(style, 'default') ) {
            return console.error('Marker style requires default property')
        }

        if ( ! Obj.has(style, 'width') ) {
            style.width = 45;
        }

        if ( ! Obj.has(style, 'height') ) {
            style.height = 45;
        }

        let final = {};

        // Marker size
        let size = new globalThis.google.maps.Size(style.width, style.height);

        // Point position
        let origin = new globalThis.google.maps.Point(0, 0);

        // Point position
        let anchor = new globalThis.google.maps.Point(style.width / 2, style.height);

        final.default = {
            url: style.default, size: size, origin: origin, anchor: anchor, scaledSize: size
        };

        if ( Obj.has(style, 'hover') ) {
            final.hover = Obj.assign({}, final.default, { url: style.hover });
        }

        if ( ! Obj.has(final, 'hover') ) {
            final.hover = final.default;
        }

        if ( Obj.has(style, 'active') ) {
            final.active = Obj.assign({}, final.default, { url: style.active });
        }

        if ( ! Obj.has(final, 'active') ) {
            final.active = final.default;
        }

        Obj.each(extra, (value, prop) => {
            final[prop] = Obj.assign({}, final.default, { url: value });
        });

        Obj.set(Map.markerStyles, key, final);

        return this;
    }

    /**
     * Cluster map markers
     *
     * @example map.clusterMarkers()
     *
     * @param {any} [options] Cluster options
     * @param {any} [filter] Marker filter
     * @param {boolean} [allowCreate] Create cluster
     * @returns {void} No return value
     */
    clusterMarkers(options = {}, filter = null, allowCreate = true)
    {
        if ( ! this.cluster && ! allowCreate ) {
            return;
        }

        if ( typeof globalThis.MarkerClusterer === "undefined" ) {
            return console.error('Google Maps Cluster library not laoded!');
        }

        if ( ! Obj.has(options, 'imagePath') && ! Obj.has(options, 'styles') ) {
            options.imagePath = '//developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
        }

        if ( this.cluster ) {
            this.cluster.clearMarkers();
        }

        if ( Mix.isFunction(filter) ) {
            this.clusterFilter = filter;
        }

        let markers = Arr.filter(this.markers, (item) => {

            let visible = this.getMarkerVisibility(item.key);

            if ( ! Mix.isFunction(this.clusterFilter) ) {
                return visible;
            }

            return visible && this.clusterFilter.call(this, item);
        });

        this.cluster = new globalThis.MarkerClusterer(this.map, Arr.each(markers, (item) => item.marker),
            this.clusterOptions = options);
    }

    /**
     * Apply style to marker
     *
     * @example map.styleMarker("m1", "hover")
     *
     * @param {string} key Marker key
     * @param {any} [type] Style type
     * @returns {void} No return value
     */
    styleMarker(key, type = null)
    {
        let item = Obj.get(this.markers, key);

        if ( Mix.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        if ( Mix.isEmpty(type) ) {
            type = this.getInfoVisibility(key) ? 'active' : 'default';
        }

        if ( ! Obj.has(Map.markerStyles, [item.style, type]) ) {
            return;
        }

        item.marker.setIcon(Obj.get(Map.markerStyles, [item.style, type]));
    }

    /**
     * Get marker by key
     *
     * @example map.getMarker("m1")
     *
     * @param {string} key Marker key
     * @returns {any} Marker object
     */
    getMarker(key)
    {
        return Obj.get(this.markers, key);
    }

    /**
     * Check if marker is visible
     *
     * @example map.getMarkerVisibility("m1") // => true
     *
     * @param {string} key Marker key
     * @param {boolean} [fallback] Fallback value
     * @returns {boolean} Visibility state
     */
    getMarkerVisibility(key, fallback = false)
    {
        let item = Obj.get(this.markers, key);

        if ( Mix.isEmpty(item) ) {
            return fallback;
        }

        return item.marker.getVisible();
    }

    /**
     * Get marker position
     *
     * @example map.getMarkerPositon("m1") // => LatLng
     *
     * @param {string} key Marker key
     * @param {any} [fallback] Fallback value
     * @returns {any} Position object
     */
    getMarkerPositon(key, fallback = null)
    {
        let item = Obj.get(this.markers, key);

        if ( Mix.isEmpty(item) ) {
            return fallback;
        }

        return item.marker.getPosition();
    }

    /**
     * Toggle marker visibility
     *
     * @example map.toggleMarker("m1")
     *
     * @param {string} key Marker key
     * @returns {boolean|void} Visibility state
     */
    toggleMarker(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Mix.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        if ( item.marker.getVisible() ) {
            return this.hideMarker(key);
        }

        return this.showMarker(key);
    }

    /**
     * Show marker on map
     *
     * @example map.showMarker("m1")
     *
     * @param {string} key Marker key
     * @returns {boolean|void} Previous state
     */
    showMarker(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Mix.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        let hidden = ! item.marker.getVisible();

        if ( hidden ) {
            item.marker.setVisible(true);
        }

        return hidden;
    }

    /**
     * Hide marker on map
     *
     * @example map.hideMarker("m1")
     *
     * @param {string} key Marker key
     * @returns {boolean|void} Previous state
     */
    hideMarker(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Mix.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        let visible = !! item.marker.getVisible();

        if ( visible ) {
            item.marker.setVisible(false);
        }

        this.closeInfo(key);

        return visible;
    }

    /**
     * Marker hover enter
     *
     * @example map.enterMarker("m1")
     *
     * @param {string} key Marker key
     * @returns {this|void} Current instance
     */
    enterMarker(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Mix.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        let type = 'hover';

        if ( this.getInfoVisibility(key) ) {
            type = 'active';
        }

        this.styleMarker(key, type);

        return this;
    }

    /**
     * Marker hover leave
     *
     * @example map.leaveMarker("m1")
     *
     * @param {string} key Marker key
     * @returns {this|void} Current instance
     */
    leaveMarker(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Mix.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        let type = 'default';

        if ( this.getInfoVisibility(key) ) {
            type = 'active';
        }

        this.styleMarker(key, type);

        return this;
    }

    /**
     * Check if info is open
     *
     * @example map.getInfoVisibility("m1") // => true
     *
     * @param {string} key Marker key
     * @param {boolean} [fallback] Fallback value
     * @returns {boolean} Visibility state
     */
    getInfoVisibility(key, fallback = false)
    {
        let item = Obj.get(this.markers, key);

        if ( Mix.isEmpty(item) || ! Obj.has(item, 'info') ) {
            return fallback;
        }

        return !! item.info.getMap();
    }

    /**
     * Toggle info window
     *
     * @example map.toggleInfo("m1")
     *
     * @param {string} key Marker key
     * @returns {boolean|void} Visibility state
     */
    toggleInfo(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Mix.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        if ( item.info.getMap() ) {
            return this.closeInfo(key);
        }

        return this.openInfo(key);
    }

    /**
     * Open info window
     *
     * @example map.openInfo("m1")
     *
     * @param {string} key Marker key
     * @returns {boolean|void} Previous state
     */
    openInfo(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Mix.isEmpty(item) ) {
            return console.error(`InfoWindow "${key}" not found`);
        }

        if ( ! Obj.has(item, 'info') ) {
            return true;
        }

        let hidden = ! item.info.getMap();

        if ( Map.closeInfoWindows ) {
            Obj.each(Mix.keys(this.markers), this.closeInfo.bind(this));
        }

        if ( hidden ) {
            item.info.open(this.map, item.marker);
        }

        if ( Mix.isFunction(item.onOpen) ) {
            item.onOpen(item);
        }

        this.styleMarker(key, 'active');

        return hidden;
    }

    /**
     * Close info window
     *
     * @example map.closeInfo("m1")
     *
     * @param {string} key Marker key
     * @returns {boolean|void} Previous state
     */
    closeInfo(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Mix.isEmpty(item) ) {
            return console.error(`InfoWindow "${key}" not found`);
        }

        if ( ! Obj.has(item, 'info') ) {
            return false;
        }

        let visible = !! item.info.getMap();

        if ( visible ) {
            item.info.close();
        }

        if ( Mix.isFunction(item.onClose) ) {
            item.onClose(item);
        }

        this.styleMarker(key, 'default');

        return visible;
    }

    /**
     * Create map marker
     *
     * @example map.createMarker("m1", { lat: 0, lng: 0 })
     *
     * @param {any} [key] Marker key
     * @param {any} [options] Marker options
     * @returns {any} Marker object
     */
    createMarker(key = null, options = {})
    {
        if ( Mix.isEmpty(key) ) {
            key = Hash.uuid();
        }

        let item = { key };

        if ( ! Obj.has(options, 'visible') ) {
            options.visible = true;
        }

        item.extras = Obj.except(options, [
            'map', 'position', 'lat', 'lng', 'html', 'style', 'visible', 'onOpen', 'onClose'
        ]);

        if ( ! Obj.has(options, 'map') ) {
            options.map = this.map;
        }

        if ( ! Obj.has(options, 'position') ) {
            options.position = Obj.only(options, ['lat', 'lng']);
        }

        if ( Obj.has(options, 'style') ) {
            item.style = options.style;
        }

        item.marker = new globalThis.google.maps.Marker(options);

        if ( !options.visible ) {
            item.marker.setVisible(false);
        }

        Obj.assign(item, {
            onOpen: Obj.get(options, 'onOpen'), onClose: Obj.get(options, 'onClose'),
        })

        Obj.set(this.markers, key, item);

        this.clusterMarkers(this.clusterOptions, null, false);

        if ( ! Obj.has(options, 'html') ) {
            return Obj.get(this.markers, key);
        }

        if ( ! Obj.has(item, 'style') ) {
            item.style = 'default';
        }

        // Style marker
        this.styleMarker(key);

        // Add marker hover style
        item.marker.addListener('mouseover', () => this.enterMarker(key));

        // Add marker default style
        item.marker.addListener('mouseout', () => this.leaveMarker(key));

        item.info = new globalThis.google.maps.InfoWindow({
            content: '<div class="gw-i-html">' + Obj.get(options, 'html') + '</div>'
        });

        item.marker.addListener('click', () => this.toggleInfo(key));
        item.info.addListener('closeclick', () => this.closeInfo(key));

        // Dom change event
        item.info.addListener('domready', () => Event.fire('MapsDomReady'));

        Obj.set(this.markers, key, item);

        return Obj.get(this.markers, key);
    }

    /**
     * Set marker position
     *
     * @example map.setMarkerPosition("m1", { lat: 0, lng: 0 })
     *
     * @param {string} key Marker key
     * @param {any} [options] Position options
     * @returns {void} No return value
     */
    setMarkerPosition(key, options = {})
    {
        let item = Obj.get(this.markers, key);

        if ( Mix.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        item.marker.setPosition(options);
    }

    /**
     * Set marker by address
     *
     * @example map.setMarkerByAddress("m1", "Address")
     *
     * @param {string} key Marker key
     * @param {any} address Search address
     * @returns {Promise<any>} Response promise
     */
    setMarkerByAddress(key, address)
    {
        return this.getLocationByAddress(address, (res) => {
            this.setMarkerPosition(key, Obj.get(res, '0.geometry.location', {}));
        });
    }

    /**
     * Get location by address
     *
     * @example map.getLocationByAddress("Address")
     *
     * @param {any} address Search address
     * @param {function} [callback] Success callback
     * @returns {Promise<any>} Response promise
     */
    getLocationByAddress(address, callback = null)
    {
        let geocoderService = new globalThis.google.maps.Geocoder();

        let geocoderPromise = (resolve, reject) => {

            let geocoderResult = (response, status) => {

                if ( status === 'OK' ) {
                    callback(response);
                    resolve(response);
                }

                if ( status !== 'OK' ) {
                    reject(response);
                }

            };

            geocoderService.geocode({ address }, geocoderResult);
        };

        return new Promise(geocoderPromise);
    }

    /**
     * Show markers on map
     *
     * @example map.showMarkers()
     *
     * @param {any} [filter] Marker filter
     * @returns {PicoMap} Current instance
     */
    showMarkers(filter = null)
    {
        let markers = this.markers;

        if ( ! Mix.isEmpty(filter) ) {
            markers = Obj.filter(this.markers, filter);
        }

        if ( Map.hideMarkers ) {
            Obj.each(Mix.keys(this.markers), this.hideMarker.bind(this));
        }

        Obj.each(markers, (item) => this.showMarker(item.key));

        this.clusterMarkers(this.clusterOptions, null, false);

        return this;
    }

    /**
     * Get marker boundary
     *
     * @example map.getMarkerBoundry() // => LatLngBounds
     *
     * @param {any} [filter] Marker filter
     * @returns {any} Boundary object
     */
    getMarkerBoundry(filter = null)
    {
        let markers = this.markers;

        if ( ! Mix.isEmpty(filter) ) {
            markers = Obj.filter(this.markers, filter);
        }

        let boundry = new globalThis.google.maps.LatLngBounds();

        Obj.each(markers, (item) => {
            if ( item.marker.getVisible() ) {
                boundry.extend(item.marker.getPosition());
            }
        });

        return boundry;
    }

    /**
     * Focus markers on map
     *
     * @example map.focusMarkers()
     *
     * @param {any} [filter] Marker filter
     * @param {number} [maxZoom] Max zoom level
     * @param {number} [boundSpace] Viewport space
     * @returns {PicoMap} Current instance
     */
    focusMarkers(filter = null, maxZoom = 14, boundSpace = 15)
    {
        let boundry = this.getMarkerBoundry(filter);

        // Center map to boundry
        this.map.setCenter(boundry.getCenter());

        // Adapt viewport to boundry
        this.map.fitBounds(boundry, boundSpace);

        if ( this.map.getZoom() > maxZoom ) {
            this.map.setZoom(maxZoom);
        }

        return this;
    }

    /**
     * Render directions on map
     *
     * @example map.renderDirections({ origin: "A", destination: "B" })
     *
     * @param {any} options Render options
     * @returns {Promise<any>} Response promise
     */
    renderDirections(options)
    {
        // Get directions service
        let directionsService = new globalThis.google.maps.DirectionsService();

        // Get directions renderer
        let directionsRenderer = new globalThis.google.maps.DirectionsRenderer();

        if ( ! Obj.has(options, 'map') ) {
            options.map = this.map;
        }

        if ( ! Obj.has(options, 'travelMode') ) {
            options.travelMode = 'DRIVING';
        }

        // Set directions map
        directionsRenderer.setMap(options.map);

        if ( Obj.has(options, 'panel') && ! Dom.find(options.panel).empty() ) {
            directionsRenderer.setPanel(Dom.find(options.panel).get(0));
        }

        options = Obj.only(options, ['origin', 'destination', 'travelMode']);

        let directionsPromise = (resolve, reject) => {

            let directionsResult = (response, status) => {

                if ( status === 'OK' ) {
                    directionsRenderer.setDirections(response);
                    resolve(response);
                }

                if ( status !== 'OK' ) {
                    reject(response);
                }

            };

            directionsService.route(options, directionsResult);
        };

        return new Promise(directionsPromise);
    }

}

export default PicoMap;
