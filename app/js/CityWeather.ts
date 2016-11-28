import ICityWeather from "./interfaces/ICityWeather"
import IWeather from "./interfaces/IWeather"

export default class CityWeather implements ICityWeather {
    Name: string;
    Weather: IWeather;

    constructor(name: string, weather: IWeather) {
        this.Name = name;
        this.Weather = weather;
    }

    GetTemperatureString(): string {
        let minSymbol = (this.Weather.temp_min < 0) ? "" : "+";
        if (this.Weather.temp_min === this.Weather.temp_max) {
            return "near " + minSymbol + Math.floor(this.Weather.temp_min);
        } else {
            let maxSymbol = (this.Weather.temp_max < 0) ? "" : "+";
            return [minSymbol, Math.floor(this.Weather.temp_min), "...", maxSymbol, Math.floor(this.Weather.temp_max)].join('');
        }
    }
}