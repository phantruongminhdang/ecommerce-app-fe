import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreatePopupAdminComponent } from './user-create-popup-admin.component';

describe('UserCreatePopupAdminComponent', () => {
  let component: UserCreatePopupAdminComponent;
  let fixture: ComponentFixture<UserCreatePopupAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCreatePopupAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCreatePopupAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
