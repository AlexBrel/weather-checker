import {Component, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {List} from 'immutable';
import {Store} from '@ngrx/store';
import {State} from '../../states/states';
import {CitiesState} from '../../states/cities.state';
import {AddCityAction, RemoveCityAction, RemoveCachedCityAction} from '../../actions/cities.actions';
import {Router} from '@angular/router';

@Component({
    selector: 'city-weather',
    templateUrl: 'city-weather.component.html',
    styleUrls: ['city-weather.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityWeatherComponent {
    private availableCities: List<string>;
    private selectedCity: string;
    private removedCity: string;
    private favouriteCity: string;
    private selectedTempUnit: string;
    @ViewChild('cityInput') cityInput: ElementRef;

    constructor(private store: Store<State>, private router: Router) {
        let storedCity = localStorage.getItem('favouriteCity');

        if (storedCity) {
            this.selectedCity = this.favouriteCity = storedCity;
        }

        store.select((state: State) => state.cities)
            .subscribe((citiesState: CitiesState) => {
                this.availableCities = citiesState.get('cities') as List<string>;
            });
    }

    selectUnit(selectedUnit: string) {
        this.selectedTempUnit = selectedUnit;
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
        this.store.dispatch(new RemoveCachedCityAction(this.removedCity));
    }

    changeFavouriteCity() {
        localStorage.setItem('favouriteCity', this.favouriteCity);
    }

    selectCity(cityName: string) {
        this.router.navigate(['/city', cityName]);
    }
}