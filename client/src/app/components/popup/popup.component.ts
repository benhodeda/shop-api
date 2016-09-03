import {Component, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'h-popup',
  styles: [ require('./popup.css') ],
  template: require('./popup.html')
})
export class PopupComponent {
  @Output() close = new EventEmitter<any>();

  wrapperClick($event) {
    $event.target.className === 'wrapper' &&
    this.close.emit(null);
  }
}
