// types/utility/map.d.ts

declare class Map {
    map: any;
    static mapStyle: any[];
    markers: object;
    static markerStyles: object;
    cluster: any;
    clusterFilter: Function | null;
    clusterOptions: object;
    static hideMarkers: boolean;
    static closeInfoWindows: boolean;

    constructor(el: any, options?: object);

    static setMapStyle(style?: any[]): typeof Map;
    static setMarkerStyle(key: string, style?: object, extra?: object): typeof Map;

    clusterMarkers(options?: object, filter?: Function | null, allowCreate?: boolean): void;
    styleMarker(key: string, type?: string | null): void;
    getMarker(key: string): any;
    getMarkerVisibility(key: string, fallback?: boolean): boolean;
    getMarkerPositon(key: string, fallback?: any): any;
    toggleMarker(key: string): boolean;
    showMarker(key: string): boolean;
    hideMarker(key: string): boolean;
    enterMarker(key: string): this;
    leaveMarker(key: string): this;
    getInfoVisibility(key: string, fallback?: boolean): boolean;
    toggleInfo(key: string): boolean;
    openInfo(key: string): boolean;
    closeInfo(key: string): boolean;
    createMarker(key?: string | null, options?: object): any;
    setMarkerPosition(key: string, options?: object): void;
    setMarkerByAddress(key: string, address: string): Promise<any>;
    getLocationByAddress(address: string, callback?: Function | null): Promise<any>;
    showMarkers(filter?: any): this;
    getMarkerBoundry(filter?: any): any;
    focusMarkers(filter?: any, maxZoom?: number, boundSpace?: number): this;
    renderDirections(options: object): Promise<any>;
}

export default Map;
