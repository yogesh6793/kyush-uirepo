import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPartnersComponent } from './web-partners.component';

describe('WebPartnersComponent', () => {
  let component: WebPartnersComponent;
  let fixture: ComponentFixture<WebPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebPartnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
