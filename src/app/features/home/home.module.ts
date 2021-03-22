import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizationService } from './services/authorization.service';
import { TaskService } from '../tasks/services/task.service';

@NgModule({
  declarations: [ HomeComponent, RegisterComponent, LoginComponent ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [ AuthorizationService, TaskService ]
})
export class HomeModule { }
