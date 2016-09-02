import { Component } from '@angular/core';
import { RouteConfig } from '@angular/router-deprecated';
import { Main } from './main';
import { ProductComponent } from './product';
import {StoreMenuComponent} from './components/store.menu.component';
import {AuthMediator} from "../services/auth.mediator";
import {UploadProductComponent} from "./upload.product";
import {SearchComponent} from "./serach";
import {MyStore} from "./my.store";
import {MyPurchases} from "./my.purchases";
import {MySells} from "./my.sells";
import {AdvancedSearchComponent} from "./advanced.search/advanced.search.component";
import {MyStatisticsComponent} from "./my.statistics";

@Component({
  selector: 'store',
  styles: [ require('./store.css') ],
  template: `
<md-content class="store-container" [ngClass]="{ 'show-menu': showMenu }">

  <div class="menu">
    <h-store-menu></h-store-menu>
  </div>

  <div class="store-content">
    <router-outlet></router-outlet>
  </div>

</md-content>
`,
  directives: [StoreMenuComponent]
})
@RouteConfig([
  { path: '/',                name: 'Main',             component: Main,    useAsDefault: true },
  { path: '/search/:q',       name: 'Search',           component: SearchComponent},
  { path: '/search/advanced', name: 'AdvancedSearch',   component: AdvancedSearchComponent},
  { path: '/product/:id',     name: 'Product',          component: ProductComponent },
  { path: '/upload',          name: 'UploadProduct',    component: UploadProductComponent },
  { path: '/my-store',        name: 'MyStore',          component: MyStore },
  { path: '/my-purchases',    name: 'MyPurchases',      component: MyPurchases },
  { path: '/my-sells',        name: 'MySells',          component: MySells },
  { path: '/my-statistics',   name: 'MyStatistics',     component: MyStatisticsComponent }
])
export class Store {
  constructor(protected authMediator: AuthMediator) { }

  get showMenu() {
    return this.authMediator.isUserLoggedin();
  }
}
