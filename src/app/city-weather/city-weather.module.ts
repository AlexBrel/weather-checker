import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CityWeatherComponent} from './city-weather.component';
import {WeatherRequestPipe} from './weather-request.pipe';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, SharedModule],
    declarations: [
        CityWeatherComponent,
        WeatherRequestPipe
    ],
    exports: [CityWeatherComponent, WeatherRequestPipe]
})
export class CityWeatherModule {
}
