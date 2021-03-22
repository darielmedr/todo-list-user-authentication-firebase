import { Injectable } from '@angular/core';
import { AngularFireAuth, } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationService {
  private _userData: any;

  public get userData(): any {
    return this._userData;
  }

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.saveUserLoggedData();
  }

  saveUserLoggedData(): void {
    this.afAuth.authState.subscribe((user: any) => {
      if (user && user.uid) {
        this._userData = user;
        localStorage.setItem('user', JSON.stringify(this._userData));
      } else {
        this._userData = '';
        localStorage.setItem('user', JSON.stringify(this._userData));
      }
    });
  }

  public loginEmailPassword(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  public registerEmailPassword(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  public logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  public isLogged(): Observable<any> {
    return this.afAuth.authState;
  }
}