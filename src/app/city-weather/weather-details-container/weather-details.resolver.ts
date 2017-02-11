import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Weather} from '../../core/weather';
import {OpenWeatherMapService} from '../../shared/open-weather-map.service';
import {City} from '../../core/city';

@Injectable()
export class WeatherDetailsResolver implements Resolve<Weather> {
    constructor(private router: Router, private owmService: OpenWeatherMapService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Weather> {
        return this.owmService.getCityWeatherByName(route.params['name'])
            .map((city: City) => {
                return city.main;
            })
            .first()
            .catch(err => {
                this.router.navigate(['/city']);
                throw err;
            });
    }
}