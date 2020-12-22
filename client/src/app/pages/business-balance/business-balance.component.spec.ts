import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessBalanceComponent } from './business-balance.component';

describe('BusinessBalanceComponent', () => {
  let component: BusinessBalanceComponent;
  let fixture: ComponentFixture<BusinessBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
