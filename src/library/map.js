import { Obj, Any, Dom, Locale, UUID } from "../index";

export default class Map
{
    map = null;

    markers = {};

    constructor(el, options = {})
    {
        let center = Obj.only(options, ['lat', 'lng']);

        options = Obj.assign({ zoom: 15, center },
            Obj.except(options, ['lat', 'lng']));

        this.map = new google.maps.Map(Dom.find(el).get(0), options)
    }

    getMarker(key)
    {
        return Obj.get(this.markers, key);
    }

    getMarkerState(key)
    {
        Obj.get(this.markers, [key, 'extras', 'showMarker']);
    }

    toggleMarker(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        if ( Obj.get(item, 'extras.showMarker') ) {
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

        item.marker.setVisible(true);
        Obj.set(this.markers, [key, 'extras', 'showMarker'], true);

        return item;
    }

    hideMarker(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        item.marker.setVisible(false);
        Obj.set(this.markers, [key, 'extras', 'showMarker'], false);

        return item;
    }

    getInfoState(key)
    {
        Obj.get(this.markers, [key, 'extras', 'showInfo']);
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
            return console.error(`Marker "${key}" not found`);
        }

        item.info.open(map, item.marker);
        Obj.set(this.markers, [key, 'extras', 'showInfo'], true);

        return item;
    }

    closeInfo(key)
    {
        let item = Obj.get(this.markers, key);

        if ( Any.isEmpty(item) ) {
            return console.error(`Marker "${key}" not found`);
        }

        item.info.close();
        Obj.set(this.markers, [key, 'extras', 'showInfo'], false);

        return item;
    }

    createMarker(key = null, options = {})
    {
        let map = this.map;

        if ( Any.isEmpty(key) ) {
            key = UUID();
        }

        let position = Obj.only(options, ['lat', 'lng']);

        let info = new google.maps.InfoWindow({
            content: Obj.get(options, 'html', Locale.trans('Undefined'))
        });

        let marker = new google.maps.Marker({ position, map });

        marker.addListener('click', () => this.toggleInfo(key));

        let extras = Obj.assign({ showInfo: false, showMarker: true },
            Obj.except(options, ['lat', 'lng']));

        let item = {
            key, info, marker, extras
        };

        Obj.set(this.markers, key, item);

        return item;
    }

}
