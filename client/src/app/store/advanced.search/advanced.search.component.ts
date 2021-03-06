import {Component} from '@angular/core';
import {ApiProxy, AuthMediator} from '../../services';
import {ProductComponent} from '../components/products.component';
import {Router} from "@angular/router-deprecated";
import {NoneZeroFacetPipe} from "../../pipes/none.zero.facet.pipe";

@Component({
  selector: 'advanced-search',
  styles: [require('./advanced.search.css')],
  template: require('./advanced.search.html'),
  directives: [ProductComponent],
  pipes: [NoneZeroFacetPipe]
})
export class AdvancedSearchComponent {
  allProducts;
  allFacets;
  products;
  facets;
  search = {};

  constructor(
      protected proxy:ApiProxy,
      protected authMediator: AuthMediator,
      protected router: Router) { }

  ngOnInit() {
    if (!this.authMediator.user) {
      this.router.navigate(['/Store']);
      return;
    }

    this.proxy.getAllProductsForSearch()
      .subscribe(res => {
        this.products = this.allProducts = res.products;
        this.facets = this.allFacets = res.facets;
      });
  }

  onSearch() {
    this.products = null;

    this.proxy.advancedSearch(this.search)
      .subscribe(res => {
        this.products = res.products;
        this.facets = res.facets;
      });
  }

  reset() {
    this.search = {};
    this.products = this.allProducts;
    this.facets = this.allFacets;
  }
}
