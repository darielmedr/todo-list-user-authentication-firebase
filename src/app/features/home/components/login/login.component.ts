import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthDialogResult } from '../../models/auth-dialog-result';
import { UserLoginEmailPassword } from '../../models/user-login';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginEmailPasswordForm: FormGroup;
  public hidePassword: boolean = true;

  constructor(private fb: FormBuilder,
    private authService: AuthorizationService,
    public dialogRef: MatDialogRef<LoginComponent>) {
    this.loginEmailPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  public getEmailErrorMessage(): string {
    if (this.loginEmailPasswordForm.hasError('required', 'email')) {
      return 'The email field is empty';
    }
    return (this.loginEmailPasswordForm.hasError('email', 'email')) ? 'The email is invalid' : '';
  }

  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  public async login(): Promise<void> {
    if (!this.loginEmailPasswordForm.valid) {
      console.error('The submitted form has erros.');
      return;
    }
    const userLoginEmailPassword: UserLoginEmailPassword = this.loginEmailPasswordForm.value as UserLoginEmailPassword;
    try {
      const userCredential = await this.authService.loginEmailPassword(userLoginEmailPassword.email, userLoginEmailPassword.password);
      if (userCredential && userCredential.user.uid) {
        const dialogResult: AuthDialogResult = {
          success: true,
          register: false
        }
        this.dialogRef.close(dialogResult);
      } else {
        alert('Invalid credentials.');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  public redirectToRegister(): void {
    const dialogResult: AuthDialogResult = {
      success: false,
      register: true
    }
    this.dialogRef.close(dialogResult);
  }

}
