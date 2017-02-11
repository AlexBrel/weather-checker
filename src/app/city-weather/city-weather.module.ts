import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CityWeatherComponent} from './city-weather.component';
import {SharedModule} from '../shared/shared.module';
import {WeatherDetailsContainer} from './weather-details-container/weather-details.container';
import {CityWeatherRoutingModule} from './city-weather-routing.module';

@NgModule({
    imports: [CommonModule, FormsModule, SharedModule, CityWeatherRoutingModule],
    declarations: [
        CityWeatherComponent,
        WeatherDetailsContainer
    ],
    exports: [CityWeatherComponent]
})
export class CityWeatherModule {
}
