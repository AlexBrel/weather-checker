import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TemperatureUnitSelectorComponent} from './temp-unit-selector/temp-unit-selector.component';
import GeoPositionService from './geo-position.service';


@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [
        TemperatureUnitSelectorComponent
    ],
    providers: [GeoPositionService],
    exports: [CommonModule, FormsModule, TemperatureUnitSelectorComponent]
})
export class SharedModule {
}
