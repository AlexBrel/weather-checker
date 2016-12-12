import {Component, Input, OnChanges, ElementRef, ViewChild} from '@angular/core';

import commonConstants from '../common/common-constants';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']

})
export class MapComponent implements OnChanges {
    @Input() lat: number;
    @Input() long: number;
    @ViewChild('googleMap') googleMap: ElementRef;

    ngOnChanges() {
        if (this.lat && this.long) {
            this.showMap();
        }
    }

    private showMap() {
        let map: google.maps.Map,
            marker: google.maps.Marker,
            myLatLng = {
                lat: this.lat,
                lng: this.long
            };

        // Create a map object and specify the DOM element for display.
        map = new google.maps.Map(this.googleMap.nativeElement, {
            center: myLatLng,
            scrollwheel: commonConstants.googleApi.scrollwheel,
            zoom: commonConstants.googleApi.zoom
        });

        // Create a marker and set its position.
        marker = new google.maps.Marker({
            map: map,
            position: myLatLng
        });
    }
}