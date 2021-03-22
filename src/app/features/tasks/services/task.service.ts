import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Task from '../../../shared/models/task';

@Injectable()
export class TaskService {
  userId: string = '';

  constructor(private store: AngularFirestore, private afAuth: AngularFireAuth) {
    this.setInitialUserID();
    this.getUserLoggedId();
  }

  setInitialUserID(): void {
    const userStored: any = localStorage.getItem('user');
    if (userStored) {
      this.userId = JSON.parse(userStored).uid;
    } else {
      this.userId = '';
    }
  }
  getUserLoggedId(): void {
    this.afAuth.authState.subscribe((user: any) => {
      if (user && user.uid) {
        this.userId = user.uid;
      } else {
        this.userId = '';
      }
    });
  }

  public moveTaskToDifferentList(item: Task, previousContainerName: string, containerName: string) {
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection('tasks').doc(this.userId).collection(previousContainerName).doc(item.id).delete(),
        this.store.collection('tasks').doc(this.userId).collection(containerName).add(item),
      ]);
      return promise;
    });
  }

  /**
   * CRUD of tasks
   */
  public getToDoTasks(): Observable<any> {
    return this.store.collection('tasks').doc(this.userId).collection('todo').valueChanges({ idField: 'id' });
  }
  public getInProgressTasks(): Observable<any> {
    return this.store.collection('tasks').doc(this.userId).collection('inProgress').valueChanges({ idField: 'id' });
  }
  public getDoneTasks(): Observable<any> {
    return this.store.collection('tasks').doc(this.userId).collection('done').valueChanges({ idField: 'id' });
  }
  public createTask(task: Task): void {
    this.store.collection('tasks').doc(this.userId).collection('todo').add(task);
  }
  public editTask(taskId: string, updatedTask: Task, collectionName: string): void {
    this.store.collection('tasks').doc(this.userId).collection(collectionName).doc(taskId).update(updatedTask);
  }
  public deleteTask(task: Task, collectionName: string): void {
    this.store.collection('tasks').doc(this.userId).collection(collectionName).doc(task.id).delete();
  }
}