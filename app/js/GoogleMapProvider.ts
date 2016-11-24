import CommonConstants from "./CommonConstants"

export default class GoogleMapProvider {
    private map: google.maps.Map;
    private marker: google.maps.Marker;

    DisplayMap(geoPosition: Position): void {
        let myLatLng = {
            lat: geoPosition.coords.latitude,
            lng: geoPosition.coords.longitude
        };

        // Create a map object and specify the DOM element for display.
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            scrollwheel: CommonConstants.googleApi.scrollwheel,
            zoom: CommonConstants.googleApi.zoom
        });

        // Create a marker and set its position.
        this.marker = new google.maps.Marker({
            map: this.map,
            position: myLatLng
        });
    }
};