import {Component, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

import {ErrorTypes, InvalidLengthType, InvalidCountType} from './error-types';

@Component({
    selector: 'error-summary',
    templateUrl: './error-summary.component.html',
    styleUrls: ['error-summary.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorSummaryComponent implements OnDestroy {
    private errorMessages: String[];
    private formToValidate: NgForm;
    private formChangedSubscription: Subscription;

    @Input() set form(value: NgForm) {
        this.formToValidate = value;
        this.summarizeErrors();
        this.formChangedSubscription = this.formToValidate.valueChanges.subscribe(() => this.summarizeErrors());
    };

    constructor(private cd: ChangeDetectorRef) {
    }

    summarizeErrors() {
        let errors: String[] = [];

        for (let key in this.formToValidate.controls) {
            if (this.formToValidate.controls[key].invalid) {
                let control = this.formToValidate.controls[key];

                for (let errorKey in control.errors) {
                    errors.push(this.getErrorMessage(control.value, key, errorKey, control.errors[errorKey]));
                }
            }
        }
        this.errorMessages = errors;
        this.cd.markForCheck();
    }

    private getErrorMessage(controlValue: Object, controlKey: string, errorKey: string, errorObject: ErrorTypes) {
        switch (errorKey) {
            case 'required':
                return `${controlKey.toUpperCase()} is required`;
            case 'minlength':
                return `The length of '${controlValue}' value should be more than ${(errorObject as InvalidLengthType).requiredLength} symbols`;
            case 'maxlength':
                return `The length of${controlValue}' value should be less than ${(errorObject as InvalidLengthType).requiredLength} symbols`;
            case 'invalidCount':
                let err = errorObject as InvalidCountType;

                return `The count should be in range from ${err.min} to ${err.max}, but the actual value is ${err.actualCount}`;
            default:
                return `invalid`;
        }
    }

    ngOnDestroy(): void {
        this.formChangedSubscription.unsubscribe();
    }
}
