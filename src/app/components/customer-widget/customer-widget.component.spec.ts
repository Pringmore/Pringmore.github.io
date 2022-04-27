import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWidgetComponent } from './customer-widget.component';

describe('CustomerWidgetComponent', () => {
  let component: CustomerWidgetComponent;
  let fixture: ComponentFixture<CustomerWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
