import {Component, DebugElement} from '@angular/core';
import {Weather} from '../core/weather';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {TempColorDirective} from './temp-color.directive';
import {By} from '@angular/platform-browser';

@Component({
    template: `<div id="weather-20" [tempColor]="weather"></div>`
})
class TestComponent {
    public weather: Weather = null;
}

function rgb2hex(rgbInput: string) {
    let rgb = rgbInput.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    return (rgb && rgb.length === 4) ? '#' +
        ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

describe('TempColor Directive Unit Tests', () => {
    let fixture: ComponentFixture<TestComponent>,
        de: DebugElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TempColorDirective, TestComponent]
        })
            .createComponent(TestComponent);
        fixture.detectChanges();

        de = fixture.debugElement.query(By.directive(TempColorDirective));
    });


    it('should color 8st background "#ff965f" when default', () => {
        const bgColor = de.nativeElement.style.backgroundColor;

        expect(rgb2hex(bgColor)).toBe('#ff965f');
    });

    it('should color 1st background "#4e78b5"', () => {
        fixture.componentInstance.weather = {temp: -20};
        fixture.detectChanges();

        expect(rgb2hex(de.nativeElement.style.backgroundColor)).toBe('#4e78b5');
    });

    it('should color 2st background "#5d9eda"', () => {
        fixture.componentInstance.weather = {temp: -10};
        fixture.detectChanges();

        expect(rgb2hex(de.nativeElement.style.backgroundColor)).toBe('#5d9eda');
    });

    it('should color 3st background "#8ec3f5"', () => {
        fixture.componentInstance.weather = {temp: -5};
        fixture.detectChanges();

        expect(rgb2hex(de.nativeElement.style.backgroundColor)).toBe('#8ec3f5');
    });

    it('should color 4st background "#b6d6ff"', () => {
        fixture.componentInstance.weather = {temp: 0};
        fixture.detectChanges();

        expect(rgb2hex(de.nativeElement.style.backgroundColor)).toBe('#b6d6ff');
    });

    it('should color 5st background "#dddbd4"', () => {
        fixture.componentInstance.weather = {temp: 5};
        fixture.detectChanges();

        expect(rgb2hex(de.nativeElement.style.backgroundColor)).toBe('#dddbd4');
    });

    it('should color 6st background "#ffe5cd"', () => {
        fixture.componentInstance.weather = {temp: 10};
        fixture.detectChanges();

        expect(rgb2hex(de.nativeElement.style.backgroundColor)).toBe('#ffe5cd');
    });

    it('should color 7st background "#e79e88"', () => {
        fixture.componentInstance.weather = {temp: 20};
        fixture.detectChanges();

        expect(rgb2hex(de.nativeElement.style.backgroundColor)).toBe('#e79e88');
    });
});