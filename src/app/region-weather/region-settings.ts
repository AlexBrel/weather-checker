import {temperatureUnit} from '../shared/temperature-unit';

export interface RegionSettings {
    citiesCount: number;
    sectionName: string;
    temperatureUnit: string;
}

export const InitialRegionSettings: RegionSettings = {
    citiesCount: 50,
    sectionName: 'Weather in your region',
    temperatureUnit: temperatureUnit.Celsius
};