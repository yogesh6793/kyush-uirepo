import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private toast: ToastrService
  ) {  }

  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  isSubmitting = false; // Flag to track form submission state

  ngOnInit(): void {
    
  }

  submitForm() {
    this.isSubmitting = true; // Show loading indicator
    
    this.apiService.sendEmail(this.formData).subscribe(
      data => {
        this.toast.success('Form Submitted Successfully!', 'Success');
        this.resetForm();
        this.isSubmitting = false; // Hide loading indicator
      },
      err => {
        this.toast.error('Error submitting form!', 'Error');
        this.isSubmitting = false; // Hide loading indicator on error
      }
    );
  }

  resetForm(){
    this.formData = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  }

}
