/**
 * Created by Elad on 8/16/16.
 */
import { Component, Input } from '@angular/core';
import { StoreItem } from '../store-item/index';

@Component({
  selector: 'h-products',
  styles: [ `
    .items-wrapper {
      display:flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-content: flex-start;
      align-items: center;
    }
    
    store-item {
      width: 20%;
      margin: 20px;
    }
    
    md-spinner {
      margin: 100px auto;
    }
` ],
  template: `
<md-spinner *ngIf="!disableLoader && !products"></md-spinner>
<section class="items-wrapper">
  <store-item *ngFor="let product of products" [item]="product"></store-item>
</section>
`,
  directives: [StoreItem]
})
export class ProductComponent {
  @Input() products;
  @Input() disableLoader = false;
}
