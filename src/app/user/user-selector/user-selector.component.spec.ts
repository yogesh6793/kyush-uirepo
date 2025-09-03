import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSelectorComponent } from './user-selector.component';

describe('UserSelectorComponent', () => {
  let component: UserSelectorComponent;
  let fixture: ComponentFixture<UserSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSelectorComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate the form when empty', () => {
    expect(component.userForm.valid).toBeFalse();
  });

  it('should validate the form with correct data', () => {
    component.userForm.setValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      role: 'Admin'
    });
    expect(component.userForm.valid).toBeTrue();
  });
});
