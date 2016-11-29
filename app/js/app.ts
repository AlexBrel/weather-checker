import PromisedGeolocation from "./promisedGeolocation"
import OwmProvider from "./owmProvider";
import GoogleMapProvider from "./googleMapProvider";

$(() => {
    let owmProvider = new OwmProvider(),
        googleMapProvider = new GoogleMapProvider();

    PromisedGeolocation.getPosition().then(position => {
        googleMapProvider.displayMap(position);
        owmProvider.displayCitiesWeather(position).then(()=>{
            $(".spinner-wrapper").addClass("closed");
            $(".table-responsive").removeClass("closed");
        });
    }).catch(error => {
        console.error(error);
    });
});


