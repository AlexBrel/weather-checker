import {Component, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';

import {temperatureUnit} from '../temperature-unit';

@Component({
    selector: 'temp-unit-selector',
    templateUrl: 'temp-unit-selector.component.html',
    styleUrls: ['temp-unit-selector.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemperatureUnitSelectorComponent implements AfterViewInit {

    @Output() selectUnit = new EventEmitter();
    temperatureUnits = [temperatureUnit.Celsius, temperatureUnit.Fahrenheit, temperatureUnit.Kelvin];
    selectedUnit: string = this.temperatureUnits[0];

    ngAfterViewInit(): void {
        this.changeSelection();
    }

    changeSelection() {
        this.selectUnit.emit(this.selectedUnit);
    }
}