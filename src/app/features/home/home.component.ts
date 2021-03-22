import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthDialogResult } from './models/auth-dialog-result';
import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.saveUserLoggedData();
  }

  saveUserLoggedData(): void {
    this.authService.isLogged().subscribe((user: any) => {
      if (user && user.uid) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.setItem('user', JSON.stringify(user));
      }
    });
  }

  public logIn(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (result: AuthDialogResult) => {
        if (result) {
          if (result.register)
            return this.register();
          else if (result.success) {
            this.router.navigate(['todo']);
          }
        }
      },
      (err: any) => console.error(err)
    );
  }

  public register(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (result: AuthDialogResult) => {
        if (result && result.success)
          this.router.navigate(['todo']);
      },
      (err: any) => console.error(err)
    );
  }
}
