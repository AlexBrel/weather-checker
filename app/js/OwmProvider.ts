import ICityWeather from "./interfaces/CityWeather"
import CommonConstants from "./CommonConstants"
import City from "./City"

export default class OwmProvider {
    displayCitiesWeather(geoPosition: Position): void {
        this.getCitiesWeather(geoPosition).then((citiesWeather: ICityWeather[]) => {
            for (let i = 0; i < citiesWeather.length; i++) {
                $("#weather-table").append(["<tr><td>",
                    (i + 1), "</td><td>",
                    citiesWeather[i].name, "</td><td>",
                    citiesWeather[i].getTemperatureString(), "</td><td>",
                    citiesWeather[i].weather.pressure, "</td></tr>"].join(''));
            }
        }).catch(error => {
            console.error(error);
        });
    }

    private getCitiesWeather(geoPosition: Position): Promise<ICityWeather[]> {
        return new Promise((resolve, reject) => {
            $.getJSON(CommonConstants.owm.url, {
                lat: geoPosition.coords.latitude,
                lon: geoPosition.coords.longitude,
                cnt: CommonConstants.owm.count,
                lang: CommonConstants.owm.lang,
                units: CommonConstants.owm.units,
                APPID: CommonConstants.owm.apiID
            }).done((weather) => {
                let citiesWeather: ICityWeather[] = [];

                for (let i = 0; i < weather.list.length; i++) {
                    citiesWeather.push(new City(weather.list[i].name, weather.list[i].main));
                }
                resolve(citiesWeather);
            }).fail(function (jqxhr, textStatus, error) {
                reject("Request Failed: " + textStatus + ", " + error);
            });
        });
    }
};
