import {Component, ChangeDetectionStrategy, ViewChild, ElementRef, OnInit} from '@angular/core';
import {List} from 'immutable';
import {Store} from '@ngrx/store';
import {State} from '../../states/states';
import {CitiesState} from '../../states/cities.state';
import {AddCityAction, RemoveCityAction} from '../../actions/cities.actions';
import {Router} from '@angular/router';

@Component({
    selector: 'city-weather',
    templateUrl: 'city-weather.component.html',
    styleUrls: ['city-weather.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityWeatherComponent implements OnInit {
    private availableCities: List<string>;
    private selectedCity: string;
    private removedCity: string;
    private favouriteCity: string;
        @ViewChild('cityInput') cityInput: ElementRef;

    constructor(private store: Store<State>, private router: Router) {
    }

    ngOnInit() {
        let storedCity = localStorage.getItem('favouriteCity');

        if (storedCity) {
            this.selectedCity = this.favouriteCity = storedCity;
        }

        this.store.select((state: State) => state.cities)
            .subscribe((citiesState: CitiesState) => {
                this.availableCities = citiesState.get('cities') as List<string>;
            });
    }

    addCity() {
        let newCity = this.cityInput.nativeElement.value;

        this.store.dispatch(new AddCityAction(newCity));
    }

    removeCity() {
        // if removed city is a favourite city -- clear the local storage
        if (this.removedCity === this.favouriteCity) {
            this.favouriteCity = null;
            delete localStorage['favouriteCity'];
        }

        // if removed city is a selected city -- clear selection and hide temperature
        if (this.removedCity === this.selectedCity) {
            this.selectedCity = null;
        }

        this.store.dispatch(new RemoveCityAction(this.removedCity));
    }

    changeFavouriteCity() {
        localStorage.setItem('favouriteCity', this.favouriteCity);
    }

    selectCity(cityName: string) {
        this.router.navigate(['/city', cityName]);
    }
}