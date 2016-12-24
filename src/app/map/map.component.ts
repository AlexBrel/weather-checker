import Immutable = require('immutable');
import {Component, Input, ElementRef, ViewChild, ChangeDetectionStrategy} from '@angular/core';

import commonConstants from '../common/common-constants';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {
    @Input() set coordinates(coords: Immutable.Map<string, number>) {
        if (coords) {
            this.coords = coords;
            this.showMap();
        }
    };

    @ViewChild('googleMap') googleMap: ElementRef;

    private coords: Immutable.Map<string, number>;

    private showMap() {
        let map: google.maps.Map,
            myLatLng = {
                lat: this.coords.get('lat'),
                lng: this.coords.get('long')
            };

        // Create a map object and specify the DOM element for display.
        map = new google.maps.Map(this.googleMap.nativeElement, {
            center: myLatLng,
            scrollwheel: commonConstants.googleApi.scrollwheel,
            zoom: commonConstants.googleApi.zoom
        });

        // Create a marker and set its position.
        new google.maps.Marker({
            map: map,
            position: myLatLng
        });
    }
}