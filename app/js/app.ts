import PromisedGeolocation from "./PromisedGeolocation"
import OwmProvider from "./OwmProvider";
import GoogleMapProvider from "./GoogleMapProvider";

$(() => {
    let owmProvider = new OwmProvider(),
        googleMapProvider = new GoogleMapProvider();

    PromisedGeolocation.getPosition().then(position => {
        owmProvider.displayCitiesWeather(position);
        googleMapProvider.displayMap(position);
    }).catch(error => {
        console.error(error);
    });
});


