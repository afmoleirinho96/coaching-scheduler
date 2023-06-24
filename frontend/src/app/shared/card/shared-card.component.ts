import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Coach } from '../../core/models/coach.model';
import { Student } from '../../core/models/student.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';


export type CardData = Student | Coach;

@Component({
  selector: 'cs-card',
  templateUrl: './shared-card.component.html',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule, DatePipe]
})

export class SharedCardComponent<T> {

  @Input() data: CardData;
  @Output() cardClicked: EventEmitter<CardData> = new EventEmitter<CardData>;

  defaultAvatar = 'assets/images/avatar_student.svg';

  constructor() {}

  cardClick(card: CardData) {
    this.cardClicked.emit(card);
  }
}
