import Immutable = require('immutable');
import {Component, OnInit} from '@angular/core';

import TableReadyEvent from './region-weather/table-ready-event';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    coordinates: Immutable.Map<string, number>;
    isWeatherTableReady: boolean = false;
    isLoading: boolean = true;

    ngOnInit(): void {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition((position: Position) => {
                this.coordinates  = Immutable.fromJS({lat: position.coords.latitude, long: position.coords.longitude});
            });
        } else {
            console.log('Geoposition is not defined');
        }
    }

    weatherTableReady(event: TableReadyEvent) {
        if (event.error) {//gfe
            console.error(event.error);
        } else {
            this.isWeatherTableReady = event.isTableReady;
            this.isLoading = event.isLoading;
        }
    }
}