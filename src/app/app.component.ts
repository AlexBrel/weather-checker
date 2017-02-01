import {Component, OnInit, NgZone} from '@angular/core';
import {Store} from '@ngrx/store';

import {TableReadyEvent} from './region-weather/table-ready-event';
import {State} from '../states/states';
import {LoadGeoCoordinatesAction} from '../actions/geo-coordinates.actions';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private isWeatherTableReady: boolean = false;
    private isLoading: boolean = true;
    private time: number;

    constructor(private zone: NgZone, private store: Store<State>) {
        this.zone.onUnstable.subscribe(() => {
            this.time = performance.now();
        });

        this.zone.onStable.subscribe(() => {
            console.log(`stabilization time: ${(performance.now() - this.time).toFixed(3)}ms`);
        });
    }

    ngOnInit(): void {
        this.store.dispatch(new LoadGeoCoordinatesAction());
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