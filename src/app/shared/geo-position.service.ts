import Immutable = require('immutable');
import {Observable, Observer} from 'rxjs';

export default class GeoPositionService {
    public getCoordinates(): Observable<Immutable.Map<string, number>> {
        return Observable.create((observer: Observer<Immutable.Map<string, number>>) => {
            if (window.navigator && window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition((position: Position) => {
                    observer.next(Immutable.fromJS({lat: position.coords.latitude, long: position.coords.longitude}));
                });
            } else {
                observer.error('Geoposition is not defined');
            }
        });
    }
}