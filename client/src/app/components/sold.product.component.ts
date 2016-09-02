import {Component, OnInit} from "@angular/core";
import {ApiProxy} from "../services/api.proxy";
import {Router, RouteParams} from "@angular/router-deprecated";
import {AuthMediator} from "../services/auth.mediator";

@Component({
  selector: 'sold-product',
  styles: [`
    h2 {
      margin: 20px;
      text-align: center;
    }
  `],
  template: '<h2>תודה על תרומתך! מיד נעבור לחנות :)</h2>'
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
