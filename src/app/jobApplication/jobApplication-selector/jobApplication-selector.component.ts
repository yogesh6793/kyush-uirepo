import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-jobApplication-selector',
  templateUrl: './jobApplication-selector.component.html',
  styleUrls: ['./jobApplication-selector.component.css']
})
export class JobApplicationSelectorComponent implements OnInit {
  @Input() jobApplication: any = null;
  @Input() jobStatusList: any = null;
  @Output() formClosed = new EventEmitter<void>();
  @Output() jobApplicationSaved = new EventEmitter<any>();

  jobApplicationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  this.jobApplicationForm = this.fb.group({
    jobApplicationId: [this.jobApplication?.jobApplicationId ?? null],
    applicantName: [this.jobApplication?.applicantName || '', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
    jobBoardTitle: [this.jobApplication?.jobBoardTitle || ''],
    email: [this.jobApplication?.email || '', [Validators.required, Validators.email]],
    phone: [this.jobApplication?.phone || '', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
    jobStatusId: [this.jobApplication?.jobStatusId || '', Validators.required],

  });

//   this.jobApplicationForm.get('email')?.valueChanges.subscribe((email) => {
//     this.jobApplicationForm.get('userName')?.setValue(email, { emitEvent: false });
//   });

}

  onSubmit(): void {
    if (this.jobApplicationForm.valid) {
        console.log('jobApplicationForm on selector:',this.jobApplicationForm.value);
        
      this.jobApplicationSaved.emit(this.jobApplicationForm.value);
    }else{
        console.log("this.jobApplicationForm: ",this.jobApplicationForm);
        console.log("form is not valid");
    }
  }

  onCancel(): void {
    this.formClosed.emit();
  }
}