import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserResponseDTO } from '../../../../../shared/models/User/UserReponseDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-table-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table-admin.component.html',
  styleUrl: './user-table-admin.component.css'
})
export class UserTableAdminComponent {
  @Input() userList: UserResponseDTO[] | null = [];
  @Output() editUser = new EventEmitter<string>();
  @Output() lockOrUnlockUser = new EventEmitter<string>();

  onEditUser(userId: string) {
    this.editUser.emit(userId);
  }

  onLockOrUnlockUser(userId: string) {
    this.lockOrUnlockUser.emit(userId);
  }
}
