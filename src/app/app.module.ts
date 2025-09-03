import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { WebServicesComponent } from './web-services/web-services.component';
import { WebPartnersComponent } from './web-partners/web-partners.component';
import { CareersComponent } from './careers/careers.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './api-services/api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlphabetOnlyDirective } from './validations/alphabetsDirective';
import { NumberOnlyDirective } from './validations/numbersDirective';
import { EmailValidatorDirective } from './validations/emailDirectives';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { AdminLoginComponent } from './admin/admin-login.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user/user-table/user-table.component';
import { JobApplicationTableComponent } from './jobApplication/jobApplication-table/jobApplication-table.component';
import { UserSelectorComponent } from './user/user-selector/user-selector.component';
import { MessageTableComponent } from './messages/message-table/message-table.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JobApplicationSelectorComponent } from './jobApplication/jobApplication-selector/jobApplication-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    WebServicesComponent,
    WebPartnersComponent,
    CareersComponent,
    ContactUsComponent,
    AlphabetOnlyDirective,
    NumberOnlyDirective,
    EmailValidatorDirective,
    AdminLoginComponent,
    AdminDashboardComponent,
    UserTableComponent,
    UserSelectorComponent,
    JobApplicationTableComponent,
    MessageTableComponent,
    JobApplicationSelectorComponent
   
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
