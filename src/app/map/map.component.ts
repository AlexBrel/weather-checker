import {Map} from 'immutable';
import {Component, Input, ElementRef, ViewChild, ChangeDetectionStrategy} from '@angular/core';

import {commonConstants} from '../core/common-constants';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {
    @Input() set coordinates(coords: Map<string, number>) {
        if (coords) {
            this.coords = coords;
            this.showMap();
        }
    };

    @ViewChild('googleMap') googleMap: ElementRef;

    private coords: Map<string, number>;

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