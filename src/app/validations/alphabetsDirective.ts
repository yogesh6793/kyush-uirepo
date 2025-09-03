import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[alphabetOnly]'
})
export class AlphabetOnlyDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const initialValue = input.value;
    input.value = initialValue.replace(/[^a-zA-Z\s]*/g, '');
    if (initialValue !== input.value) {
      this.ngControl.control?.setValue(input.value);
    }
  }
}
