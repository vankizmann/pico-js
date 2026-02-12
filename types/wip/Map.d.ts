/**
 * @const {object} google
 */
export class PicoMap {
    static mapStyle: any[];
    static markerStyles: {};
    static hideMarkers: boolean;
    static closeInfoWindows: boolean;
    static setMapStyle(style?: any[]): typeof PicoMap;
    static setMarkerStyle(key: any, style?: {}, extra?: {}): void | typeof PicoMap;
    constructor(el: any, options?: {});
    map: any;
    markers: {};
    cluster: any;
    clusterFilter: any;
    clusterOptions: {};
    clusterMarkers(options?: {}, filter?: any, allowCreate?: boolean): void;
    styleMarker(key: any, type?: any): void;
    getMarker(key: any): any;
    getMarkerVisibility(key: any, fallback?: boolean): any;
    getMarkerPositon(key: any, fallback?: any): any;
    toggleMarker(key: any): boolean | void;
    showMarker(key: any): boolean | void;
    hideMarker(key: any): boolean | void;
    enterMarker(key: any): void | this;
    leaveMarker(key: any): void | this;
    getInfoVisibility(key: any, fallback?: boolean): boolean;
    toggleInfo(key: any): boolean | void;
    openInfo(key: any): boolean | void;
    closeInfo(key: any): boolean | void;
    createMarker(key?: any, options?: {}): any;
    setMarkerPosition(key: any, options?: {}): void;
    setMarkerByAddress(key: any, address: any): Promise<any>;
    getLocationByAddress(address: any, callback?: any): Promise<any>;
    showMarkers(filter?: any): this;
    getMarkerBoundry(filter?: any): any;
    focusMarkers(filter?: any, maxZoom?: number, boundSpace?: number): this;
    renderDirections(options: any): Promise<any>;
}
export default PicoMap;
