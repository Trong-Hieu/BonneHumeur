import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersManageComponent } from './admin-orders-manage.component';

describe('AdminOrdersManageComponent', () => {
  let component: AdminOrdersManageComponent;
  let fixture: ComponentFixture<AdminOrdersManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
