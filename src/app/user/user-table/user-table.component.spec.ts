import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTableComponent } from './user-table.component';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    component.users = [
      { name: 'John Doe', email: 'john@example.com', role: 'Admin' }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user data in table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('td')?.textContent).toContain('John Doe');
  });
});
