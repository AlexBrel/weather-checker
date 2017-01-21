import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {SpinnerComponent} from './spinner/spinner.component';
import {GeoPositionService} from './geo-position.service';
import {MainFooterComponent} from './main-footer/main-footer.component';
import {MainHeaderComponent} from './main-header/main-header.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        HttpModule
    ],
    declarations: [
        SpinnerComponent,
        MainHeaderComponent,
        MainFooterComponent
    ],
    providers: [GeoPositionService],
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
