import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Wind} from '../../common/wind';

@Component({
    selector: 'wind-arrow',
    templateUrl: 'wind-arrow.component.html',
    styleUrls: ['wind-arrow.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class WindArrowComponent {
    windSpeed: number;
    angle: number;

    @Input() set wind(value: Wind) {
        this.windSpeed = value.speed;
        this.angle = value.deg;
    }
}