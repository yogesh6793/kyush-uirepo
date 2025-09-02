import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AdminDashboardComponent } from 'src/app/admin/dashboard/admin-dashboard.component';
import { ApiService } from 'src/app/api-services/api.service';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  @Input() users: any[] = [];

  activeMenuIndex: number | null = null;
  menuPosition = { top: 0, left: 0 };
  showDeletePopup: boolean = false;
  userToDelete: any = null;
  showMorePopup: boolean = false;
  selectedUser: any = null;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() toggleUserStatus = new EventEmitter<any>();

    constructor(private apiService: ApiService
    ) {
  
      
    }

  ngOnInit() {
    console.log("users on table: ",this.users);
  document.addEventListener('click', this.closePopupOutside.bind(this));
}

ngOnDestroy() {
  document.removeEventListener('click', this.closePopupOutside.bind(this));
}

closePopupOutside() {
  this.activeMenuIndex = null;
}

  toggleMenu(index: number, event: MouseEvent) {
  event.stopPropagation();

  const rect = (event.target as HTMLElement).getBoundingClientRect();
  this.activeMenuIndex = this.activeMenuIndex === index ? null : index;

  this.menuPosition = {
    top: rect.top + window.scrollY + 20,
    left: rect.left + window.scrollX + 10,
  };
}


showMore(user: any) {
  this.selectedUser = user;
  this.showMorePopup = true;
}

closeShowMorePopup() {
  this.showMorePopup = false;
  this.selectedUser = null;
}

editUser(user: any) {
  console.log('Edit user:', user);
  this.edit.emit(user);
  
}

deleteUser(user: any) {
  this.userToDelete = user;
  this.showDeletePopup = true;
}

confirmDelete() {
  console.log('Deleting user:', this.userToDelete);
  // TODO: Add API call here
  this.delete.emit(this.userToDelete.userId);
  this.showDeletePopup = false;
  this.userToDelete = null;
}

cancelDelete() {
  this.showDeletePopup = false;
  this.userToDelete = null;
}

toggleStatus(user: any){
  const updatedStatus = !user.status;
  console.log("updatedStatus: ",updatedStatus);
  user.status = updatedStatus;
  console.log("Updated user", user)
  this.toggleUserStatus.emit(user);
}

}
