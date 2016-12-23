import {Component, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';

import temperatureUnit from '../common/temperature-unit';

@Component({
    selector: 'temp-unit-selector',
    templateUrl: './temp-unit-selector.component.html',
    styleUrls: ['./temp-unit-selector.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemperatureUnitSelectorComponent implements AfterViewInit {

    @Output() unitSelected = new EventEmitter();
    temperatureUnits = [temperatureUnit.Celsius, temperatureUnit.Fahrenheit, temperatureUnit.Kelvin];
    selectedUnit: string = this.temperatureUnits[0];

    ngAfterViewInit(): void {
        this.onSelectionChange();
    }

    onSelectionChange() {
        this.unitSelected.emit(this.selectedUnit);
    }
}