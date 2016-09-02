import { Component } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';
import { ApiProxy } from '../../services';
import {AuthMediator} from "../../services/auth.mediator";
import {RatePanelComponent} from "../components/rate.panel.component";

@Component({
  selector: 'product',
  styles: [ require('./product.css') ],
  template: require('./product.html'),
  directives: [RatePanelComponent]
})
export class ProductComponent {
  product;
  justRated: boolean;

  constructor(
    protected proxy: ApiProxy,
    protected authMediator: AuthMediator,
    protected router: Router,
    private routeParams: RouteParams) {

  }

  ngOnInit() {
    let id = this.routeParams.get('id');

    this.proxy.getProduct(id)
      .subscribe(product => this.product = product);
  }

  buyProduct() {
    this.proxy.buyProduct(this.product._id).subscribe(res => {
      window.location = res.paymentApprovalUrl;
    });
  }

  deleteProduct() {
    this.proxy.deleteProduct(this.product._id).subscribe(() => {
      this.router.navigate(['/Store/MyStore']);
    });
  }

  isMyProduct() {
    let user = this.authMediator.user;
    return user && this.product.seller &&
      user.email === this.product.seller.email;
  }

  sellerRate(rate) {
    this.justRated = true;
    let user = this.authMediator.user;
    this.proxy.rateUser(this.product.seller.id, rate, user).
      subscribe(() => { });
  }

  canRateUser() {
    if (this.isMyProduct()) {
      return false;
    }
    if (!this.product.seller.rating || !this.product.seller.rating.raters
      || !this.product.seller.rating.raters.length) {
      return true;
    }
    return this.product.seller.rating.
      raters.indexOf(this.authMediator.user.id) === -1;
  }
}
