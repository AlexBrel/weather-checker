import {Directive, ElementRef, Renderer, Input} from '@angular/core';

import {Weather} from '../common/weather';

@Directive({selector: '[tempColor]'})
export class TempColorDirective {
    @Input() set tempColor(weather: Weather) {
        this.updateColor(weather);
    }

    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    private updateColor(weather: Weather) {
        let color = this.getColorByWeather(weather);

        this.renderer.setElementStyle(this.el.nativeElement, 'background-color', color);
    }

    private getColorByWeather(weather: Weather): string {
        if (weather.temp <= -20) {
            return '#4e78b5';
        } else if (weather.temp <= -10) {
            return '#5d9eda';
        } else if (weather.temp <= -5) {
            return '#8ec3f5';
        } else if (weather.temp <= 0) {
            return '#b6d6ff';
        } else if (weather.temp <= 5) {
            return '#dddbd4';
        } else if (weather.temp <= 10) {
            return '#ffe5cd';
        } else if (weather.temp <= 20) {
            return '#e79e88';
        } else {
            return '#ff965f';
        }
    }
}