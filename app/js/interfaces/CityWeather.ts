import Weather from "./Weather";

interface CityWeather {
    name: string;
    weather: Weather;

    getTemperatureString(): string;
}

export default CityWeather;