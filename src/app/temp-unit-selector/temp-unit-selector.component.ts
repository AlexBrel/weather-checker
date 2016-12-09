import {Component, Output, OnChanges, EventEmitter} from "@angular/core";

import TemperatureUnit from "../common/temperature-unit";

@Component({
    selector: "temp-unit-selector",
    templateUrl: "./temp-unit-selector.component.html",
    styleUrls: ["./temp-unit-selector.component.css"]

})
export class TemperatureUnitSelectorComponent {
    @Output() unitSelected = new EventEmitter();
    temperatureUnits = [TemperatureUnit.Celsius, TemperatureUnit.Fahrenheit, TemperatureUnit.Kelvin];
    temperatureUnitShortcuts = ["°C", "°F", "K"];
    selectedUnit: TemperatureUnit = this.temperatureUnits[0];

    onSelectionChange() {
        this.unitSelected.emit(this.selectedUnit);
    }
}