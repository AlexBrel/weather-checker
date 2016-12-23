import {Directive, ElementRef, Renderer, Input} from '@angular/core';

import Weather from '../common/weather';

@Directive({ selector: '[tempColor]' })
// Directive class
export default class TempColorDirective {
    @Input() set tempColor(weather: Weather) {
        this.updateColor(weather);
    }

    constructor(private el: ElementRef, private renderer: Renderer) {
        // renderer.setElementStyle(el.nativeElement, 'display', 'none');
    }

    updateColor(weather: Weather) {
        this.renderer.setElementStyle(this.el.nativeElement, 'background-color', 'blue');
    }
}