import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'cs-shared-star-rating',
  templateUrl: './shared-star-rating.component.html',
  styleUrls: ['./shared-star-rating.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, MatTooltipModule]
})
export class SharedStarRatingComponent implements OnInit {

  @Input() currentRating: number = 0;
  @Input() starCount: number = 5;
  @Output() ratingChanged = new EventEmitter<number>();

  possibleRatings: number[] = [];

  constructor(private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.possibleRatings = Array.from(new Array(this.starCount), (x, i) => i + 1);
  }

  async applyRating(rating: number) {
    if (this.currentRating === rating) {
      const message = this.createFeedbackMessage(rating);

      this.matSnackBar.open(message, 'X', {
        duration: 8000,
        horizontalPosition: 'center'
      });
      return;
    }

    this.currentRating = rating;
    await this.ratingChanged.emit(rating);
  }

  private createFeedbackMessage(rating: number) {
    return `You already rated with ${rating} / ${this.starCount}. You may change your rating, to a different one.`;
  }
}
