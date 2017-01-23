import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {CityWeatherModule} from './city-weather/city-weather.module';
import {MapModule} from './map/map.module';
import {RegionWeatherModule} from './region-weather/region-weather.module';

@NgModule({
    imports: [
        CoreModule,
        CityWeatherModule,
        MapModule,
        RegionWeatherModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
