import Immutable = require('immutable');
import {Component, OnInit, NgZone} from '@angular/core';

import TableReadyEvent from './region-weather/table-ready-event';
import GeoPositionService from "./shared/geo-position.service";

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

    constructor(private zone: NgZone, private geoPositionService: GeoPositionService) {
        this.zone.onUnstable.subscribe(() => {
            this.time = performance.now();
        });

        this.zone.onStable.subscribe(() => {
            console.log(`stabilization time: ${(performance.now() - this.time).toFixed(3)}ms`);
        });
    }

    ngOnInit(): void {
        this.geoPositionService.getCoordinates().subscribe(
            (coordinates: Immutable.Map<string, number>) => {
                this.coordinates = coordinates;
            },
            (error: Error) => {
                console.error(error);
            });
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