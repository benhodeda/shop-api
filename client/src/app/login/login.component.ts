import { Component, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import {AuthMediator} from '../services/auth.mediator';

@Component({
  selector: 'login',
  styles: [ require('./login.css') ],
  template: `
  <section class="login-container">
    <md-card>
      <md-card-title>התחברות</md-card-title>
      <md-card-content>
      <button class="facebook-login" md-raised-button (click)="facebookLogin()">התחברות דרך facebook</button>
      <p>
      לצורכי אמינות בחרנו ב-facebook בתור כלי ההזדהות ב-hand2hand
      </p>
      </md-card-content>
    </md-card>
  </section>
  `
})
export class Login {
  user;

  constructor(private authMediator: AuthMediator,
    private router: Router) { }

  ngOnInit() {
    if (this.authMediator.user) {
      this.router.navigate(['Store']);
    }
  }

  onSubmit({email: email, password: password}) {
    console.log(email, password);
  }

  facebookLogin() {
    this.authMediator.login().subscribe(x => {
      this.router.navigate(['Home']);
    });
  }
}
