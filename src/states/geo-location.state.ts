import {Map} from 'immutable';

export type GeoLocationState = Map<string, Map<string, number>>;

export const InitialGeoLocationState: GeoLocationState = Map({
    coords: null
});
