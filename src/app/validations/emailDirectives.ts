import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[emailValidator]'
})
export class EmailValidatorDirective {

  private emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const initialValue = input.value;
    if (!this.emailPattern.test(initialValue)) {
      input.setCustomValidity("Invalid email address");
    } else {
      input.setCustomValidity("");
    }
    this.ngControl.control?.updateValueAndValidity();
  }
}
