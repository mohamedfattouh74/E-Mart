import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { signIn } from 'src/app/store/auth/auth.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private store: Store) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(signIn({ user: this.loginForm.value }));
    }
  }
}
