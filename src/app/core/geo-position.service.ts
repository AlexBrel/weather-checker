import {Observable, Observer} from 'rxjs';
import {Injectable} from '@angular/core';
import {Map, fromJS} from 'immutable';
import {LoggerService} from './logger.service';

@Injectable()
export class GeoPositionService {
    constructor(private logger: LoggerService) {}

    public getCoordinates(): Observable<Map<string, number>> {
        return Observable.create((observer: Observer<Map<string, number>>) => {
            if (window.navigator && window.navigator.geolocation) {
                this.logger.log('geo coordinates were found');
                window.navigator.geolocation.getCurrentPosition((position: Position) => {
                    observer.next(fromJS({lat: position.coords.latitude, long: position.coords.longitude}));
                });
            } else {
                let err = new Error('Geoposition is not defined');
                this.logger.error(err);
                observer.error(err);
            }
        });
    }
}