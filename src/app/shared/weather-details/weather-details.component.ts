import {Component, Input} from '@angular/core';

import {Weather} from '../../core/weather';

@Component({
    selector: 'weather-details',
    templateUrl: 'weather-details.component.html',
    styleUrls: ['weather-details.component.css']
})
export class WeatherDetailsComponent {
    @Input() weather: Weather;
    @Input() cityName: string;
}