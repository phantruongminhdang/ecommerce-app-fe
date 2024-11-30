import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRequestUpdateDTO } from '../../../../../shared/models/User/UserRequestUpdateDTO';
import { UserService } from '../../../../../shared/services/api/user/user.service';
import { UserResponseDTO } from '../../../../../shared/models/User/UserReponseDTO';

@Component({
  selector: 'app-user-update-popup-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-update-popup-admin.component.html',
  styleUrl: './user-update-popup-admin.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('1000ms ease-in', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('1000ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class UserUpdatePopupAdminComponent {
  @Input() userId: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<UserRequestUpdateDTO>();

  userService = inject(UserService);

  formBuilder = inject(FormBuilder);

  user: UserResponseDTO = {
    email: '',
    id: '',
    fullname: '',
    isLockout: false,
    userName: '',
    role: '',
  }

  getUserById(userId: string | null) {
    if (userId) {
      this.userService
        .getUserById(userId)
        .subscribe(({
          next: (res: UserResponseDTO) => {
            this.user = res;
            this.userForm.patchValue(this.user);
          },
          error: (err) => {
            alert(err.error);
          }
        }));
    }
  }

  email: FormControl = new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]);
  userName: FormControl = new FormControl('', Validators.required);
  fullname: FormControl = new FormControl('', Validators.required);
  role: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);

  userForm = this.formBuilder.group({
    email: this.email,
    userName: this.userName,
    fullname: this.fullname,
    role: this.role
  });

  ngOnChanges() {
    this.getUserById(this.userId);
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: UserRequestUpdateDTO = {
        username: this.userForm.value.userName,
        fullname: this.userForm.value.fullname,
      }
      this.save.emit(user);
    }
  }

  onClose() {
    this.close.emit();
  }
}
