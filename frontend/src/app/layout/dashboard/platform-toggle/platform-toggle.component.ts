import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { viewModes } from '../dashboard.config';
import { ViewMode } from '../../../core/models/dashboard.model';

@Component({
  selector: 'cs-platform-toggle',
  templateUrl: './platform-toggle.component.html',
  styleUrls: ['./platform-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformToggleComponent implements OnInit {
  viewModes: ViewMode[] = viewModes;


  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {

  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
