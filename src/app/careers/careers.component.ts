import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api-services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  jobList!: any;
  jobApplicationForm: FormGroup;
  resumeUpload!: File;
  selectedJobId!:Number;

  constructor(private apiService: ApiService,
    public dialog: MatDialog, private fb: FormBuilder,
    private toast: ToastrService
  ) {

    this.jobApplicationForm=this.fb.group({
      jobApplicationId:new FormControl(null),
      jobBoardId: new FormControl(null,{validators:[Validators.required]}),
      name: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(250)]),
      birthDate: new FormControl(null,{validators:[Validators.required]}),
      address: new FormControl(null,{validators:[Validators.required]}),
      state: new FormControl(null,{validators:[Validators.required]}),
      city: new FormControl(null,{validators:[Validators.required]}),
      pincode: new FormControl(null,{validators:[Validators.required]}),
      email: new FormControl(null,{validators:[Validators.required]}),
      phone: new FormControl(null,{validators:[Validators.required]}),
      linkedin: new FormControl(null,{validators:[Validators.required]}),
      howHear: new FormControl(null,{validators:[Validators.required]}),
      startDate: new FormControl(null,{validators:[Validators.required]}),
      currentCtc: new FormControl(null,{validators:[Validators.required]}),
      expectedCtc: new FormControl(null,{validators:[Validators.required]}),
      noticePeriod: new FormControl(null,{validators:[Validators.required]}),
      resume: new FormControl(null,{validators:[Validators.required]}),
      message:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(250)]),
      declaration: new FormControl(null,{validators:[Validators.required]}),
      
    });
   }

  ngOnInit(): void {
    this.getJobList();
  }

  getJobList(){
    this.apiService.getJobList().subscribe(
      data =>{
        this.jobList= data;
        console.log("Job list:", this.jobList);
       
      },
      err =>{
        //console.log("error",err.error);
      }
    )
  }

  openApplicationForm(job: any) {
    let element = document.getElementById('jobApplicationForm');
    if (element) {
      element.style.display = 'block';
      // Additional logic can be added here if needed
      console.log("jobBoardId: ",job.jobBoardId);
      this.selectedJobId=job.jobBoardId;
    }
  }

  closeApplicationForm() {
    let element = document.getElementById('jobApplicationForm');
    if (element) {
      element.style.display = 'none';
    }
    this.jobApplicationForm.reset();
  }

  submitApplication(event: Event, jobApplicationForm:any) {
    event.preventDefault();
    this.jobApplicationForm.get("jobBoardId")?.setValue(this.selectedJobId);
    // Handle form submission logic here
    console.log('Form submitted', jobApplicationForm.value);

    this.apiService.sendJobApplication(jobApplicationForm.value, this.resumeUpload).subscribe(
      data =>{
        console.log("response: ",data);
        if(data){
          this.toast.success('Submitted Successfully!', 'Success');
          this.jobApplicationForm.reset();
        }else{
          this.toast.error('Error Submitting Form!', 'Error');
          this.jobApplicationForm.reset();
        }
      },
      err =>{
        //console.log("error",err.error);
        this.toast.error('Error submitting form!', 'Error');
        this.jobApplicationForm.reset();
      }
    )
    
    // You can add further logic to send form data to a server or perform other actions
    this.closeApplicationForm(); // Close the form after submission if needed
  }

  selectFile(event: any){
    console.log("file event:",event);
    this.resumeUpload = event.target.files;
  }

}
