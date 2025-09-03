import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { WebServicesComponent } from './web-services/web-services.component';
import { WebPartnersComponent } from './web-partners/web-partners.component';
import { CareersComponent } from './careers/careers.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminLoginComponent } from './admin/admin-login.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },

  // {
  //   path: 'home',
  //   component: HomeComponent
  // },

  // { 
  //   path: 'about-us',
  //   component: AboutUsComponent
  // },

  // {
  //   path: 'services',
  //   component: WebServicesComponent
  // },

  // { 
  //   path: 'partners', 
  //   component: WebPartnersComponent 
  // },

  { 
    path: 'careers', 
    component: CareersComponent 
  },

  // { 
  //   path: 'contact-us',
  //   component: ContactUsComponent 
  // },
  { path: 'admin-login',
    component: AdminLoginComponent
  },

  { path: 'admin-dashboard',
    component: AdminDashboardComponent
  },


  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect to home for any unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
