import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../model/user";

@Injectable({providedIn: "root"})
export class AuthenticationService {

  isLogged$: Subject<boolean>;

  constructor() {
    const userStr = localStorage.getItem('user') || '';
    this.isLogged$ = new BehaviorSubject<boolean>(!!userStr);
  }

  getCurrentUser(): User {
    const userStr = localStorage.getItem('user') || '';
    return userStr ? JSON.parse(userStr) : null;
  }

  updateLoggedStatus() {
    const userStr = localStorage.getItem('user') || '';
    this.isLogged$.next(!!userStr);
  }

  logout() {
    localStorage.removeItem('user');
    this.updateLoggedStatus();
  }

}
