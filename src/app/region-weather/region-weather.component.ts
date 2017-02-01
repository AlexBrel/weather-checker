import {Map, List} from 'immutable';
import {
    Component, Output, EventEmitter, ChangeDetectorRef,
    ChangeDetectionStrategy, OnInit
} from '@angular/core';
import {Store} from '@ngrx/store';

import {City} from '../core/city';
import {State} from '../../states/states';
import {LoadRegionWeatherAction} from '../../actions/region-weather.actions';
import {LoggerService} from '../core/logger/logger.service';
import {getCoords} from '../../reducers/geo-location.reducer';
import {getRegionWeather} from '../../reducers/region-weather.reducer';

const TIME_TO_WAIT = 5000;

@Component({
    selector: 'region-weather',
    templateUrl: 'region-weather.component.html',
    styleUrls: ['region-weather.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegionWeatherComponent implements OnInit {
    private coords: Map<string, number>;
    private cities: List<City>;
    private selectedTempUnit: string;

    @Output() tableReady = new EventEmitter();

    constructor(private cd: ChangeDetectorRef, private logger: LoggerService, private store: Store<State>) {
    }

    ngOnInit(): void {
        this.store.select(getRegionWeather)
            .subscribe((citiesWeather: List<City>) => {
                    this.cities = citiesWeather;

                    if (this.coords) {
                        this.updateRegionWeather(TIME_TO_WAIT);
                        this.tableReady.emit({error: null, isTableReady: true});
                        this.cd.markForCheck();
                    }
                },
                (error: Error) => {
                    this.tableReady.emit({error: error, isTableReady: false});
                    this.logger.error(error);
                }
            );
        this.store.select(getCoords)
            .subscribe((newCoords: Map<string, number>) => {
                if (newCoords) {
                    this.coords = newCoords;
                    this.updateRegionWeather();
                }
            });
    }

    selectUnit(selectedUnit: string) {
        this.selectedTempUnit = selectedUnit;
    }

    private updateRegionWeather(timeToWait?: number) {
        if (timeToWait) {
            setTimeout(() => {
                this.tableReady.emit({error: null, isTableReady: false});
                this.store.dispatch(new LoadRegionWeatherAction(this.coords));
            }, timeToWait);
        } else {
            this.store.dispatch(new LoadRegionWeatherAction(this.coords));
        }
    }
}