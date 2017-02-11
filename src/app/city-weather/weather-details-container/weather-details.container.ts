import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Weather} from '../../core/weather';

@Component({
    selector: 'weather-details-container',
    templateUrl: 'weather-details.container.html',
    styleUrls: ['weather-details.container.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDetailsContainer implements OnInit {
    private weather: Weather;

    constructor(private route: ActivatedRoute, private router: Router, private ch: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.route.data
            .subscribe((data: {weather: Weather}) => {
                if (data.weather) {
                    this.weather = data.weather;
                    this.ch.markForCheck();
                }
            });
    }

    close() {
        this.router.navigate(['/city']);
    }
}