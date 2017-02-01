import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {} from '../actions/action-types';
import {GeoPositionService} from '../app/core/geo-position.service';
import {AddGeoCoordinatesAction, GeoActionTypes} from '../actions/geo-coordinates.actions';

@Injectable()
export class GeoLocationEffects {
    constructor(private actions$: Actions, private geoPositionService: GeoPositionService) {
    }

    @Effect() loadGeoLocation$ = this.actions$
        .ofType(GeoActionTypes.LoadCoordinates)
        .switchMap(city => this.geoPositionService.getCoordinates()
            .map(coords => (new AddGeoCoordinatesAction(coords)))
        );
}
