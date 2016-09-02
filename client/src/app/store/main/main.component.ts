import { Component } from '@angular/core';
import { ApiProxy } from '../../services';
import { ProductComponent } from '../components/products.component';
import {HideMyProductsPipe} from "../../pipes/hide.my.products.pipe";


@Component({
  selector: 'main',
  styles: [ require('./main.css') ],
  template: require('./main.html'),
  directives: [ProductComponent],
  pipes: [HideMyProductsPipe]
})
export class Main {
  products;

  constructor(protected proxy: ApiProxy) {

  }

  ngOnInit() {
    this.proxy.getAllProducts()
      .subscribe(products => this.products = products);
  }
}
