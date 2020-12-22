import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSpendingFilesComponent } from './business-spending-files.component';

describe('BusinessSpendingFilesComponent', () => {
  let component: BusinessSpendingFilesComponent;
  let fixture: ComponentFixture<BusinessSpendingFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSpendingFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSpendingFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
