/**
 * Created by Elad on 8/16/16.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'h-star',
  template: `<span class="star" [class.active]="active" (click)="handleRate()">&#9733;</span>`,
  styles: [`
    .star {
      color: #efefef;
      cursor: pointer;
      font-size: 2rem;
      transition: color .4s ease-in-out;
    }
    .star.active {
      color: #FFD600;
    }
    :host-context(.disabled) .star {
      cursor: not-allowed;
    }
  `]
})
class StarComponent {
  @Input() active: boolean;
  @Input() position: number;
  @Output() rate = new EventEmitter();

  handleRate() {
    this.rate.emit(this.position);
  }
}

@Component({
  selector: 'h-rate-panel',
  template: `
    <div [class.disabled]="disabled === true">
      <h-star
        *ngFor="let star of stars"
        [active]="star <= _rating"
        (rate)="onRate($event)"
        [position]="star">
      </h-star>
    </div>
  `,
  directives: [StarComponent]
})
export class RatePanelComponent {
  @Input() disabled: boolean;
  @Input() rating: number;
  @Output() rate = new EventEmitter();
  stars = [1,2,3,4,5];
  _rating;

  ngOnInit() {
    this._rating = Math.round(this.rating);
  }

  onRate(star) {
    if (!this.disabled) {
      this.rate.emit(star);
      this._rating = star;
    }
  }
}
