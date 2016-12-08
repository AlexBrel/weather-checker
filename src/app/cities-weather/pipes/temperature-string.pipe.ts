import {Pipe, PipeTransform} from "@angular/core";

import Weather from "../weather"

@Pipe({name: 'temperatureString'})
export class TemperatureStringPipe implements PipeTransform {
    transform(weather: Weather): string {
        let minSymbol = (weather.temp_min < 0) ? "" : "+";

        if (weather.temp_min === weather.temp_max) {
            return `near ${minSymbol}${weather.temp_min}`;
        } else {
            let maxSymbol = (weather.temp_max < 0) ? "" : "+";

            return `${minSymbol}${weather.temp_min}...${maxSymbol}${weather.temp_max}`
        }
    }

}