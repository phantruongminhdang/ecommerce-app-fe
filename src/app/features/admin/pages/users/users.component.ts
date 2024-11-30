import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserRequestCreateDTO } from '../../../../shared/models/User/UserRequestCreateDTO';
import { UserRequestUpdateDTO } from '../../../../shared/models/User/UserRequestUpdateDTO';
import { UserService } from '../../../../shared/services/api/user/user.service';
import { TablePaginationAdminComponent } from "../../components/table-pagination-admin/table-pagination-admin.component";
import { UserCreatePopupAdminComponent } from "../../components/user/user-create-popup-admin/user-create-popup-admin.component";
import { UserTableAdminComponent } from "../../components/user/user-table-admin/user-table-admin.component";
import { UserUpdatePopupAdminComponent } from "../../components/user/user-update-popup-admin/user-update-popup-admin.component";
import { UserActions } from '../../../../state/user/action/user.action';
import { selectUsers, selectUsersError, selectUsersLoading } from '../../../../state/user/selector/user.selector';
import { UserTableSkeletonComponent } from "../../components/user/skeleton/user-table-skeleton/user-table-skeleton.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserTableAdminComponent, UserUpdatePopupAdminComponent, UserCreatePopupAdminComponent, TablePaginationAdminComponent, UserTableSkeletonComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  userService = inject(UserService);
  activateRoute = inject(ActivatedRoute);
  store = inject(Store);

  pageIndex: number = 0;
  pageSize: number = 10;

  paginationUser$ = this.store.select(selectUsers);
  isLoading$: Observable<boolean> = this.store.select(selectUsersLoading);
  error$ = this.store.select(selectUsersError);

  showModifyUser = false;
  showCreateUser = false;
  selectedUpdateUserId: string = "";

  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe((params) => {
      this.pageIndex = Number.parseInt(params.get('pageIndex') || '0');
      this.pageSize = Number.parseInt(params.get('pageSize') || '10');

      this.getAllUsers();
    })
  }

  getAllUsers() {
    this.store.dispatch(UserActions.loadUser({ pageIndex: this.pageIndex, pageSize: this.pageSize }))
  }

  onEditUser(userId: string) {
    this.selectedUpdateUserId = userId;
    this.showModifyUser = true;
  }

  onShowLockOrUnlockUserPopup(userId: string) {
    const confirm = window.confirm(`Are you sure you want to lock or unlock user with id ${userId}?`);

    if (confirm) {
      this.onLockOrUnlockUser(userId);
    }
  }

  onShowAddUserPopup() {
    this.showCreateUser = true;
  }

  onSaveUser(user: UserRequestUpdateDTO) {
    this.userService.saveUser(user, this.selectedUpdateUserId).subscribe({
      next: (res) => {
        alert(res.msg);
        this.getAllUsers();
        this.showModifyUser = false;
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
      }
    })
  }

  onLockOrUnlockUser(userId: string) {
    this.userService.lockOrUnlockUser(userId).subscribe({
      next: (res) => {
        alert(res.msg);
        this.getAllUsers();
      },
      error: (err) => {
        alert(err.error);
      }
    })
  }

  onAddUser(user: UserRequestCreateDTO) {
    this.userService.createUser(user).subscribe({
      next: (res) => {
        alert(res.msg);
        this.getAllUsers();
        this.showCreateUser = false;
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
      }
    })
  }

  onCloseModifyUser() {
    this.showModifyUser = false;
  }

  onCloseCreateUser() {
    this.showCreateUser = false;
  }
}
