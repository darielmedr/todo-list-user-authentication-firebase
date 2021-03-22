import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import MenuItem from '../../models/MenuItem';
import { AuthorizationService } from 'src/app/features/home/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isExpanded: boolean = false;
  userCredentials: any;

  menuItems: Array<MenuItem> = [
    { path: 'home', icon: 'home', tooltip: 'Home' },
    { path: 'todo', icon: 'task', tooltip: 'ToDo List' }
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserCredential();
  }

  private getUserCredential(): void {
    this.authService.isLogged().subscribe((user: any) => {
      if (user) {
        this.userCredentials = user;
      } else {
        this.userCredentials = undefined;
      }
    });
  }

  public toggleSize(): void {
    this.isExpanded = !this.isExpanded;
  }

  public async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['home']);
  }
}