import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css']
})
export class UserSelectorComponent implements OnInit {
  @Input() user: any = null;
  @Input() roleList: any = null;
  @Output() formClosed = new EventEmitter<void>();
  @Output() userSaved = new EventEmitter<any>();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  this.userForm = this.fb.group({
    userId: [this.user?.userId ?? null],
    firstName: [this.user?.firstName || '', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
    lastName: [this.user?.lastName || '', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
    email: [this.user?.email || '', [Validators.required, Validators.email]],
    password: [this.user?.password || '', [Validators.required, Validators.minLength(6)]],
    phone: [this.user?.phone || '', [Validators.required, Validators.pattern(/^(\+?\d{1,4}[-\s]?)?\(?\d{1,4}\)?[-\s]?\d{3,5}[-\s]?\d{3,5}$/)]],
    roleId: [this.user?.roleId || '', Validators.required],
    status: [this.user?.status ?? true, Validators.required],
    userName: [this.user?.email || '', Validators.required],
    createdBy: [this.user?.createdBy ?? null],
    createdAt: [this.user?.createdAt ?? null],
  });

  this.userForm.get('email')?.valueChanges.subscribe((email) => {
    this.userForm.get('userName')?.setValue(email, { emitEvent: false });
  });

}

  onSubmit(): void {
    if (this.userForm.valid) {
        console.log('userForm on selector:',this.userForm.value);
        
      this.userSaved.emit(this.userForm.value);
    }else{
        console.log("this.userForm: ",this.userForm);
        console.log("form is not valid");
    }
  }

  onCancel(): void {
    this.formClosed.emit();
  }
}