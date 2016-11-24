import ICityWeather from "./ICityWeather"

interface IOwmProvider {
    DisplayCitiesWeather(geoPosition: Position): void;
}

export default IOwmProvider;