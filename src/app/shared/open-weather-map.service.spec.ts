import {TestBed, inject, tick, fakeAsync} from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    BaseRequestOptions
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Map, List} from 'immutable';
import {OpenWeatherMapService} from './open-weather-map.service';
import {LoggerService} from '../core/logger/logger.service';
import {City} from '../core/city';

describe('OpenWeatherMap Service Unit Tests', () => {
    const mockCityResponse = {
            name: 'Minsk',
            main: {
                temp: 284.3,
                pressure: 1024,
                humidity: 87,
                temp_min: 0.15,
                temp_max: 3.26
            },
            wind: {
                speed: 2.1,
                deg: 200
            },
            weather: [{
                id: 701,
                main: 'Mist',
                description: 'mist',
                icon: '50n'
            }]
        },
        mockErrorResponse = new Error('test error!'),
        testCoords = Map({lat: 1, long: 2});

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                OpenWeatherMapService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => new Http(backend, defaultOptions),
                    deps: [MockBackend, BaseRequestOptions]
                },
                {provide: LoggerService, useValue: jasmine.createSpyObj('LoggerService', ['log', 'error'])}
            ]
        });
    });

    describe('getCityWeatherByName method', () => {
        it('should return an Observable<City>', fakeAsync(
            inject([OpenWeatherMapService, MockBackend], (owmService: OpenWeatherMapService, mockBackend: MockBackend) => {
                let city: City;

                mockBackend.connections.subscribe((connection: MockConnection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockCityResponse)
                    })));
                });

                owmService.getCityWeatherByName('testName').subscribe((testCity: City) => city = testCity);
                tick();

                expect(city).toEqual(mockCityResponse);
            })));

        it('should return an Error', fakeAsync(inject([OpenWeatherMapService, MockBackend, LoggerService],
            (owmService: OpenWeatherMapService, mockBackend: MockBackend, logger: LoggerService) => {
                let error: Error;

                mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(mockErrorResponse));

                owmService.getCityWeatherByName('testName').subscribe(res => res, testError => error = testError);
                tick();

                expect(logger.error).toHaveBeenCalledWith(error);
                expect(error).toEqual(mockErrorResponse);
            })));
    });

    describe('getCityWeatherByCoords method', () => {
        it('should return an Observable<City>', fakeAsync(
            inject([OpenWeatherMapService, MockBackend], (owmService: OpenWeatherMapService, mockBackend: MockBackend) => {
                let city: City;

                mockBackend.connections.subscribe((connection: MockConnection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockCityResponse)
                    })));
                });

                owmService.getCityWeatherByCoords(testCoords).subscribe((testCity: City) => city = testCity);
                tick();

                expect(city).toEqual(mockCityResponse);
            })));

        it('should return an Error', fakeAsync(inject([OpenWeatherMapService, MockBackend, LoggerService],
            (owmService: OpenWeatherMapService, mockBackend: MockBackend, logger: LoggerService) => {
                let error: Error;

                mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(mockErrorResponse));

                owmService.getCityWeatherByCoords(testCoords).subscribe(res => res, testError => error = testError);
                tick();

                expect(logger.error).toHaveBeenCalledWith(error);
                expect(error).toEqual(mockErrorResponse);
            })));
    });

    describe('getRegionWeather method', () => {
        let region: List<City>;

        it('should return an Observable<List<City>>', fakeAsync(
            inject([OpenWeatherMapService, MockBackend], (owmService: OpenWeatherMapService, mockBackend: MockBackend) => {
                const mockRegionResponse = [{
                    name: 'Minsk',
                    main: {
                        temp: 284.3,
                        pressure: 1024,
                        humidity: 87,
                        temp_min: 0.15,
                        temp_max: 3.26
                    },
                    wind: {
                        speed: 2.1,
                        deg: 200
                    },
                    weather: [{
                        id: 701,
                        main: 'Mist',
                        description: 'mist',
                        icon: '50n'
                    }]
                }, {
                    name: 'Gomel',
                    main: {
                        temp: 184.3,
                        pressure: 11024,
                        humidity: 187,
                        temp_min: 10.15,
                        temp_max: 13.26
                    },
                    wind: {
                        speed: 12.1,
                        deg: 1200
                    },
                    weather: [{
                        id: 1701,
                        main: 'Mist',
                        description: 'mist',
                        icon: '50n'
                    }]
                }];

                mockBackend.connections.subscribe((connection: MockConnection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify({list: mockRegionResponse})
                    })));
                });

                owmService.getRegionWeather(testCoords, 10).subscribe((testRegion: List<City>) => region = testRegion);
                tick();

                expect(region.size).toEqual(mockRegionResponse.length);
                expect(region.first().name).toEqual(mockRegionResponse[0].name);
                expect(region.last().name).toEqual(mockRegionResponse[1].name);
            })));

        it('should return a mocked data', fakeAsync(inject([OpenWeatherMapService, MockBackend, LoggerService],
            (owmService: OpenWeatherMapService, mockBackend: MockBackend, logger: LoggerService) => {
                mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(mockErrorResponse));

                owmService.getRegionWeather(testCoords, 10).subscribe(res => region = res);
                tick();

                expect(logger.error).toHaveBeenCalledWith(mockErrorResponse);
                expect(region.size > 0).toBeTruthy();
            })));
    });
});