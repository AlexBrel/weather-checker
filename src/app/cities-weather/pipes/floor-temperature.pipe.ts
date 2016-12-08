import {Pipe, PipeTransform} from "@angular/core";

import Weather from "../weather"

@Pipe({name: 'floorTemperature'})
export class FloorTemperaturePipe implements PipeTransform {
    transform(weather: Weather): Weather {
        return {
            temp_min: Math.floor(weather.temp_min),
            temp_max: Math.floor(weather.temp_max),
            temp: Math.floor(weather.temp),
            pressure: weather.pressure
        };
    }

}