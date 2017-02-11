import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {Map} from 'immutable';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {Weather} from '../core/weather';
import {State} from '../../states/states';
import {getCoords} from '../../reducers/geo-location.reducer';
import {LoadYourCityWeatherAction} from '../../actions/cities.actions';
import {getYourCityWeather} from '../../reducers/cities.reducer';
import {City} from '../core/city';

@Component({
    selector: 'your-city',
    templateUrl: 'your-city.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YourCityComponent implements OnInit, OnDestroy {
    weather: Weather;
    cityName: string;
    private coordsSubscription: Subscription;
    private citySubscription: Subscription;

    constructor(private cd: ChangeDetectorRef, private store: Store<State>) {
    }

    ngOnInit(): void {
        this.coordsSubscription = this.store.select(getCoords)
            .subscribe((coords: Map<string, number>) => {
                if (coords) {
                    this.store.dispatch(new LoadYourCityWeatherAction(coords));
                }
            });
        this.citySubscription = this.store.select(getYourCityWeather)
            .subscribe((city: City) => {
                if (city) {
                    this.weather = city.main;
                    this.cityName = city.name;
                    this.cd.markForCheck();
                }
            });
    }

    ngOnDestroy(): void {
        this.coordsSubscription.unsubscribe();
        this.citySubscription.unsubscribe();
    }
}