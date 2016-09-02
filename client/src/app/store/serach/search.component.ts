import { Component } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { ApiProxy } from '../../services';
import { ProductComponent } from '../components/products.component';


@Component({
  selector: 'search',
  styles: [ `
    .title {
      margin-right: 20px;
    }
    .no-res {
      text-align: center;
    }
` ],
  template: `
<h2 class="title">מציג תוצאות עבור: {{ q }}</h2>
<h-products [products]="products"></h-products>
<div class="no-res" *ngIf="products && products.length === 0">אין תוצאות :(</div>

`,
  directives: [ProductComponent]
})
export class SearchComponent {
  products;
  q;

  constructor(protected proxy: ApiProxy, protected routeParams: RouteParams) {

  }

  ngOnInit() {
    this.q = this.routeParams.get('q');

    this.proxy.searchProducts(this.q)
      .subscribe(products => this.products = products);
  }
}
