import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSpendingComponent } from './business-spending.component';

describe('BusinessSpendingComponent', () => {
  let component: BusinessSpendingComponent;
  let fixture: ComponentFixture<BusinessSpendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSpendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
