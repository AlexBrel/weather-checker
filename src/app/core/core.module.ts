import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SpinnerComponent} from './spinner/spinner.component';
import {GeoPositionService} from './geo-position.service';
import {MainFooterComponent} from './main-footer/main-footer.component';
import {MainHeaderComponent} from './main-header/main-header.component';
import {ENV_PROVIDERS} from './environment';
import {reducer} from '../../reducers/reducers';
import {WeatherEffects} from '../../effects/weather.effects';
import {GeoLocationEffects} from '../../effects/geo-location.effects';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        HttpModule,
        StoreModule.provideStore(reducer),
        EffectsModule.run(WeatherEffects),
        EffectsModule.run(GeoLocationEffects)
    ],
    declarations: [
        SpinnerComponent,
        MainHeaderComponent,
        MainFooterComponent
    ],
    providers: [
        GeoPositionService,
        ...ENV_PROVIDERS
    ],
    exports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        SpinnerComponent,
        MainHeaderComponent,
        MainFooterComponent
    ]
})
export class CoreModule {
}
