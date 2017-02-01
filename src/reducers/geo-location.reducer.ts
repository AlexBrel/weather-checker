import {AddGeoCoordinatesAction, GeoActionTypes} from '../actions/geo-coordinates.actions';
import {InitialGeoLocationState, GeoLocationState} from '../states/geo-location.state';
import {State} from '../states/states';

export function geoLocationReducer(state = InitialGeoLocationState, action: AddGeoCoordinatesAction): GeoLocationState {
    switch (action.type) {
        case GeoActionTypes.AddCoordinates: {
            return state.set('coords', action.payload);
        }
        default: {
            return state;
        }
    }
}

export const getCoords = (state: State) => state.geoLocation.get('coords');