import CityWeather from "./interfaces/cityWeather"
import Weather from "./interfaces/weather"

export default class City implements CityWeather {
    name: string;
    weather: Weather;

    constructor(name: string, weather: Weather) {
        this.name = name;
        this.weather = weather;
    }

    getTemperatureString(): string {
        let minSymbol = (this.weather.temp_min < 0) ? "" : "+";
        if (this.weather.temp_min === this.weather.temp_max) {
            return "near " + minSymbol + Math.floor(this.weather.temp_min);
        } else {
            let maxSymbol = (this.weather.temp_max < 0) ? "" : "+";
            return [minSymbol, Math.floor(this.weather.temp_min), "...", maxSymbol, Math.floor(this.weather.temp_max)].join('');
        }
    }
}