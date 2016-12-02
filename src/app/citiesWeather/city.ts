import Weather from "./weather"

export default class City {
    constructor(public name: string, public weather: Weather) {
    }

    getTemperatureString(): string {
        let minSymbol = (this.weather.temp_min < 0) ? "" : "+";

        if (this.weather.temp_min === this.weather.temp_max) {
            return `near ${minSymbol}${Math.floor(this.weather.temp_min)}`;
        } else {
            let maxSymbol = (this.weather.temp_max < 0) ? "" : "+";

            return `${minSymbol}${Math.floor(this.weather.temp_min)}...${maxSymbol}${Math.floor(this.weather.temp_max)}`
        }
    }
}