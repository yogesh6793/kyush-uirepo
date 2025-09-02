import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobApplicationTableComponent } from './jobApplication-table.component';

describe('JobApplicationTableComponent', () => {
  let component: JobApplicationTableComponent;
  let fixture: ComponentFixture<JobApplicationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobApplicationTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(JobApplicationTableComponent);
    component = fixture.componentInstance;
    component.jobApplications = [
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
