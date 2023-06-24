import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const TOAST_TIMEOUT = 8000;

@NgModule({
  declarations: [],
  providers: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-center',
        closeButton: true,
        timeOut: TOAST_TIMEOUT,
        preventDuplicates: true,
      }
    ),
  ],
  exports: []
})
export class SharedModule {
}
