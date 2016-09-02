import { Component, Input } from '@angular/core';
import { Router } from '@angular/router-deprecated';


@Component({
  selector: 'store-item',
  styles: [ require('./store-item.css') ],
  template: require('./store-item.html')
})
export class StoreItem {
  @Input() item;

  constructor(private router: Router) { }

  moreDetails(item) {
    this.router.navigate( ['Product', { id: item._id }] );
  }
}
