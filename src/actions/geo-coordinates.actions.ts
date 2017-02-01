import {Action} from '@ngrx/store';
import {Map} from 'immutable';

export const GeoActionTypes = {
    AddCoordinates: '[GeoLocation] AddCoordinates',
    LoadCoordinates: '[GeoLocation] LoadCoordinates'
};

export class AddGeoCoordinatesAction implements Action {
    type = GeoActionTypes.AddCoordinates;

    constructor(public payload: Map<string, number>) {
    }
}

export class LoadGeoCoordinatesAction implements Action {
    type = GeoActionTypes.LoadCoordinates;
}
