import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'main-header',
    templateUrl: 'main-header.component.html',
    styleUrls: ['main-header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHeaderComponent {}