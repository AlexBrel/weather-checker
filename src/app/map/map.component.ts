import {Component, Input, OnChanges} from "@angular/core";

import commonConstants from "../commonConstants";

@Component({
    selector: "map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.css"]

})
export class MapComponent implements OnChanges {
    @Input() lat: number;
    @Input() long: number;

    private map: google.maps.Map;
    private marker: google.maps.Marker;

    ngOnChanges() {
        if (this.lat && this.long) {
            this.showMap();
        }
    }

    private showMap() {
        let myLatLng = {
            lat: this.lat,
            lng: this.long
        };

        // Create a map object and specify the DOM element for display.
        this.map = new google.maps.Map($(".map")[0], {
            center: myLatLng,
            scrollwheel: commonConstants.googleApi.scrollwheel,
            zoom: commonConstants.googleApi.zoom
        });

        // Create a marker and set its position.
        this.marker = new google.maps.Marker({
            map: this.map,
            position: myLatLng
        });
    }
}