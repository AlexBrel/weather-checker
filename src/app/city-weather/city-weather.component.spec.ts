import {TestBed, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {CityWeatherComponent} from './city-weather.component';
import {CitiesState} from '../../states/cities.state';
import {List, Map} from 'immutable';
import {City} from '../core/city';
import {CitiesActions, CityActionTypes} from '../../actions/cities.actions';

describe('CityWeather Component Unit Tests', () => {
    let fixture: ComponentFixture<CityWeatherComponent>,
        component: CityWeatherComponent,
        testCitiesState: CitiesState,
        testStorage: Object,
        mockLocalStorage = () => {
            testStorage = {};

            spyOn(localStorage, 'getItem').and.returnValue('Minsk');
            spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
                    testStorage[key] = value;
                }
            );
        };

    beforeEach(fakeAsync(() => {
        testCitiesState = Map({
            cities: List.of(
                'Minsk',
                'Zhdanovichy'),
            cityWeather: null,
            yourCityWeather: null,
            cachedCities: List<City>()
        });

        TestBed.configureTestingModule({
            declarations: [CityWeatherComponent],
            providers: [{
                provide: Store,
                useClass: class {
                    dispatch = jasmine.createSpy('dispatch');
                    select = jasmine.createSpy('select').and.returnValue(Observable.of(testCitiesState));
                }
            }, {
                provide: Router,
                useClass: class {
                    navigate = jasmine.createSpy('navigate');
                }
            }
            ],
            imports: [BrowserModule, FormsModule, RouterTestingModule]
        });

        fixture = TestBed.createComponent(CityWeatherComponent);
        component = fixture.componentInstance;

        mockLocalStorage();

        component.ngOnInit();
        tick();
        fixture.detectChanges();
    }));


    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

    it('should subscribe on store and display cities after init', () => {
        let store = fixture.debugElement.injector.get(Store),
            de;

        de = fixture.debugElement.queryAll(By.css('.city-item'));

        expect(store.select).toHaveBeenCalled();
        expect(de.length).toBe(2);
        expect(de[0].nativeElement.textContent).toContain('Minsk');
        expect(de[1].nativeElement.textContent).toContain('Zhdanovichy');
        expect(localStorage.getItem).toHaveBeenCalledWith('favouriteCity');
    });

    it('should add new city', () => {
        let testCity = 'testCity',
            store = fixture.debugElement.injector.get(Store);

        component.cityInput.nativeElement.value = testCity;
        component.addCity();

        expect(store.dispatch).toHaveBeenCalled();
        expect((store.dispatch.calls.argsFor(0)[0] as CitiesActions).type).toBe(CityActionTypes.Add);
        expect((store.dispatch.calls.argsFor(0)[0] as CitiesActions).payload).toBe(testCity);
    });

    it('should remove city', () => {
        let store = fixture.debugElement.injector.get(Store),
            de = fixture.debugElement.query(By.css('.operation-wrapper > select'));

        testStorage['favouriteCity'] = 'testCity';
        de.nativeElement.selectedIndex = 0;
        de.nativeElement.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        component.removeCity();

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch.calls.count()).toBe(1);
        expect((store.dispatch.calls.argsFor(0)[0] as CitiesActions).type).toBe(CityActionTypes.Remove);
        expect((store.dispatch.calls.argsFor(0)[0] as CitiesActions).payload).toBe('Minsk');
        expect(localStorage['favouriteCity']).not.toBeDefined();
    });

    it('should change favourite city', () => {
        let testCity = 'testCity',
            de = fixture.debugElement.queryAll(By.css('.operation-wrapper > select'))[1];

        de.nativeElement.selectedIndex = 0;
        de.nativeElement.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        component.changeFavouriteCity();

        expect(localStorage.setItem).toHaveBeenCalledWith('favouriteCity', 'Minsk');
    });

    it('should select city', () => {
        let testCity = 'testCity',
            router = fixture.debugElement.injector.get(Router);

        component.selectCity(testCity);

        expect(router.navigate).toHaveBeenCalledWith(['/city', testCity]);
    });
});