/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { Navigation, ApiProxy, FacebookProxy, AuthMediator } from './services';

import { Home } from './home';
import { Login } from './login';
import { Register } from './register';
import { Store } from './store';
import { RouterActive } from './router-active';
import {SettingsComponent} from "./settings";
import {ImageUploader} from "./services/image.uploader";
import {SoldProductComponent} from "./components/sold.product.component";


const ROUTS = [{
  name: 'Login',
  title: 'התחברות'
}, {
  name: 'Store',
  title: 'חנות'
}];


@Component({
  selector: 'app',
  pipes: [ ],
  providers: [Navigation, ApiProxy, FacebookProxy, AuthMediator, ImageUploader],
  directives: [ RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.css')
  ],
  template: `
    <md-content>
      <md-toolbar [color]="toolbarColor" class="top-toolbar">
          <span class="logo" [routerLink]="['Home']">{{ name }}</span>
          <i class="material-icons search-input-icon" (click)="onSearchClick()">search</i>
          <form class="search-form" (ngSubmit)="search()">
            <md-input class="search-input" (blur)="onSearchBlur()" [hidden]="!showSearchInput" [(ngModel)]="query"></md-input>
          </form>
          
          <span class="fill"></span>
          
          <button md-button router-active *ngFor="let route of routs" [routerLink]="[route.name]">
            {{ route.title }}
          </button>
          <img class="fb-avatar" *ngIf="isUserLoggedIn && user" [routerLink]="['Settings']" [src]="user.picture.data.url" />
      </md-toolbar>

      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>

      <router-outlet></router-outlet>

      <footer>
        hand2hand © 2016
      </footer>
      </md-content>
      <img class="bg-logo" src="./assets/img/home/logo.png" />

  `
})
@RouteConfig([
  { path: '/',          name: 'Home',     component: Home, useAsDefault: true },
  { path: '/login',     name: 'Login',    component: Login },
  { path: '/register',  name: 'Register', component: Register },
  { path: '/store/...', name: 'Store',    component: Store },
  { path: '/settings',  name: 'Settings', component: SettingsComponent },
  { path: '/sold/:id',  name: 'Sold',     component: SoldProductComponent }
])
export class App implements OnInit {
  loading = false;
  name = 'hand2hand';
  routs;
  toolbarColor = 'primary';
  showSearchInput = false;
  isUserLoggedIn: boolean;
  query: string;

  constructor(private authMediator: AuthMediator,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit() {
    this.routs = ROUTS;
    if(this.authMediator.isUserLoggedin()) {
      this.userLoggedIn();
      this.authMediator.onLogout.subscribe(() => {
        this.userLoggedOut();
        this.changeDetectorRef.detectChanges();
      });
    } else {
      this.authMediator.onLogin.subscribe(() => {
        this.userLoggedIn();
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  get user() {
    return this.authMediator.user;
  }

  search() {
    console.log('sdf');
    this.router.navigate(['Store/Search', { q: this.query }]);
  }

  userLoggedIn() {
    this.isUserLoggedIn = true;
    this.routs = this.routs.filter(r => r.name !== 'Login');
    this.authMediator.onLogout.subscribe(() => {
      this.userLoggedOut();
      this.changeDetectorRef.detectChanges();
    });
  }

  userLoggedOut() {
    this.isUserLoggedIn = false;
    this.routs = ROUTS;
    this.authMediator.onLogin.subscribe(() => {
      this.userLoggedIn();
      this.changeDetectorRef.detectChanges();
    });
  }

  onSearchClick() {
    this.toolbarColor = '';
    this.showSearchInput = true;
    setTimeout(() => (<any>document.querySelector('.top-toolbar .search-input input')).focus(), 0);

  }

  onSearchBlur() {
    this.toolbarColor = 'primary';
    this.showSearchInput = false;
  }
}
