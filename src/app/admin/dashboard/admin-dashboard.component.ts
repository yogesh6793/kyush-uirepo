import { Component, Input, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api-services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userList!: any;
  roleList!: any;
  jobStatusList!: any;
  messageList!: any;
  jobApplicationList!: any;
  adminName: string = 'Admin';
  selectedCard: string = '';
  showUserForm: boolean = false;
  showJobApplicationForm: boolean = false;
  selectedUser: any = null;
  selectedJobApplication: any = null;
  trustedDashboardUrl!: SafeResourceUrl;
   @Input() users: any[] = [];

  cards: string[] = [
    'Dashboard',
    'User Management',
    // 'Reports',
    // 'System Settings',
    'Messages',
    'Job Application',
    'Logs'
  ];

  constructor(private sanitizer: DomSanitizer, private router: Router,
    private apiService: ApiService,
    private toast: ToastrService
  ) {

    this.selectedCard='Dashboard';
  }

  ngOnInit(): void {
    // Initialization logic here (e.g., fetch stats, recent logs)
    //this.loadUsers();
    const dashboardUrl = 'https://app.powerbi.com/view?r=eyJrIjoiODU2MmU0ZGYtNDZhZC00ZTg1LWIwMmYtYTA5MThjZWE2YTAxIiwidCI6ImU4M2VjYjBkLWRlMzEtNDgxNS1hNDg4LThkZjdlNmY3OGQ4NiJ9';
    this.trustedDashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(dashboardUrl);
  }

  toggleUserForm() {
  this.showUserForm = !this.showUserForm;
  console.log("this.showUserForm: ",this.showUserForm);
  this.selectedUser = null; // reset form for new user
}

toggleJobApplicationForm() {
  this.showJobApplicationForm = !this.showJobApplicationForm;
  console.log("this.showJobApplicationForm: ",this.showJobApplicationForm);
  this.selectedJobApplication = null; // reset form for new user
}



handleUserSaved(newUser: any) {
  // Optionally refresh the user list
  this.savedUpdateUser(newUser);
  this.loadUsers();
  this.showUserForm = false;
}

handleJobApplicationSaved(jobApplication: any) {
  // Optionally refresh the user list
  this.savedUpdateJobApplication(jobApplication);
  this.loadJobApplication();
  this.showJobApplicationForm = false;
}

savedUpdateJobApplication(jobApplication: any){
  this.apiService.updateJobApplicationStatus(jobApplication).subscribe(
    (data: any) =>{
      this.loadJobApplication();
      this.toast.success('Saved Successfully!', 'Success');
    },
    (err) =>{
      console.log("error",err.error);
      this.toast.error('Error submitting form!', 'Error');
      this.loadJobApplication();
      }
  )
}

savedUpdateUser(newUser: any){
  this.apiService.saveUpdateUser(newUser).subscribe(
      (data: any) =>{
        this.userList= data;
        console.log("userList:", this.userList);
        this.toast.success('Saved Successfully!', 'Success');
       this.loadUsers();
      },
      (err) =>{
        console.log("error",err.error);
         this.toast.error('Error submitting form!', 'Error');
         this.loadUsers();
      }
    )
    
}

  selectCard(card: string) {
    this.selectedCard = card;
    console.log("selectedCard: ", this.selectedCard);

    // Load users only when User Management is selected
    if (this.selectedCard === 'User Management') {
      this.loadUsers();
      this.loadRoles();
    }

    if (this.selectedCard === 'Messages') {
      this.loadMessages();
    }

    if (this.selectedCard === 'Job Application') {
      this.loadJobStatus();
      this.loadJobApplication();
    }
  }

    loadUsers() {
      this.apiService.getAllUser().subscribe(
      data =>{
        this.userList= data;
        console.log("userList:", this.userList);
       
      },
      err =>{
        //console.log("error",err.error);
      }
    )
    
  }

   loadMessages() {
      this.apiService.getMessageList().subscribe(
      data =>{
        this.messageList= data;
        console.log("messageList:", this.messageList);
       
      },
      err =>{
        //console.log("error",err.error);
      }
    )
    
  }

   loadRoles() {
      this.apiService.getAllRole().subscribe(
      data =>{
        this.roleList= data;
        console.log("userRoleList:", this.roleList);
       
      },
      err =>{
        //console.log("error",err.error);
      }
    )
    
  }

    loadJobStatus() {
      this.apiService.getAllJobStatusList().subscribe(
      data =>{
        this.jobStatusList= data;
        console.log("jobStatusList:", this.jobStatusList);
       
      },
      err =>{
        //console.log("error",err.error);
      }
    )
    
  }


     loadJobApplication() {
      this.apiService.getAllJobApplication().subscribe(
      data =>{
        this.jobApplicationList= data;
        console.log("jobApplicationList:", this.jobApplicationList);
       
      },
      err =>{
        //console.log("error",err.error);
      }
    )
    
  }

  logout() {
    alert('Logging out...');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    this.router.navigate(['/admin-login']);
    // Add router navigation or auth logic here
    //this.router.navigate(['/']);
  }

  editUser(user: any){
    console.log("user on admin dashboard: ",user);
    this.selectedUser = user;
    this.showUserForm = true;
  }

  editJobApplication(jobApplication: any){
    console.log("jobApplication on admin dashboard: ",jobApplication);
    this.selectedJobApplication = jobApplication;
    this.showJobApplicationForm = true;
  }

 deleteUser(userId: number) {
  this.apiService.deleteUser(userId).subscribe(
    (response: any) => {
      console.log("Delete Response:", response);
      this.toast.success('User deleted successfully!', 'Success');
      this.loadUsers(); // Moved inside to ensure it only runs on success
    },
    (error) => {
      console.log("Delete error:", error);
      this.toast.error('Failed to delete user!', 'Error');
    }
  );
}

deleteMessages(contactUsId: number) {
  this.apiService.deleteMessage(contactUsId).subscribe(
    (response: any) => {
      console.log("Delete Response:", response);
      this.toast.success('Message deleted successfully!', 'Success');
      this.loadMessages(); // Moved inside to ensure it only runs on success
    },
    (error) => {
      console.log("Delete error:", error);
      this.toast.error('Failed to delete message!', 'Error');
    }
  );
}

deleteApplication(jobApplicationId: any){
   this.apiService.deleteJobApplication(jobApplicationId).subscribe(
    (response: any) => {
      console.log("Delete Response:", response);
      this.toast.success('Job Application deleted successfully!', 'Success');
      this.loadJobApplication(); // Moved inside to ensure it only runs on success
    },
    (error) => {
      console.log("Delete error:", error);
      this.toast.error('Failed to delete message!', 'Error');
    }
  );
}
toggleStatusFromParent(user: any) {
  this.savedUpdateUser(user);
}

deleteMessage(messageId: number){
  console.log("messageId: ",messageId);
  this.deleteMessages(messageId);
}

}
