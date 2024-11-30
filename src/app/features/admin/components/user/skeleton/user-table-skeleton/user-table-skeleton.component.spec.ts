import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableSkeletonComponent } from './user-table-skeleton.component';

describe('UserTableSkeletonComponent', () => {
  let component: UserTableSkeletonComponent;
  let fixture: ComponentFixture<UserTableSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTableSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTableSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
