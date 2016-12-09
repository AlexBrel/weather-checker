import {Pipe, PipeTransform} from "@angular/core";

import commonConstants from "../common/common-constants";
import City from "../common/city";
import mockCityWeatherResponse from "./mock-city-weather-response";
import Weather from "../common/weather";

@Pipe({name: 'weatherRequest', pure: true})
export class WeatherRequestPipe implements PipeTransform {
    cachedCitiesWeather: City[] = [];

    transform(cityName: string): Promise<Weather> {
        let foundCachedCity = this.cachedCitiesWeather.find(city => {
            return city.name === cityName
        });

        return new Promise((resolve, reject) => {
            if (foundCachedCity) {
                resolve(foundCachedCity.main);
            } else {
                this.getCityWeather(cityName).then(newCity => {
                    this.cachedCitiesWeather.push(newCity);
                    resolve(newCity.main);
                }).catch(error => {
                    reject(error);
                })
            }
        });
    }

    private getCityWeather(cityName: string): Promise<City> {
        return new Promise(resolve => {
            $.getJSON(commonConstants.owm.cityUrl, {
                q: cityName,
                lang: commonConstants.owm.lang,
                units: commonConstants.owm.units,
                APPID: commonConstants.owm.apiID
            }).done(city => {
                resolve(city);
            }).fail((jqxhr, textStatus, error) => {
                console.log("Request Failed: " + textStatus + ", " + error);
                resolve({name: cityName, main: mockCityWeatherResponse.main});
            });
        });
    }
}