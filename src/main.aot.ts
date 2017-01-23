import 'zone.js/dist/zone';
import 'reflect-metadata';
import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from '../build/src/app/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);