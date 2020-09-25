import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsManageComponent } from './admin-products-manage.component';

describe('AdminProductsManageComponent', () => {
  let component: AdminProductsManageComponent;
  let fixture: ComponentFixture<AdminProductsManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductsManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
