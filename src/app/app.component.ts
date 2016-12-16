import Immutable = require('immutable');
import {Component, OnInit, NgZone} from '@angular/core';

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

    private time: number;

    constructor(private zone: NgZone) {
        this.zone.onUnstable.subscribe(() => {
            this.time = performance.now();
        });

        this.zone.onStable.subscribe(() => {
            console.log(`stabilization time: ${(performance.now() - this.time).toFixed(3)}ms`);
        });
    }

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
        if (event.error) {
            console.error(event.error);
        } else {
            if (!this.isWeatherTableReady) {
                this.isWeatherTableReady = event.isTableReady;
            }
            this.isLoading = !event.isTableReady;
        }
    }
}