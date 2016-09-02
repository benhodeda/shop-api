/**
 * Created by Elad on 8/14/16.
 */
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

declare var FB;

@Injectable()
export class FacebookProxy {
  user;

  tryLogin() {
    this.isLoggedIn().subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.login().subscribe(() => {
          console.log('connected!!!!!');
        });
      }
    });
  }

  login() {
    return Rx.Observable.create(observer => {

      this.isLoggedIn().subscribe(

        isLoggedIn => {
          if(isLoggedIn) {
            observer.next();
          } else {
            FB.login(
              observer.next,
              { scope: ['public_profile', 'user_about_me', 'email'] });
          }
        },

        _ => { /* do nothing */ },

        _ => {
          FB.login(
            observer.next,
            { scope: ['public_profile', 'user_about_me', 'email'] });
        });
    });

  }

  getUser() {
    return Rx.Observable.create(observer => {

      if(this.user) {
        observer.next(this.user);
      } else {
        FB.api(
          '/me',
          'GET',
          {fields: 'name,email,picture'},
          user => {
            this.user = user;
            observer.next(user);
          }
        );
      }

    });
  }

  isLoggedIn() {
    return Rx.Observable.create(observer => {

      FB.getLoginStatus(response => {
        if (response.error) {
          observer.error(response.error);
        } else if (response.status === 'connected') {
          observer.next(true, response);
        } else {
          observer.next(false, response);
        }
      });

    });
  }

}
