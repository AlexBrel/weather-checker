import IOwmProvider from "./interfaces/IOwmProvider"
import ICityWeather from "./interfaces/ICityWeather"
import CommonConstants from "./CommonConstants"
import CityWeather from "./CityWeather"

export default class OwmProvider implements IOwmProvider {
    DisplayCitiesWeather(geoPosition: Position): void {
        this.GetCitiesWeather(geoPosition).then((citiesWeather: ICityWeather[]) => {
            for (let i = 0; i < citiesWeather.length; i++) {
                $("#weather-table").append(["<tr><td>",
                    (i + 1), "</td><td>",
                    citiesWeather[i].Name, "</td><td>",
                    citiesWeather[i].GetTemperatureString(), "</td><td>",
                    citiesWeather[i].Weather.pressure, "</td></tr>"].join(''));
            }
        }).catch(error => {
            console.error(error);
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
                let citiesWeather: CityWeather[] = [];

                for (let i = 0; i < weather.list.length; i++) {
                    citiesWeather.push(new CityWeather(weather.list[i].name, weather.list[i].main));
                }
                resolve(citiesWeather);
            }).fail(function (jqxhr, textStatus, error) {
                reject("Request Failed: " + textStatus + ", " + error);
            });
        });
    }
};
