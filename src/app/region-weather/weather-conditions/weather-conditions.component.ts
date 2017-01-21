import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import WeatherConditions from '../../common/weather-conditions';

@Component({
    selector: 'weather-conditions',
    templateUrl: 'weather-conditions.component.html',
    styleUrls: ['weather-conditions.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class WeatherConditionsComponent {
    @Input() conditions: WeatherConditions;
}