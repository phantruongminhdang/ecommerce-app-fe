import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProductAdminComponent } from './popup-product-admin.component';

describe('PopupProductAdminComponent', () => {
  let component: PopupProductAdminComponent;
  let fixture: ComponentFixture<PopupProductAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupProductAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupProductAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
