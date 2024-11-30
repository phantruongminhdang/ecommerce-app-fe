import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdatePopupAdminComponent } from './user-update-popup-admin.component';

describe('UserUpdatePopupAdminComponent', () => {
  let component: UserUpdatePopupAdminComponent;
  let fixture: ComponentFixture<UserUpdatePopupAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserUpdatePopupAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdatePopupAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
