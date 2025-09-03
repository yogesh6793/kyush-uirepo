import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numberOnly]'
})
export class NumberOnlyDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const initialValue = input.value;
    input.value = initialValue.replace(/[^0-9]*/g, '');
    if (initialValue !== input.value) {
      this.ngControl.control?.setValue(input.value);
    }
  }
}
