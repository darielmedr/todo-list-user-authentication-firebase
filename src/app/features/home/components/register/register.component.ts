import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthDialogResult } from '../../models/auth-dialog-result';
import User from '../../models/user';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userForm: FormGroup;
  public hidePassword: boolean = true;

  constructor(private fb: FormBuilder,
    private authService: AuthorizationService,
    public dialogRef: MatDialogRef<RegisterComponent>) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  public getEmailErrorMessage(): string {
    if (this.userForm.hasError('required', 'email')) {
      return 'The email field is empty';
    }
    return (this.userForm.hasError('email', 'email')) ? 'The email is invalid' : '';
  }

  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  public async register(): Promise<void> {
    if (!this.userForm.valid) {
      console.error('The submitted form has erros.');
      return;
    }
    const user: User = this.userForm.value as User;
    try {
      const userCredential = await this.authService.registerEmailPassword(user.email, user.password);
      if (userCredential) {
        const dialogResult: AuthDialogResult = {
          success: true,
          register: false
        }
        this.dialogRef.close(dialogResult);
      }
    } catch (err) {
      console.error(err);
      this.dialogRef.close();
    }
  }
}