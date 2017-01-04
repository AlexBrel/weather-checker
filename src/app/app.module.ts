import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {MainHeaderComponent} from './main-header/main-header.component';
import {MainFooterComponent} from './main-footer/main-footer.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {RegionWeatherComponent} from './region-weather/region-weather.component';
import {CityWeatherComponent} from './city-weather/city-weather.component';
import {MapComponent} from './map/map.component';
import {TemperatureUnitSelectorComponent} from './temp-unit-selector/temp-unit-selector.component';
import {TemperatureStringPipe} from './common/temperature-string.pipe';
import {ConvertTemperaturePipe} from './common/convert-temperature.pipe';
import {FloorTemperaturePipe} from './common/floor-temperature.pipe';
import {WeatherRequestPipe} from './city-weather/weather-request.pipe';
import TempColorDirective from './region-weather/temp-color.directive';
import WindArrowComponent from './wind-arrow/wind-arrow.component';
import WeatherConditions from './weather-conditions/weather-conditions.component';
import DirectionalArrowDirective from './wind-arrow/directional-arrow.directive';

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule, HttpModule],
    declarations: [AppComponent,
        MainHeaderComponent,
        MainFooterComponent,
        SpinnerComponent,
        RegionWeatherComponent,
        MapComponent,
        TemperatureUnitSelectorComponent,
        CityWeatherComponent,
        TemperatureStringPipe,
        ConvertTemperaturePipe,
        FloorTemperaturePipe,
        WeatherRequestPipe,
        TempColorDirective,
        WindArrowComponent,
        WeatherConditions,
        DirectionalArrowDirective
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
