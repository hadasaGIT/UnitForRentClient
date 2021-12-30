import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

@Injectable()
export class AuthGuardManager implements CanActivate {
  canActivate(): boolean {
    const login = localStorage.getItem('currentUser');
    if (
      (login != null && JSON.parse(login)['userType'] != 0) ||
      login == null
    ) {
      alert('אין לך גישה!');
      return false;
    }
    return true;
  }
}