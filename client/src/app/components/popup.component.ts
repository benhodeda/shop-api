/**
 * Created by Elad on 8/12/16.
 */
import {Component, Output, EventEmitter} from "@angular/core";
@Component({
  selector: 'h-popup',
  styles: [`
    .wrapper {
      width: 100vw;
      height: 100vh;
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      background-color: rgba(99, 99, 99, 0.5);;
    }
    .content {
      width: 50vw;
      height: 75vh;
      margin: 0 auto;
      position: absolute;
      padding: 30px;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translatex(-50%);
      border-radius: 10px;
      background-color: #ffffff;
      box-shadow: 5px 5px 20px 0px #424242;
    }
    .content div {
      height: 90%;
      overflow: scroll;
    }
    .close {
      cursor: pointer;
      margin: -10px;
    }
`],
  template: `
<div class="wrapper" (click)="wrapperClick($event)">
  <div class="content">
    <i (click)="close.emit(null)" class="material-icons close">clear</i>
    <div><ng-content></ng-content></div>
   </div>
</div>
`
})
export class PopupComponent {
  @Output() close = new EventEmitter<any>();

  wrapperClick($event) {
    $event.target.className === 'wrapper' &&
      this.close.emit(null);
  }
}
