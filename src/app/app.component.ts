import {Component, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import CommonConstants from './commonConstants';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
    geoPosition: Position;
    isWeatherTableReady: boolean = false;

    ngOnInit(): void {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(position => {
                this.geoPosition = position;
            })
        } else {
            console.log("Geoposition is not defined");
        }
    }

    weatherTableReady(err?: string) {
        if(err) {
            console.error(err);
        } else {
            this.isWeatherTableReady = true;
        }
    }
}