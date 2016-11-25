import IWeather from "./IWeather";

interface ICityWeather {
    Name: string;
    Weather: IWeather;

    GetTemperatureString(): string;
}

export default ICityWeather;