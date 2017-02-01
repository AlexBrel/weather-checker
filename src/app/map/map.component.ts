import {Map} from 'immutable';
import {Component, ElementRef, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';

import {commonConstants} from '../core/common-constants';
import {State} from '../../states/states';
import {getCoords} from '../../reducers/geo-location.reducer';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {
    @ViewChild('googleMap') googleMap: ElementRef;

    private coords: Map<string, number>;

    constructor(private store: Store<State>) {
        store.select(getCoords)
            .subscribe((newCoords: Map<string, number>) => {
                if (newCoords) {
                    this.coords = newCoords;
                    this.showMap();
                }
            });
    }

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