import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-jobApplication-table',
  templateUrl: './jobApplication-table.component.html',
  styleUrls: ['./jobApplication-table.component.css']
})
export class JobApplicationTableComponent {
  @Input() jobApplications: any[] = [];

  activeMenuIndex: number | null = null;
  menuPosition = { top: 0, left: 0 };
  applicationToDelete: any = null;
  showDeletePopup: boolean = false;
  showMorePopup: boolean = false;
  selectedJobApplication: any = null;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

   toggleMenu(index: number, event: MouseEvent) {
  event.stopPropagation();

  const rect = (event.target as HTMLElement).getBoundingClientRect();
  this.activeMenuIndex = this.activeMenuIndex === index ? null : index;

  this.menuPosition = {
    top: rect.top + window.scrollY + 20,
    left: rect.left + window.scrollX + 10,
  };
}

ngOnInit() {
    console.log("jobApplications on table: ",this.jobApplications);
  document.addEventListener('click', this.closePopupOutside.bind(this));
}

ngOnDestroy() {
  document.removeEventListener('click', this.closePopupOutside.bind(this));
}

editJobApplication(application: any) {
  console.log('Edit application:', application);
  this.edit.emit(application);
}

showMore(user: any) {
  this.selectedJobApplication = user;
  this.showMorePopup = true;
}

closeShowMorePopup() {
  this.showMorePopup = false;
  this.selectedJobApplication = null;
}

deleteJobApplication(user: any) {
  this.applicationToDelete = user;
  this.showDeletePopup = true;
}

confirmDelete() {
  console.log('Deleting user:', this.applicationToDelete);
  // TODO: Add API call here
  this.delete.emit(this.applicationToDelete.jobApplicationId);
  this.showDeletePopup = false;
  this.applicationToDelete = null;
}

cancelDelete() {
  this.showDeletePopup = false;
  this.applicationToDelete = null;
}

closePopupOutside() {
  this.activeMenuIndex = null;
}

}
