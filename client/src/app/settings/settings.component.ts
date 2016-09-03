import { Component, Input } from '@angular/core';
import {AuthMediator} from "../services/auth.mediator";
import {organizations} from '../services/categories';
import {Router} from "@angular/router-deprecated";

@Component({
  selector: 'settings',
  styles: [ `
    .settings-container {
      min-height: calc(100vh - 64px - 130px);
      display:flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: center;
      align-items: center;
    }
    
    .settings-container md-card {
      width: 50%;
      margin: 50px;
    }
    
    .avatar {
      float: left;
    }
    
    form div lable {
      display: block;
    }
    form div select {
      margin: 10px 0 10px 10px;
      width: 200px;
    }
    
    md-input {
      width: 200px;
    }
` ],
  template: `

<section class="settings-container">
    <md-card>
      <md-card-title>
        <span>שלום {{ user.name }}!</span>
        <img class="avatar" [src]="user.picture.data.url" />
      </md-card-title>
      <md-card-content>
          <button (click)="logout()" md-raised-button color="accent">התנתקות</button>
          <h4>
            כאן תוכל/י לבחור ארגון שאליו יעברו אחוזים מרווחי המכירות שלך :)
          </h4>

          <form (ngSubmit)="onSubmit(settingsForm.value)" #settingsForm="ngForm">
            <div>
              <lable>ארגון</lable>
              <select ngControl="organization" [(ngModel)]="organization">
                <option [ngValue]="o" *ngFor="let o of organizations">{{ o.name }}</option>
              </select>
            </div>
            
            <md-input type="number" step="5" min="5" [(ngModel)]="percent" placeholder="אחוזים" ngControl="percent">
              <md-hint align="end">%</md-hint>
            </md-input>
            
            <br>
            <br>
          
            <input type="submit" md-raised-button class="md-primary" value="שמור"/>

          </form>

      </md-card-content>
    </md-card>
  </section>
`
})
export class SettingsComponent {
  organizations = organizations;
  organization;
  percent;

  _user;

  constructor(
    protected authMediator: AuthMediator,
    private router: Router) { }

  get user() {
    this._user = this._user || this.authMediator.user;
    return this._user;
  }

  ngOnInit() {
    if (!this.user) {
      this.router.navigate(['Home']);
      return;
    }


    let settings = this.user.settings;

    if(settings) {
      if (settings.defaultOrg) {
        this.organization = this.organizations.filter(o => o.email === settings.defaultOrg.email)[0];
      }
      if (settings.defaultPercents) {
        this.percent = settings.defaultPercents;

      }
    }
  }

  onSubmit(data) {
    let newUser = Object.assign(this.user, {
      settings: {
        defaultOrg: data.organization,
        defaultPercents: data.percent
      }
    });

    this.authMediator.updateUser(newUser).subscribe(() => {
      this.router.navigate(['Store']);
    });
  }

  logout() {
    this.authMediator.logout();
    this.router.navigate(['Home']);
  }
}
