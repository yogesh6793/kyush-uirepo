import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api-services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router,
    private apiService: ApiService,
    private toast: ToastrService
  ) {}
  
   loginCredentialForm = {
    username: '',
    password: ''
  };

  login() {
    // Basic static check for demo purposes
    // if (this.username === 'admin' && this.password === 'admin123') {
        console.log("username:", this.loginCredentialForm.username);
        console.log("userpassword:", this.loginCredentialForm.password);

      this.apiService.authenticate(this.loginCredentialForm).subscribe(
      (data: any) =>{
        console.log("data after authenticate api: ",data);
        // ✅ Store token
      localStorage.setItem('jwtToken', data.jwtoken);

      // ✅ Optionally store user info
      localStorage.setItem('userId', data.userId);
        //this.toast.success('Saved Successfully!', 'Success');
        this.router.navigate(['/admin-dashboard']);
        
      },
      (err) =>{
        console.log("error",err.error);
        this.toast.error(err.error, 'Error');
      }
    )
  
  }
}
