import {NgModule} from '@angular/core';
import {MapComponent} from './map.component';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [{
    path: '',
    component: MapComponent
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        MapComponent
    ],
    exports: [RouterModule, MapComponent]
})
export class MapModule {
}
