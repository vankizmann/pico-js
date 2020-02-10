import { Obj, Any, Dom, Locale, UUID } from "../index";

export default class Map
{
    map = null;

    static mapStyle = [];

    markers = {};

    static markerStyles = {};

    hideMarkers = true;

    closeInfoWindows = true;

    constructor(el, options = {})
    {
        let center = Obj.only(options, ['lat', 'lng']);

        if ( ! Obj.has(options, 'styles') ) {
            options.styles = Map.mapStyle;
        }

        options = Obj.assign({ gestureHandling: 'cooperative', scrollwheel: null, zoom: 12, center },
            Obj.except(options, ['lat', 'lng']));

        this.map = new google.maps.Map(Dom.find(el).get(0), options)
    }

    static setMapStyle(style = [])
    {
        Map.mapStyle = style;

        return this;
    }

    static setMarkerStyle(key, style = {})
    {
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
        let size = new google.maps.Size(style.width, style.height);

        // Point position
        let point = new google.maps.Point(0, 0);

        final.default = {
            url: style.default, size: size, origin: point, anchor: point, scaledSize: size
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

        Obj.set(Map.markerStyles, key, final);

        return this;
    }

    styleMarker(key, type = null)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        if ( Any.isEmpty(type) ) {
            type = this.getInfoVisibility(key) ? 'active' : 'default';
        }

        if ( ! Obj.has(Map.markerStyles, [item.style, type]) ) {
            return;
        }

        item.marker.setIcon(Obj.get(Map.markerStyles, [item.style, type]));
    }

    getMarker(key)
    {
        return Obj.get(this.markers, key);
    }

    getMarkerVisibility(key, fallback = false)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return fallback;
        }

        return !! item.info.getMap();
    }

    getMarkerPositon(key, fallback = null)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return fallback;
        }

        return item.marker.getPosition();
    }

    toggleMarker(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        if ( item.marker.getVisible() ) {
            return this.hideMarker(key);
        }

        return this.showMarker(key);
    }

    showMarker(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        let hidden = ! item.marker.getVisible();

        if ( hidden ) {
            item.marker.setVisible(true);
        }

        return hidden;
    }

    hideMarker(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        let visible = !! item.marker.getVisible();

        if ( visible ) {
            item.marker.setVisible(false);
        }

        this.closeInfo(key);

        return visible;
    }

    enterMarker(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        let type = 'hover';

        if ( this.getInfoVisibility(key) ) {
            type = 'active';
        }

        this.styleMarker(key, type);

        return this;
    }

    leaveMarker(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        let type = 'default';

        if ( this.getInfoVisibility(key) ) {
            type = 'active';
        }

        this.styleMarker(key, type);

        return this;
    }

    getInfoVisibility(key, fallback = false)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return fallback;
        }

        return !! item.info.getMap();
    }

    toggleInfo(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        if ( item.info.getMap() ) {
            return this.closeInfo(key);
        }

        return this.openInfo(key);
    }

    openInfo(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return console.error(`InfoWindow "${key}" not found`);
        }

        if ( ! Obj.has(item, 'info') ) {
            return true;
        }

        let hidden = ! item.info.getMap();

        if ( this.closeInfoWindows ) {
            Obj.each(Any.keys(this.markers), this.closeInfo.bind(this));
        }

        if ( hidden ) {
            item.info.open(this.map, item.marker);
        }

        this.styleMarker(key, 'active');

        return hidden;
    }

    closeInfo(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return console.error(`InfoWindow "${key}" not found`);
        }

        if ( ! Obj.has(item, 'info') ) {
            return false;
        }

        let visible = !! item.info.getMap();

        if ( visible ) {
            item.info.close();
        }

        this.styleMarker(key, 'default');

        return visible;
    }

    createMarker(key = null, options = {})
    {
        if ( Any.isEmpty(key) ) {
            key = UUID();
        }

        let item = { key };

        item.extras = Obj.except(options, [
            'map', 'position', 'lat', 'lng', 'html', 'style'
        ]);

        if ( ! Obj.has(options, 'map') ) {
            options.map = this.map;
        }

        if ( ! Obj.has(options, 'positon') ) {
            options.position = Obj.only(options, ['lat', 'lng']);
        }

        if ( Obj.has(options, 'style') ) {
            item.style = options.style;
        }

        item.marker = new google.maps.Marker(options);

        Obj.set(this.markers, key, item);

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

        item.info = new google.maps.InfoWindow({
            content: '<div class="gw-i-html">' + Obj.get(options, 'html') + '</div>'
        });

        item.marker.addListener('click', () => this.toggleInfo(key));
        item.info.addListener('closeclick', () => this.closeInfo(key));

        Obj.set(this.markers, key, item);

        return Obj.get(this.markers, key);
    }

    setMarkerPosition(key, options = {})
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        item.marker.setPosition(options);
    }

    setMarkerByAddress(key, address)
    {
        let geocoderService = new google.maps.Geocoder();

        let geocoderPromise = (resolve, reject) => {

            let geocoderResult = (response, status) => {

                if ( status === 'OK' ) {
                    this.setMarkerPosition(key, Obj.get(response, '0.geometry.location', {}));
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

    showMarkers(filter = null)
    {
        let markers = this.markers;

        if ( ! Any.isEmpty(filter) ) {
            markers = Obj.filter(this.markers, filter);
        }

        if ( this.hideMarkers ) {
            Obj.each(Any.keys(this.markers), this.hideMarker.bind(this));
        }

        Obj.each(markers, (item) => this.showMarker(item.key));

        return this;
    }

    getMarkerBoundry()
    {
        let boundry = new google.maps.LatLngBounds();

        Obj.each(this.markers, (item) => {
            if ( item.marker.getVisible() ) {
                boundry.extend(item.marker.getPosition());
            }
        });

        return boundry;
    }

    focusMarkers(filter = null, maxZoom = 12)
    {
        let boundry = this.getMarkerBoundry();

        // Center map to boundry
        this.map.setCenter(boundry.getCenter());

        // Adapt viewport to boundry
        this.map.fitBounds(boundry, 15);

        if ( this.map.getZoom() > maxZoom ) {
            this.map.setZoom(maxZoom);
        }

        return this;
    }

    renderDirections(options)
    {
        // Get directions service
        let directionsService = new google.maps.DirectionsService();

        // Get directions renderer
        let directionsRenderer = new google.maps.DirectionsRenderer();

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
