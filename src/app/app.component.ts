import {Component, OnInit, NgZone} from '@angular/core';
import {Store} from '@ngrx/store';

import {State} from '../states/states';
import {LoadGeoCoordinatesAction} from '../actions/geo-coordinates.actions';
import {Router} from '@angular/router';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private time: number;
    private isYourCityOpened = false;

    constructor(private zone: NgZone, private store: Store<State>, private router: Router) {
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

    toggleYourCityWidget() {
        this.isYourCityOpened = !this.isYourCityOpened;

        this.isYourCityOpened
            ? this.router.navigate([{outlets: {widget: ['your-city']}}])
            : this.router.navigate([{outlets: {widget: null}}]);
    }
}