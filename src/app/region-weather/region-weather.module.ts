import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegionWeatherComponent} from './region-weather.component';
import TempColorDirective from './temp-color.directive';
import WindArrowComponent from './wind-arrow/wind-arrow.component';
import WeatherConditionsComponent from './weather-conditions/weather-conditions.component';
import DirectionalArrowDirective from './wind-arrow/directional-arrow.directive';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        RegionWeatherComponent,
        TempColorDirective,
        WindArrowComponent,
        WeatherConditionsComponent,
        DirectionalArrowDirective
    ],
    exports: [RegionWeatherComponent]
})
export class RegionWeatherModule {}
