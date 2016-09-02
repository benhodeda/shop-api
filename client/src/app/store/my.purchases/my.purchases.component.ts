import { Component } from '@angular/core';
import { ApiProxy } from '../../services';
import { ProductComponent } from '../components/products.component';
import {AuthMediator} from "../../services/auth.mediator";


@Component({
  selector: 'my-purchases',
  styles: [ require('./my.purchases.css') ],
  template: require('./my.purchases.html'),
  directives: [ProductComponent]
})
export class MyPurchases {
  products;

  constructor(
    protected authMediator: AuthMediator,
    protected proxy: ApiProxy) {
  }

  ngOnInit() {
    let userId = this.authMediator.user.id;
    this.proxy.getUserPurchases(userId)
      .subscribe(products => this.products = products);
  }
}
