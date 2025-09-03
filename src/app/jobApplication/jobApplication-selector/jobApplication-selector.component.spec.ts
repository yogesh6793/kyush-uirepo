import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { JobApplicationSelectorComponent } from './jobApplication-selector.component';

describe('UserSelectorComponent', () => {
  let component: JobApplicationSelectorComponent;
  let fixture: ComponentFixture<JobApplicationSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobApplicationSelectorComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(JobApplicationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate the form when empty', () => {
    expect(component.jobApplicationForm.valid).toBeFalse();
  });

  it('should validate the form with correct data', () => {
    component.jobApplicationForm.setValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      role: 'Admin'
    });
    expect(component.jobApplicationForm.valid).toBeTrue();
  });
});
