import {Component} from "@angular/core";

import TemperatureUnit from "../common/temperature-unit";

@Component({
    selector: "city-weather",
    templateUrl: "city-weather.component.html",
    styleUrls: ["city-weather.component.css"]

})
export class CityWeatherComponent {
    availableCities = ["Minsk",
        "Zhdanovichy",
        "Baravaya",
        "Navinki",
        "Serebryanka",
        "Ratamka",
        "Vostok",
        "Machulishchy",
        "Hatava",
        "Fanipol"];
    selectedCity: string;
    selectedTempUnit: TemperatureUnit;

    unitSelected(selectedUnit: TemperatureUnit){
        this.selectedTempUnit = selectedUnit;
    }
}