import {Observable, Observer} from 'rxjs';
import {Injectable} from '@angular/core';
import {Map, fromJS} from 'immutable';

@Injectable()
export class GeoPositionService {
    public getCoordinates(): Observable<Map<string, number>> {
        return Observable.create((observer: Observer<Map<string, number>>) => {
            if (window.navigator && window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition((position: Position) => {
                    observer.next(fromJS({lat: position.coords.latitude, long: position.coords.longitude}));
                });
            } else {
                observer.error('Geoposition is not defined');
            }
        });
    }
}