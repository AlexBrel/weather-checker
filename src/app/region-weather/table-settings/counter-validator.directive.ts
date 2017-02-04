import {Directive, forwardRef, Attribute} from '@angular/core';
import {NG_VALIDATORS, FormControl, Validator} from '@angular/forms';

@Directive({
    selector: '[validateCount][ngModel],[validateCount][formControl]',
    providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => CounterValidatorDirective), multi: true}]
})
export class CounterValidatorDirective implements Validator {
    constructor(@Attribute('min') private min: string, @Attribute('max') private max: string) {
    }

    validate(control: FormControl) {
        if (control.value > this.max || control.value < this.min) {
            return {invalidCount: {actualCount: control.value, min: this.min, max: this.max}};
        }

        return null;
    }
}