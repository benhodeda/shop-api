/**
 * Created by Elad on 8/14/16.
 */
import { Injectable, EventEmitter } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {FacebookProxy} from './facebook.proxy';
import {ApiProxy} from './api.proxy';
import {IUser} from "../models/i.user";

const LS_USER_KEY = 'user';

@Injectable()
export class AuthMediator {
  onLogin = new EventEmitter<any>();
  onLogout = new EventEmitter<any>();
  protected _user;

  constructor(private facebookProxy: FacebookProxy, private apiProxy: ApiProxy) { }

  get user(): IUser {
    return this._user;
  }

  login() {
    return Rx.Observable.create(observer => {
      this.facebookProxy.login().subscribe(_ => {
        this.facebookProxy.getUser().subscribe(fbUser => {
          this.apiProxy.login(fbUser).subscribe(({ local: serverUser }) => {
            this.saveUser(serverUser);
            observer.next(serverUser);
            this.onLogin.emit(serverUser);
          });
        });
      });
    });
  }

  logout() {
    this.onLogout.emit(null);
    delete localStorage[LS_USER_KEY];

    setTimeout(() => {
      this._user = undefined;
    }, 0);
  }

  updateUser(user) {
    debugger;
    this.saveUser(user);
    return this.apiProxy.updateUser(user);
  }

  protected saveUser(user) {
    this._user = user;
    localStorage[LS_USER_KEY] = JSON.stringify(user);
  }

  isUserLoggedin() {
    if(this._user) {
      return true;
    }

    if(localStorage[LS_USER_KEY]) {
      this._user = JSON.parse(localStorage[LS_USER_KEY]);
      return true;
    }

    return false;
  }

}
