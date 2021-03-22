import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import Task from '../../shared/models/task';
import { TaskDialogData } from './models/task-dialog-data';
import { TaskDialogResult } from './models/task-dialog-result';
import { TaskService } from './services/task.service';
import { ListNameString } from './types/list-name-string';
import { ListName } from './enums/list-name';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  todo$: Observable<Task[]> = new Observable<Task[]>();
  inProgress$: Observable<Task[]> = new Observable<Task[]>();
  done$: Observable<Task[]> = new Observable<Task[]>();

  constructor(private dialog: MatDialog,
              private taskService: TaskService) { }

  ngOnInit(): void {
    this.populateTasks();
  }

  private populateTasks(): void {
    this.todo$ = this.taskService.getToDoTasks();
    this.inProgress$ = this.taskService.getInProgressTasks();
    this.done$ = this.taskService.getDoneTasks();
  }

  public drop(event: CdkDragDrop<any>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    else {
      const item = event.previousContainer.data[event.previousIndex];
      const previousContainerName: string = this.getListName(event.previousContainer.id);
      const containerName: string = this.getListName(event.container.id);
      this.taskService.moveTaskToDifferentList(item, previousContainerName, containerName);

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  private getListName(cdkId: string): string {
    const indexString: string[] = cdkId.split('-');
    const index: number = Number.parseInt(indexString[indexString.length - 1]);
    const listName: string = ListName[index];
    return listName;
  }

  public newTask(): void {
    const dialogData: TaskDialogData = {
      task: new Task(),
      isEditing: false
    }
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = dialogData;

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (result: TaskDialogResult) => {
        if (result) {
          this.taskService.createTask(result.task);
        }
      },
      (err: any) => console.error(err)
    );
  }

  public editTask(task: Task, currentList: ListNameString): void {
    const dialogData: TaskDialogData = {
      task: task,
      isEditing: true
    }
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = dialogData;

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (result: TaskDialogResult) => {
        if (result) {
          this.taskService.editTask(task.id, result.task, currentList);
        }
      },
      (err: any) => console.error(err)
    );
  }

  public deleteTask(task: Task, currentList: ListNameString): void {
    this.taskService.deleteTask(task, currentList);
  }
}