import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'kyush-ui';

  currentRoute: string | undefined;
  selectedOption: string = '';
  options: string[] = ['Admin', 'Candidate Login'];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((val) => {
      if (this.router.url) {
        this.currentRoute = this.router.url;
      }
    });
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    console.log("current role url:",this.currentRoute);

    // Remove splash screen after animation
    const splashScreen = document.getElementById('splash-screen');
    splashScreen?.addEventListener('animationend', () => {
      splashScreen.style.display = 'none';
    });
  }

  scrollToElement(elementId: string): void {
    console.log("elementId: ",elementId);
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }

  onOptionSelected() {
    // Route based on selection
    if (this.selectedOption === 'Admin') {
      this.router.navigate(['/admin-login']); // assuming 'admin' is a valid route
    } else if (this.selectedOption === 'Candidate Login') {
      this.router.navigate(['/candidate-login']); // assuming 'candidate-login' is a valid route
    } else{
      this.router.navigate(['/']);
    }
  }
  
}
