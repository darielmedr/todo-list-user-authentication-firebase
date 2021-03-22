import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Task from 'src/app/shared/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task = new Task();
  @Output() edit: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() delete: EventEmitter<Task> = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
  }

  public editTask(): void {
    this.edit.emit(this.task);
  }

  public deleteTask(): void {
    this.delete.emit(this.task);
  }
}