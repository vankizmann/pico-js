/**
 * @const {object} google
 */
export class PicoMap {
    static mapStyle: any[];
    static markerStyles: {};
    static hideMarkers: boolean;
    static closeInfoWindows: boolean;
    /**
     * Set global map style
     *
     * @example Map.setMapStyle(style)
     *
     * @param {Array<any>} [style] Style array
     * @returns {this} Current class
     */
    static setMapStyle(style?: Array<any>): this;
    /**
     * Set marker style
     *
     * @example Map.setMarkerStyle("default", { default: "icon.png" })
     *
     * @param {string} key Style key
     * @param {any} [style] Style options
     * @param {any} [extra] Extra options
     * @returns {this} Current class
     */
    static setMarkerStyle(key: string, style?: any, extra?: any): this;
    /**
     * Create map instance
     *
     * @example new Map("#map", { lat: 0, lng: 0 })
     *
     * @param {any} el Target element
     * @param {any} [options] Map options
     */
    constructor(el: any, options?: any);
    map: any;
    markers: {};
    cluster: any;
    clusterFilter: any;
    clusterOptions: {};
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
    clusterMarkers(options?: any, filter?: any, allowCreate?: boolean): void;
    /**
     * Apply style to marker
     *
     * @example map.styleMarker("m1", "hover")
     *
     * @param {string} key Marker key
     * @param {any} [type] Style type
     * @returns {void} No return value
     */
    styleMarker(key: string, type?: any): void;
    /**
     * Get marker by key
     *
     * @example map.getMarker("m1")
     *
     * @param {string} key Marker key
     * @returns {any} Marker object
     */
    getMarker(key: string): any;
    /**
     * Check if marker is visible
     *
     * @example map.getMarkerVisibility("m1") // => true
     *
     * @param {string} key Marker key
     * @param {boolean} [fallback] Fallback value
     * @returns {boolean} Visibility state
     */
    getMarkerVisibility(key: string, fallback?: boolean): boolean;
    /**
     * Get marker position
     *
     * @example map.getMarkerPositon("m1") // => LatLng
     *
     * @param {string} key Marker key
     * @param {any} [fallback] Fallback value
     * @returns {any} Position object
     */
    getMarkerPositon(key: string, fallback?: any): any;
    /**
     * Toggle marker visibility
     *
     * @example map.toggleMarker("m1")
     *
     * @param {string} key Marker key
     * @returns {boolean|void} Visibility state
     */
    toggleMarker(key: string): boolean | void;
    /**
     * Show marker on map
     *
     * @example map.showMarker("m1")
     *
     * @param {string} key Marker key
     * @returns {boolean|void} Previous state
     */
    showMarker(key: string): boolean | void;
    /**
     * Hide marker on map
     *
     * @example map.hideMarker("m1")
     *
     * @param {string} key Marker key
     * @returns {boolean|void} Previous state
     */
    hideMarker(key: string): boolean | void;
    /**
     * Marker hover enter
     *
     * @example map.enterMarker("m1")
     *
     * @param {string} key Marker key
     * @returns {this|void} Current instance
     */
    enterMarker(key: string): this | void;
    /**
     * Marker hover leave
     *
     * @example map.leaveMarker("m1")
     *
     * @param {string} key Marker key
     * @returns {this|void} Current instance
     */
    leaveMarker(key: string): this | void;
    /**
     * Check if info is open
     *
     * @example map.getInfoVisibility("m1") // => true
     *
     * @param {string} key Marker key
     * @param {boolean} [fallback] Fallback value
     * @returns {boolean} Visibility state
     */
    getInfoVisibility(key: string, fallback?: boolean): boolean;
    /**
     * Toggle info window
     *
     * @example map.toggleInfo("m1")
     *
     * @param {string} key Marker key
     * @returns {boolean|void} Visibility state
     */
    toggleInfo(key: string): boolean | void;
    /**
     * Open info window
     *
     * @example map.openInfo("m1")
     *
     * @param {string} key Marker key
     * @returns {boolean|void} Previous state
     */
    openInfo(key: string): boolean | void;
    /**
     * Close info window
     *
     * @example map.closeInfo("m1")
     *
     * @param {string} key Marker key
     * @returns {boolean|void} Previous state
     */
    closeInfo(key: string): boolean | void;
    /**
     * Create map marker
     *
     * @example map.createMarker("m1", { lat: 0, lng: 0 })
     *
     * @param {any} [key] Marker key
     * @param {any} [options] Marker options
     * @returns {any} Marker object
     */
    createMarker(key?: any, options?: any): any;
    /**
     * Set marker position
     *
     * @example map.setMarkerPosition("m1", { lat: 0, lng: 0 })
     *
     * @param {string} key Marker key
     * @param {any} [options] Position options
     * @returns {void} No return value
     */
    setMarkerPosition(key: string, options?: any): void;
    /**
     * Set marker by address
     *
     * @example map.setMarkerByAddress("m1", "Address")
     *
     * @param {string} key Marker key
     * @param {any} address Search address
     * @returns {Promise<any>} Response promise
     */
    setMarkerByAddress(key: string, address: any): Promise<any>;
    /**
     * Get location by address
     *
     * @example map.getLocationByAddress("Address")
     *
     * @param {any} address Search address
     * @param {function} [callback] Success callback
     * @returns {Promise<any>} Response promise
     */
    getLocationByAddress(address: any, callback?: Function): Promise<any>;
    /**
     * Show markers on map
     *
     * @example map.showMarkers()
     *
     * @param {any} [filter] Marker filter
     * @returns {this} Current instance
     */
    showMarkers(filter?: any): this;
    /**
     * Get marker boundary
     *
     * @example map.getMarkerBoundry() // => LatLngBounds
     *
     * @param {any} [filter] Marker filter
     * @returns {any} Boundary object
     */
    getMarkerBoundry(filter?: any): any;
    /**
     * Focus markers on map
     *
     * @example map.focusMarkers()
     *
     * @param {any} [filter] Marker filter
     * @param {number} [maxZoom] Max zoom level
     * @param {number} [boundSpace] Viewport space
     * @returns {this} Current instance
     */
    focusMarkers(filter?: any, maxZoom?: number, boundSpace?: number): this;
    /**
     * Render directions on map
     *
     * @example map.renderDirections({ origin: "A", destination: "B" })
     *
     * @param {any} options Render options
     * @returns {Promise<any>} Response promise
     */
    renderDirections(options: any): Promise<any>;
}
export default PicoMap;
