import {TemperatureStringPipe} from './temperature-string.pipe';

describe('TemperatureString Pipe Unit Tests', () => {
    let tempStringPipe: TemperatureStringPipe;

    beforeAll(() => tempStringPipe = new TemperatureStringPipe());

    describe('when min and max temperatures are equal', () => {
        it('should return approximate temperature above zero', () => {
            let weather = {temp_min: 1, temp_max: 1};

            expect(tempStringPipe.transform(weather)).toEqual('near +1');
        });

        it('should return approximate temperature below zero', () => {
            let weather = {temp_min: -1, temp_max: -1};

            expect(tempStringPipe.transform(weather)).toEqual('near -1');
        });
    });

    describe('when min and max temperatures are different', () => {
        it('should return temperature range from min to max with different symbols', () => {
            let weather = {temp_min: -10, temp_max: 10};

            expect(tempStringPipe.transform(weather)).toEqual('-10...+10');
        });
        it('should return temperature range from min to max with the same symbols', () => {
            let weather = {temp_min: 10, temp_max: 20};

            expect(tempStringPipe.transform(weather)).toEqual('+10...+20');
        });
    });

    it('should return null when weather is not defined', () => {
        expect(tempStringPipe.transform(null)).toBeNull();
    });
});