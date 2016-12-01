import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {CommonModule} from '@angular/common';

import {AppComponent}   from './app.component';
import {MainHeaderComponent}   from './mainHeader/mainHeader.component';
import {SpinnerComponent}   from './spinner/spinner.component';
import {WeatherTableComponent}   from './weatherTable/weatherTable.component';
import {MapComponent}   from './map/map.component';

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule],
    declarations: [AppComponent, MainHeaderComponent, SpinnerComponent, WeatherTableComponent, MapComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
