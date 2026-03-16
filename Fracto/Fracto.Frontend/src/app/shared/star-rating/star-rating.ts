import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component(
  {
    selector: 'app-star-rating',
    standalone: false,
    templateUrl: './star-rating.html',
    styleUrls: ['./star-rating.css']
  }
)


export class StarRatingComponent {


  @Input() rating: number = 0;

  @Input() interactive: boolean = false;

  @Output() ratingSelected = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];
  hovered = 0;

  select(star: number)
  {
    if (this.interactive)
    {
      this.ratingSelected.emit(star);
    }
  }


}

