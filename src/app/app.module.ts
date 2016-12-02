import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {AppComponent} from "./app.component";
import {MainHeaderComponent} from "./mainHeader/mainHeader.component";
import {MainFooterComponent} from "./mainFooter/mainFooter.component";
import {SpinnerComponent} from "./spinner/spinner.component";
import {CitiesWeatherComponent} from "./citiesWeather/citiesWeather.component";
import {MapComponent} from "./map/map.component";

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule],
    declarations: [AppComponent, MainHeaderComponent, MainFooterComponent, SpinnerComponent, CitiesWeatherComponent, MapComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
