import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageTableComponent } from './message-table.component';


describe('MessageTableComponent', () => {
  let component: MessageTableComponent;
  let fixture: ComponentFixture<MessageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageTableComponent);
    component = fixture.componentInstance;
    component.messages = [
      { name: 'John Doe', email: 'john@example.com', phone: '123456789', message:'Hi.......' }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message data in table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('td')?.textContent).toContain('John Doe');
  });
});
