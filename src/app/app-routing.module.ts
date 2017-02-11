import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {RegionWeatherComponent} from './region-weather/region-weather.component';
import {Page404Component} from './core/error-pages/page-404.component';
import {APP_BASE_HREF} from '@angular/common';
import {YourCityComponent} from './your-city/your-city.component';
import {SelectivePreloadingStrategy} from './selective-preloading.strategy';

const routes: Routes = [{
    path: 'region',
    component: RegionWeatherComponent
}, {
    path: 'map',
    loadChildren: './map/map.module#MapModule',
    data: { preload: true }
}, {
    path: '',
    redirectTo: '/region',
    pathMatch: 'full'
}, {
    path: 'your-city',
    component: YourCityComponent,
    outlet: 'widget'
}, {
    path: '**',
    component: Page404Component
}];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: SelectivePreloadingStrategy})
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        SelectivePreloadingStrategy
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}