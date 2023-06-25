import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { SharedSpinnerComponent } from './spinner/shared-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedCardComponent } from './card/shared-card.component';
import { SharedStarRatingComponent } from './star-rating/shared-star-rating.component';

const TOAST_TIMEOUT = 8000;

@NgModule({
  declarations: [],
  providers: [],
  imports: [
    SharedSpinnerComponent,
    SharedCardComponent,
    SharedStarRatingComponent,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-center',
        closeButton: true,
        timeOut: TOAST_TIMEOUT,
        preventDuplicates: true,
      }
    ),
    MatProgressSpinnerModule,
  ],
  exports: [SharedCardComponent, SharedSpinnerComponent, SharedStarRatingComponent]
})
export class SharedModule {
}
