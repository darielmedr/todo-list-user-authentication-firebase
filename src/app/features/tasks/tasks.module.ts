import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TaskComponent } from './components/task/task.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TaskService } from './services/task.service';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [TasksComponent, TaskComponent, TaskDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [
    TaskService
  ]
})
export class TasksModule { }