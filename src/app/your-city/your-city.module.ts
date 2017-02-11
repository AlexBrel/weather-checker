import {NgModule} from '@angular/core';
import {YourCityComponent} from './your-city.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [
        YourCityComponent
    ],
    exports: [YourCityComponent]
})
export class YourCityModule {
}
