import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalManagementSummaryComponent } from './rental-management-summary.component';

describe('RentalManagementSummaryComponent', () => {
  let component: RentalManagementSummaryComponent;
  let fixture: ComponentFixture<RentalManagementSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalManagementSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalManagementSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
