import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
// import { isBuffer } from "util";

@Injectable()
export class AuthGuardCustomer implements CanActivate {
  canActivate(): boolean {
    const login = localStorage.getItem('currentUser');
    if (login == null) {
      alert('כדי להמשיך צריך להרשם לאתר');
      return false;
    } else if (JSON.parse(login)['userType'] != 1) {
      alert('למנהל אין גישה לאזור אישי של משתמש');
      return false;
    }
    return true;
  }
}
