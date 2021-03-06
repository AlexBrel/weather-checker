import {Component, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {List} from 'immutable';

@Component({
    selector: 'city-weather',
    templateUrl: 'city-weather.component.html',
    styleUrls: ['city-weather.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityWeatherComponent {
    availableCities: List<string> = List.of(
        'Minsk',
        'Zhdanovichy',
        'Baravaya',
        'Navinki',
        'Serebryanka',
        'Ratamka',
        'Vostok',
        'Machulishchy',
        'Hatava',
        'Fanipol');
    selectedCity: string;
    removedCity: string;
    favouriteCity: string;
    selectedTempUnit: string;
    @ViewChild('cityInput') cityInput: ElementRef;

    constructor() {
        let storedCity = localStorage.getItem('favouriteCity');

        if (storedCity) {
            this.selectedCity = this.favouriteCity = storedCity;
        }
    }

    selectUnit(selectedUnit: string) {
        this.selectedTempUnit = selectedUnit;
    }

    addCity() {
        let newCity = this.cityInput.nativeElement.value;

        if (this.availableCities.find(x => x === newCity)) {
            alert('City is already defined');
        } else {
            this.availableCities = this.availableCities.push(this.cityInput.nativeElement.value);
        }
    }

    removeCity() {
        let idx = this.availableCities.indexOf(this.removedCity);

        // if removed city is a favourite city -- clear the local storage
        if (this.removedCity === this.favouriteCity) {
            this.favouriteCity = null;
            delete localStorage['favouriteCity'];
        }

        // if removed city is a selected city -- clear selection and hide temperature
        if (this.removedCity === this.selectedCity) {
            this.selectedCity = null;
        }

        if (idx > -1) {
            this.availableCities = this.availableCities.delete(idx);
        }

    }

    changeFavouriteCity() {
        localStorage.setItem('favouriteCity', this.favouriteCity);
    }
}