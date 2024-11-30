import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRequestCreateDTO } from '../../../../../shared/models/User/UserRequestCreateDTO';
import { UserService } from '../../../../../shared/services/api/user/user.service';
import { Role } from '../../../../../shared/models/enums/Role';

@Component({
  selector: 'app-user-create-popup-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-create-popup-admin.component.html',
  styleUrl: './user-create-popup-admin.component.css'
})
export class UserCreatePopupAdminComponent {

  @Output() add = new EventEmitter<UserRequestCreateDTO>();
  @Output() close = new EventEmitter<void>();

  roleList: string[] = [
    "Manager",
    "Customer"
  ];

  userService = inject(UserService);

  formBuilder = inject(FormBuilder);

  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  fullname: FormControl = new FormControl('', Validators.required);
  role: FormControl = new FormControl('', Validators.required);
  userForm = this.formBuilder.group({
    email: this.email,
    fullname: this.fullname,
    role: this.role
  });

  onSubmit() {
    if (this.userForm.valid) {
      const user: UserRequestCreateDTO = {
        email: this.userForm.value.email,
        fullname: this.userForm.value.fullname,
        role: this.userForm.value.role
      };
      this.add.emit(user);
    }
  }

  onClose() {
    this.close.emit();
  }
}
