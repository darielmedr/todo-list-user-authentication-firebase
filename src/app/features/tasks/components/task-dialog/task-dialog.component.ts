import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Task from '../../../../shared/models/task';
import { TaskDialogData } from '../../models/task-dialog-data';
import { TaskDialogResult } from '../../models/task-dialog-result';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  public dialogTitle: string = 'New';
  public formTask: FormGroup;
  private task: Task = new Task();

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData) {
    this.dialogTitle = (this.data.isEditing) ? 'Edit' : 'New';
    if (this.data.task) {
      this.task = this.data.task;
    }

    this.formTask = this.fb.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public save(): void {
    if (this.formTask.valid) {
      const result: TaskDialogResult = {
        task: this.formTask.value,
      };
      this.dialogRef.close(result);
    }
    else {
      alert('The form is invalid.');
    }

  }
}