import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import {WeatherConditions} from '../../core/weather-conditions';

@Component({
    selector: 'weather-conditions',
    templateUrl: 'weather-conditions.component.html',
    styleUrls: ['weather-conditions.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherConditionsComponent {
    @Input() conditions: WeatherConditions;
}