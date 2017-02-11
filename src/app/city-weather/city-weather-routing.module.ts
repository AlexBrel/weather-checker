import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WeatherDetailsContainer} from './weather-details-container/weather-details.container';
import {CityWeatherComponent} from './city-weather.component';
import {WeatherDetailsResolver} from './weather-details-container/weather-details.resolver';

const routes: Routes = [{
    path: 'city',
    component: CityWeatherComponent,
    children: [
        {
            path: ':name',
            component: WeatherDetailsContainer,
            resolve: {
                weather: WeatherDetailsResolver
            }
        }
    ]
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    providers: [
        WeatherDetailsResolver
    ],
    exports: [
        RouterModule
    ]
})
export class CityWeatherRoutingModule {
}