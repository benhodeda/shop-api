import { Component } from '@angular/core';
import { ApiProxy } from '../../services';
import { ProductComponent } from '../components/products.component';
import {AuthMediator} from "../../services/auth.mediator";


@Component({
  selector: 'my-sells',
  styles: [ require('./my.sells.css') ],
  template: require('./my.sells.html'),
  directives: [ProductComponent]
})
export class MySells {
  products;

  constructor(
    protected authMediator: AuthMediator,
    protected proxy: ApiProxy) {
  }

  ngOnInit() {
    let userId = this.authMediator.user.id;
    this.proxy.getUserSells(userId)
      .subscribe(products => this.products = products);
  }
}
