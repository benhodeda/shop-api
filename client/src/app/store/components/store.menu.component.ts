/**
 * Created by Elad on 8/16/16.
 */
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'h-store-menu',
  encapsulation: ViewEncapsulation.None,
  styles: [ `
    .menu-item .md-list-item {
      cursor: pointer;
    }
    .menu-item .md-list-item:hover {
      background-color: #eeeeee;
    }

` ],
  template: `
<md-list>

  <md-list-item class="menu-item" [routerLink]="['../Store']">
    <img md-list-avatar src="./assets/img/store/all.png">
    <h3 md-line>כל הבגדים</h3>
    <p md-line>
      <span>צפה/י בכל הבגדים בחנות</span>
    </p>
  </md-list-item>
  
  <md-list-item class="menu-item" [routerLink]="['MyStore']">
    <img md-list-avatar src="./assets/img/store/shop.png">
    <h3 md-line>החנות שלי</h3>
    <p md-line>
      <span>צפה/י בבגדים שהעלית</span>
    </p>
  </md-list-item>
  
  <md-list-item class="menu-item" [routerLink]="['UploadProduct']">
    <img md-list-avatar src="./assets/img/store/upload.png">
    <h3 md-line>פרסמ/י בגד</h3>
    <p md-line>
      <span>העלה/י בגד לחנות שלך</span>
    </p>
  </md-list-item>
  
  <md-list-item class="menu-item" [routerLink]="['MyPurchases']">
    <img md-list-avatar src="./assets/img/store/purchases.png">
    <h3 md-line>הקניות שלי</h3>
    <p md-line>
      <span>צפה/י בבגדים שקנית</span>
    </p>
  </md-list-item>
  
  <md-list-item class="menu-item" [routerLink]="['MySells']">
    <img md-list-avatar src="./assets/img/store/career.png">
    <h3 md-line>המכירות שלי</h3>
    <p md-line>
      <span>צפה/י בבגדים שמכרת בעבר</span>
    </p>
  </md-list-item>
  
  <md-list-item class="menu-item" [routerLink]="['AdvancedSearch']">
    <img md-list-avatar src="./assets/img/store/search.png">
    <h3 md-line>חיפוש מתקדם</h3>
    <p md-line>
      <span>על שלל הבגדים בחנות</span>
    </p>
  </md-list-item>
  
  <md-list-item class="menu-item" [routerLink]="['MyStatistics']">
    <img md-list-avatar src="./assets/img/store/statistics.png">
    <h3 md-line>הסטטיסטיקות שלי</h3>
    <p md-line>
      <span>ראה/י כמה תרמת עד היום!</span>
    </p>
  </md-list-item>
</md-list>
`,
})
export class StoreMenuComponent { }
