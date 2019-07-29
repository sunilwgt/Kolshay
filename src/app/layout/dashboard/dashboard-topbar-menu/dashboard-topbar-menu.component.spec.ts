import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopbarMenuComponent } from './dashboard-topbar-menu.component';

describe('DashboardTopbarMenuComponent', () => {
  let component: DashboardTopbarMenuComponent;
  let fixture: ComponentFixture<DashboardTopbarMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTopbarMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTopbarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
