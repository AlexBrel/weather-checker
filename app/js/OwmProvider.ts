import IOwmProvider from "./interfaces/IOwmProvider"
import ICityWeather from "./interfaces/ICityWeather"
import CommonConstants from "./CommonConstants"

export default class OwmProvider implements IOwmProvider {
    DisplayCitiesWeather(geoPosition: Position): void {
        this.GetCitiesWeather(geoPosition).then(citiesWeather => {
            citiesWeather.forEach((city) => {
                console.log(city.name, city.main);
            });
        }).catch(error => {
            console.log(error);
        });
    }

    private GetCitiesWeather(geoPosition: Position): Promise<ICityWeather[]> {
        return new Promise((resolve, reject) => {
            $.getJSON(CommonConstants.owm.url, {
                lat: geoPosition.coords.latitude,
                lon: geoPosition.coords.longitude,
                cnt: CommonConstants.owm.count,
                lang: CommonConstants.owm.lang,
                units: CommonConstants.owm.units,
                APPID: CommonConstants.owm.apiID
            }).done((weather) => {
                resolve(weather.list);
            }).fail(function( jqxhr, textStatus, error ) {
                reject("Request Failed: " + textStatus + ", " + error);
            });
        });
    }
};
