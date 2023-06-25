import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cs-shared-spinner',
  templateUrl: './shared-spinner.component.html',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule]
})
export class SharedSpinnerComponent {

  @Input() isLoading: boolean = false;
  @Input() message: string = 'Loading...';

}
