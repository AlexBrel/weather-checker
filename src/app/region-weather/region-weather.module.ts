import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegionWeatherComponent} from './region-weather.component';
import {TempColorDirective} from './temp-color.directive';
import {WindArrowComponent} from './wind-arrow/wind-arrow.component';
import {WeatherConditionsComponent} from './weather-conditions/weather-conditions.component';
import {DirectionalArrowDirective} from './wind-arrow/directional-arrow.directive';
import {SharedModule} from '../shared/shared.module';
import {TableSettingsComponent} from './table-settings/table-settings.component';
import {CounterValidatorDirective} from './table-settings/counter-validator.directive';
import {RadioGroupComponent} from './radio-group/radio-group.component';
import {ErrorSummaryComponent} from './error-summary/error-summary.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        RegionWeatherComponent,
        TempColorDirective,
        WindArrowComponent,
        WeatherConditionsComponent,
        DirectionalArrowDirective,
        TableSettingsComponent,
        CounterValidatorDirective,
        RadioGroupComponent,
        ErrorSummaryComponent
    ],
    exports: [RegionWeatherComponent]
})
export class RegionWeatherModule {}
