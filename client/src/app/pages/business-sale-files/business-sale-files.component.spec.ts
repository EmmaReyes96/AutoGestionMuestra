import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSaleFilesComponent } from './business-sale-files.component';

describe('BusinessSaleFilesComponent', () => {
  let component: BusinessSaleFilesComponent;
  let fixture: ComponentFixture<BusinessSaleFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSaleFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSaleFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
