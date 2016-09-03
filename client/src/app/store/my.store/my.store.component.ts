import { Component } from '@angular/core';
import {Router} from "@angular/router-deprecated";
import { ApiProxy } from '../../services';
import { ProductComponent } from '../components/products.component';
import {AuthMediator} from "../../services/auth.mediator";


@Component({
  selector: 'my-store',
  styles: [ require('./my.store.css') ],
  template: require('./my.store.html'),
  directives: [ProductComponent]
})
export class MyStore {
  products;

  constructor(
      protected router: Router,
      protected authMediator: AuthMediator,
      protected proxy: ApiProxy) {

  }

  ngOnInit() {
    if (!this.authMediator.user) {
      this.router.navigate(['/Store']);
      return;
    }

    let userId = this.authMediator.user.id;
    this.proxy.getUserStore(userId)
      .subscribe(products => this.products = products);
  }
}
