import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { viewModes } from '../dashboard.config';
import { ViewMode } from '../../../core/models/dashboard.model';

@Component({
  selector: 'cs-view-mode-toggle',
  templateUrl: './view-mode-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewModeToggle {
  viewModes: ViewMode[] = viewModes;

  constructor(private dialog: MatDialog) {}

  closeDialog() {
    this.dialog.closeAll();
  }
}
