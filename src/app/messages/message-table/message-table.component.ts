import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AdminDashboardComponent } from 'src/app/admin/dashboard/admin-dashboard.component';
import { ApiService } from 'src/app/api-services/api.service';


@Component({
  selector: 'app-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.css']
})
export class MessageTableComponent {
  @Input() messages: any[] = [];

  activeMenuIndex: number | null = null;
  menuPosition = { top: 0, left: 0 };
  showDeletePopup: boolean = false;
  messageToDelete: any = null;
  showMorePopup: boolean = false;
  selectedMessage: any = null;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() toggleUserStatus = new EventEmitter<any>();

    constructor(private apiService: ApiService
    ) {
  
      
    }

  ngOnInit() {
    console.log("messages on table: ",this.messages);
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


showMore(message: any) {
  this.selectedMessage = message;
  this.showMorePopup = true;
}

closeShowMorePopup() {
  this.showMorePopup = false;
  this.selectedMessage = null;
}


deleteMessage(message: any) {
  this.messageToDelete = message;
  this.showDeletePopup = true;
}

confirmDelete() {
  console.log('Deleting user:', this.messageToDelete);
  // TODO: Add API call here
  this.delete.emit(this.messageToDelete.contactUsId);
  this.showDeletePopup = false;
  this.messageToDelete = null;
}

cancelDelete() {
  this.showDeletePopup = false;
  this.messageToDelete = null;
}

toggleStatus(user: any){
  const updatedStatus = !user.status;
  console.log("updatedStatus: ",updatedStatus);
  user.status = updatedStatus;
  console.log("Updated user", user)
  this.toggleUserStatus.emit(user);
}

}
