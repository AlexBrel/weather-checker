import {Map, List} from 'immutable';
import {
    Component, ChangeDetectorRef, ChangeDetectionStrategy, OnInit,
    OnDestroy
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import {City} from '../core/city';
import {State} from '../../states/states';
import {LoadRegionWeatherAction} from '../../actions/region-weather.actions';
import {LoggerService} from '../core/logger/logger.service';
import {getCoords} from '../../reducers/geo-location.reducer';
import {getRegionWeather} from '../../reducers/region-weather.reducer';
import {RegionSettings, InitialRegionSettings} from './region-settings';

const TIME_TO_WAIT = 5000;

@Component({
    selector: 'region-weather',
    templateUrl: 'region-weather.component.html',
    styleUrls: ['region-weather.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegionWeatherComponent implements OnInit, OnDestroy {
    private coords: Map<string, number>;
    private cities: List<City>;
    private isLoading: boolean = true;
    private regionSettings: RegionSettings = InitialRegionSettings;
    private coordsSubscription: Subscription;
    private regionSubscription: Subscription;

    constructor(private cd: ChangeDetectorRef, private logger: LoggerService, private store: Store<State>) {
    }

    ngOnInit(): void {
        this.regionSubscription = this.store.select(getRegionWeather)
            .subscribe((cities: List<City>) => {
                    this.cities = cities;

                    if (this.coords) {
                        this.updateRegionWeather(TIME_TO_WAIT);
                        this.isLoading = false;
                        this.cd.markForCheck();
                    }
                },
                (error: Error) => {
                    this.isLoading = true;
                    this.logger.error(error);
                }
            );
        this.coordsSubscription = this.store.select(getCoords)
            .subscribe((newCoords: Map<string, number>) => {
                if (newCoords) {
                    this.coords = newCoords;
                    this.updateRegionWeather();
                }
            });

    }

    updateSettings(regionSettings: RegionSettings) {
        this.regionSettings = regionSettings;

        if (this.cities.size > this.regionSettings.citiesCount) {
            this.cities = this.cities.setSize(this.regionSettings.citiesCount);
        }
    }

    private updateRegionWeather(timeToWait?: number) {
        if (timeToWait) {
            setTimeout(() => {
                this.isLoading = true;
                this.store.dispatch(new LoadRegionWeatherAction({
                    coords: this.coords,
                    citiesCount: this.regionSettings.citiesCount
                }));
            }, timeToWait);
        } else {
            this.store.dispatch(new LoadRegionWeatherAction({
                coords: this.coords,
                citiesCount: this.regionSettings.citiesCount
            }));
        }
    }

    ngOnDestroy(): void {
        this.regionSubscription.unsubscribe();
        this.coordsSubscription.unsubscribe();
    }
}