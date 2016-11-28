import PromisedGeolocation from "./PromisedGeolocation"
import OwmProvider from "./OwmProvider";
import GoogleMapProvider from "./GoogleMapProvider";

$(() => {
    let owmProvider = new OwmProvider(),
        googleMapProvider = new GoogleMapProvider();

    PromisedGeolocation.getPosition().then(position => {
        googleMapProvider.displayMap(position);
        owmProvider.displayCitiesWeather(position).then(()=>{
            $(".spinner").addClass("closed");
            $(".table-responsive").removeClass("closed");
        });
    }).catch(error => {
        console.error(error);
    });
});


