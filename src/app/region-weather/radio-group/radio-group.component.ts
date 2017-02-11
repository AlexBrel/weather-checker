import {Component, Input, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

const CUSTOM_RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent),
    multi: true
};

@Component({
    selector: 'radio-group',
    templateUrl: './radio-group.component.html',
    providers: [CUSTOM_RADIO_VALUE_ACCESSOR]
})
export class RadioGroupComponent implements ControlValueAccessor {
    @Input() items: string[];
    @Input() nameOption: string;

    private selectedValue: string;

    setValue(value: string) {
        this.value = value;
        this.onChange(value);
    }

    set value(newItem: string) {
        if (newItem) {
            this.selectedValue = newItem;
        }
    }

    get value() {
        return this.selectedValue;
    }

    onChange = (value: string) => {};

    registerOnChange(onChangeFunction: (value: string) => {}) {
        this.onChange = onChangeFunction;
    }

    registerOnTouched() {
    }

    writeValue(value: string) {
        if (value !== this.selectedValue) {
            this.selectedValue = value;
        }
    }

    setDisabledState(isDisabled: boolean) {
    }
}
