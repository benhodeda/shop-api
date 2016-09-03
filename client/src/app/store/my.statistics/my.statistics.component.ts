import {Component} from '@angular/core';
import {Router} from "@angular/router-deprecated";
import {ApiProxy} from '../../services';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {AuthMediator} from "../../services/auth.mediator";

@Component({
  selector: 'my-statistics',
  styles: [require('./my.statistics.css')],
  template: require('./my.statistics.html'),
  directives: [CHART_DIRECTIVES]
})
export class MyStatisticsComponent {
  user;
  products;

  pieChartLabels;
  pieChartData;

  constructor(
      protected router: Router,
      protected authMediator: AuthMediator,
      protected proxy:ApiProxy) { }

  ngOnInit() {
    if (!this.authMediator.user) {
      this.router.navigate(['/Store']);
      return;
    }

    this.user = this.authMediator.user;
    this.proxy.getUserSells(this.user.id)
      .subscribe(this.calcStatistics.bind(this));
  }

  calcStatistics(products) {
    let res = products.map(p => {
      return {
        org: p.organization.name,
        donation: p.price * p.percent / 100
      };
    }).reduce((res, p) => {
      let i = res.pieChartLabels.indexOf(p.org);
      if (i === -1) {
        res.pieChartLabels.push(p.org);
        res.pieChartData.push(p.donation)
      } else {
        res.pieChartData[i] += p.donation;
      }
      return res;
    }, { pieChartLabels: [], pieChartData: [] });

    this.pieChartLabels = res.pieChartLabels;
    this.pieChartData = res.pieChartData;
  }
}
