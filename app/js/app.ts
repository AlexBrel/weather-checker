import PromisedGeolocation from "./PromisedGeolocation"
import OwmProvider from "./OwmProvider";
import GoogleMapProvider from "./GoogleMapProvider";

$(() => {
    let owmProvider = new OwmProvider(),
        googleMapProvider = new GoogleMapProvider();

    PromisedGeolocation.GetPosition().then(position => {
        owmProvider.DisplayCitiesWeather(position);
        googleMapProvider.DisplayMap(position);
    }).catch(error => {
        console.error(error);
    });
});


