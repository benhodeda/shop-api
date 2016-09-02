import { Pipe, PipeTransform } from '@angular/core';
import {AuthMediator} from "../services/auth.mediator";

@Pipe({
  name: 'hideMyProducts'
})
export class HideMyProductsPipe implements PipeTransform {

  constructor(protected authMediator: AuthMediator) {}

  transform(products: Array<any>) {
    let user = this.authMediator.user;

    if (!products || !products.length || !user) return products;

    return products.filter(p => p.seller.id !== user.id);
  }
}
