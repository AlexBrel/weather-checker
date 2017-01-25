import {Map, List} from 'immutable';
import {
    Component, Input, Output, EventEmitter, ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {Subject} from 'rxjs';

import {City} from '../core/city';
import {OpenWeatherMapService} from '../shared/open-weather-map.service';

@Component({
    selector: 'region-weather',
    templateUrl: 'region-weather.component.html',
    styleUrls: ['region-weather.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegionWeatherComponent {
    private coords: Map<string, number>;

    @Input() set coordinates(coords: Map<string, number>) {
        if (coords) {
            this.coords = coords;
            this.updateTable();
        }
    };

    @Output() tableReady = new EventEmitter();

    cities: List<City>;
    selectedTempUnit: string;

    constructor(private owmService: OpenWeatherMapService, private cd: ChangeDetectorRef) {
    }

    selectUnit(selectedUnit: string) {
        this.selectedTempUnit = selectedUnit;
    }

    private updateTable() {
        let $isWeatherUpdates = new Subject<boolean>(),
            $regionWeather = this.owmService.getRegionWeather(this.coords, $isWeatherUpdates);

        $regionWeather.subscribe(
            (citiesWeather: List<City>) => {
                this.cities = citiesWeather;
                this.tableReady.emit({error: null, isTableReady: true});
                this.cd.markForCheck();
            },
            (error: Error) => {
                this.tableReady.emit({error: error, isTableReady: false});
            }
        );

        $isWeatherUpdates.subscribe(() => {
            this.tableReady.emit({error: null, isTableReady: false});
        });
    }
}