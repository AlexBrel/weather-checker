import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]

})
export class AppComponent implements OnInit {
    geoPosition: Position;
    isWeatherTableReady: boolean = false;

    ngOnInit(): void {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition((position: Position) => {
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