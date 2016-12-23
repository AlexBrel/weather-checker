import Immutable = require('immutable');
import {Component, Input, OnChanges, ElementRef, ViewChild, ChangeDetectionStrategy} from '@angular/core';

import commonConstants from '../common/common-constants';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnChanges {
    @Input() coordinates: Immutable.Map<string, number>;
    @ViewChild('googleMap') googleMap: ElementRef;

    ngOnChanges() {
        if (this.coordinates) {
            this.showMap();
        }
    }

    private showMap() {
        let map: google.maps.Map,
            myLatLng = {
                lat: this.coordinates.get('lat'),
                lng: this.coordinates.get('long')
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