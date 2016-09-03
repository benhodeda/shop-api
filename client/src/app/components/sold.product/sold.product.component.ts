import {Component, OnInit} from "@angular/core";
import {ApiProxy, AuthMediator} from "../../services";
import {Router, RouteParams} from "@angular/router-deprecated";

@Component({
  selector: 'sold-product',
  styles: [ require('./sold.product.css') ],
  template: require('./sold.product.html')
})
export class SoldProductComponent implements OnInit {
  constructor(
    protected router: Router,
    protected routeParams: RouteParams,
    protected authMediator: AuthMediator,
    protected apiProxy: ApiProxy) {}

  ngOnInit() {
    let id = this.routeParams.get('id');

    this.apiProxy.markProductAsSold(id, this.authMediator.user)
      .subscribe(() => this.router.navigate(['Store']));
  }
}
