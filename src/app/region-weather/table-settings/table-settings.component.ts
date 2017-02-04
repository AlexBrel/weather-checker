import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';

import {temperatureUnit} from '../../shared/temperature-unit';
import {RegionSettings} from '../region-settings';

@Component({
    selector: 'table-settings',
    templateUrl: './table-settings.component.html',
    styleUrls: ['table-settings.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSettingsComponent {
    @Output() updateSettings =  new EventEmitter();
    @Input() set settings(value: RegionSettings) {
        if (value) {
            this.regionSettings = value;
        }
    };

    isExpanded: boolean = false;
    tempUnits = [temperatureUnit.Celsius, temperatureUnit.Fahrenheit, temperatureUnit.Kelvin];
    regionSettings: RegionSettings;

    submit(form: NgForm) {
        this.updateSettings.emit(form.value);
    }

    toggleSettingsOpen() {
        this.isExpanded = !this.isExpanded;
    }
}