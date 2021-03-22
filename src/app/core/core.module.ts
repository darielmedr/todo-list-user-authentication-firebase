import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../shared/material/material.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AuthorizationService } from '../features/home/services/authorization.service';



@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    LayoutModule,
    MaterialModule
  ],
  exports: [MainLayoutComponent],
  providers: [AuthorizationService]
})
export class CoreModule { }
