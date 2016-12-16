import {Component, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';

import TemperatureUnit from '../common/temperature-unit';

@Component({
    selector: 'temp-unit-selector',
    templateUrl: './temp-unit-selector.component.html',
    styleUrls: ['./temp-unit-selector.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemperatureUnitSelectorComponent implements AfterViewInit {

    @Output() unitSelected = new EventEmitter();
    temperatureUnits = [TemperatureUnit.Celsius, TemperatureUnit.Fahrenheit, TemperatureUnit.Kelvin];
    temperatureUnitShortcuts = ['°C', '°F', 'K'];
    selectedUnit: TemperatureUnit = this.temperatureUnits[0];

    ngAfterViewInit(): void {
        this.onSelectionChange();
    }

    onSelectionChange() {
        this.unitSelected.emit(this.selectedUnit);
    }
}