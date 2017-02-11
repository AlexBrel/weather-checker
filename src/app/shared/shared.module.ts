import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TemperatureUnitSelectorComponent} from './temp-unit-selector/temp-unit-selector.component';
import {TemperatureStringPipe} from './temperature-string.pipe';
import {ConvertTemperaturePipe} from './convert-temperature.pipe';
import {FloorTemperaturePipe} from './floor-temperature.pipe';
import {OpenWeatherMapService} from './open-weather-map.service';
import {SpinnerComponent} from './spinner/spinner.component';
import {WeatherDetailsComponent} from './weather-details/weather-details.component';


@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [
        SpinnerComponent,
        WeatherDetailsComponent,
        TemperatureUnitSelectorComponent,
        TemperatureStringPipe,
        ConvertTemperaturePipe,
        FloorTemperaturePipe
    ],
    providers: [OpenWeatherMapService],
    exports: [
        CommonModule,
        FormsModule,
        SpinnerComponent,
        WeatherDetailsComponent,
        TemperatureUnitSelectorComponent,
        TemperatureStringPipe,
        ConvertTemperaturePipe,
        FloorTemperaturePipe
    ]
})
export class SharedModule {
}
