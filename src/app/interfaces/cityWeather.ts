import Weather from "./weather";

interface CityWeather {
    name: string;
    weather: Weather;

    getTemperatureString(): string;
}

export default CityWeather;