import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Coach } from '../../core/models/coach.model';
import { Student } from '../../core/models/student.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';


export type CardData = Coach | Student & {
  expertises?: string[];
};


@Component({
  selector: 'cs-shared-card',
  templateUrl: './shared-card.component.html',
  standalone: true,
  imports: [MatCardModule, DatePipe, MatChipsModule, CommonModule, MatTooltipModule]
})

export class SharedCardComponent<T> {

  @Input() data: CardData;
  @Output() cardClicked: EventEmitter<CardData> = new EventEmitter<CardData>;

  defaultAvatar = 'assets/images/avatar_student.svg';


  constructor() {

  }

  cardClick(card: CardData) {
    this.cardClicked.emit(card);
  }
}
