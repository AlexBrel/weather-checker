import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {AppComponent} from "./app.component";
import {MainHeaderComponent} from "./main-header/main-header.component";
import {MainFooterComponent} from "./main-footer/main-footer.component";
import {SpinnerComponent} from "./spinner/spinner.component";
import {CitiesWeatherComponent} from "./cities-weather/cities-weather.component";
import {MapComponent} from "./map/map.component";
import {TemperatureStringPipe} from "./cities-weather/pipes/temperature-string.pipe";
import {ConvertTemperaturePipe} from "./cities-weather/pipes/convert-temperature.pipe";
import {FloorTemperaturePipe} from "./cities-weather/pipes/floor-temperature.pipe";

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule],
    declarations: [AppComponent,
        MainHeaderComponent,
        MainFooterComponent,
        SpinnerComponent,
        CitiesWeatherComponent,
        MapComponent,
        TemperatureStringPipe,
        ConvertTemperaturePipe,
        FloorTemperaturePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
