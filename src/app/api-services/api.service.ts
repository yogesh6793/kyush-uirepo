// src/app/services/api.service.ts

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  authenticate(loginCredentialForm: any) {
    return this.http.post(`${environment.baseUrl}/users/authenticate`, loginCredentialForm, { headers: new HttpHeaders() });
  }

  // 📬 Contact
  sendEmail(body: any) {
    return this.http.post(`${environment.baseUrl}/contact/sendMessage`, body, { headers: new HttpHeaders() });
  }

  getMessageList() {
    return this.http.get(`${environment.baseUrl}/contact/messages`);
  }

  deleteMessage(contactUsId: any) {
    return this.http.delete(`${environment.baseUrl}/contact/deleteMessage`, {
      params: { contactUsId },
      responseType: 'text'
    });
  }

  saveUpdateUser(body: any) {
    return this.http.post(`${environment.baseUrl}/users/addUpdateUser`, body);
  }

  getAllUser() {
    return this.http.get(`${environment.baseUrl}/users/getAllUsers`);
  }

  getAllRole() {
    return this.http.get(`${environment.baseUrl}/users/roles`);
  }

  deleteUser(userId: any) {
    return this.http.delete(`${environment.baseUrl}/users/delete`, {
      params: { userId },
      responseType: 'text'
    });
  }

  getJobList() {
    return this.http.get(`${environment.baseUrl}/job/getJobs`, { headers: new HttpHeaders() });
  }

  sendJobApplication(form: any, file: any) {
    const formData = new FormData();
    formData.append('file', file?.[0] ?? 'abc');
    formData.append('application', JSON.stringify(form));

    return this.http.post(`${environment.baseUrl}/job/sendJobApplication`, formData);
  }

  updateJobApplicationStatus(jobApplication: any){
    return this.http.put(`${environment.baseUrl}/job/updateJobApplicationStatus`, jobApplication);
  }

  getAllJobApplication() {
    return this.http.get(`${environment.baseUrl}/job/allJobApplication`);
  }

  getAllJobStatusList() {
    return this.http.get(`${environment.baseUrl}/job/allJobStatus`);
  }

  deleteJobApplication(jobApplicationId: any) {
    return this.http.delete(`${environment.baseUrl}/job/deleteJobApplication`, {
      params: { jobApplicationId },
      responseType: 'text'
    });
  }
}
