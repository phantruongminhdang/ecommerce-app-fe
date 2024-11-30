import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppCookieService } from '../../../shared/services/utils/cookie/app-cookie.service';
import { AuthService } from '../../../shared/services/api/auth/auth.service';
import { AuthRequest } from '../../../shared/models/Auth/AuthRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formBuilder = inject(FormBuilder)
  cookie = inject(AppCookieService)
  router = inject(Router)
  authService = inject(AuthService)

  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', Validators.required);

  loginForm = this.formBuilder.group({
    Email: this.email,
    Password: this.password,
  })

  onSubmit() {
    try {
      console.log(this.loginForm.value);

      this.authService.login(this.loginForm.value as AuthRequest).subscribe({
        next: (res) => {
          console.log(res);
          this.cookie.set('token', res.token, 1);
          if (res.role[0] == "Manager") {
            this.router.navigateByUrl('/admin/products')
          } else {
            this.router.navigateByUrl('/landing')
          }
        },

        error: (err) => {
          console.log(err);
          alert('Something went wrong. Please try again');
        }
      }
      )
    } catch (error) {
      console.log(error)
    }
  }
}
