import { Component } from '@angular/core';

@Component({
  selector: 'register',
  styles: [ require('./register.css') ],
  template: `
    <section class="register-container">
      <md-card>
        <md-card-title>הרשמה</md-card-title>
        <md-card-content>
          <form (ngSubmit)="onSubmit(registerForm.value)" #registerForm="ngForm">
            <md-input required placeholder="שם מלא" ngControl="fullName" [(ngModel)]="fullName"></md-input>
            <md-input placeholder="כתובת" ngControl="address" [(ngModel)]="address">
              <!--<md-hint align="end">שנדע לאן לשלוח :)</md-hint>-->
            </md-input>
            <md-input required placeholder="Email" ngControl="email" pattern="^.+@.+\\..+$" [(ngModel)]="email">
              <md-hint *ngIf="registerForm.controls.email?.errors?.pattern" align="end">זה לא ממש נראה כמו מייל...</md-hint>
            </md-input>
            <md-input required type="password" placeholder="סיסמה" ngControl="password" [(ngModel)]="password"></md-input>

            <input [disabled]="!registerForm.form.valid" type="submit" md-raised-button class="md-primary" value="התחבר"/>
          </form>
        </md-card-content>
      </md-card>
    </section>
  `
})
export class Register {
  onSubmit({email: email, password: password, fullName: fullName, address: address}) {
    console.log(email, password, address, fullName);
  }
}
