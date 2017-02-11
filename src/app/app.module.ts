import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {CityWeatherModule} from './city-weather/city-weather.module';
import {RegionWeatherModule} from './region-weather/region-weather.module';
import {AppRoutingModule} from './app-routing.module';
import {YourCityModule} from './your-city/your-city.module';

@NgModule({
    imports: [
        CoreModule,
        CityWeatherModule,
        RegionWeatherModule,
        YourCityModule,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
