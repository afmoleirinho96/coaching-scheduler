import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EntityModalData } from '../../core/models/dashboard.model';


@Component({
  selector: 'cs-entity-modal',
  templateUrl: './entity-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityModalComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name: [this.data?.entityData?.name, Validators.required],
    email: [this.data?.entityData?.email, [Validators.required, Validators.email]],
  });


  isLoading = true;


  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EntityModalData,
    private dialogRef: MatDialogRef<any>,
  ) {}

  ngOnInit(): void {
  }


  save(): void {
    this.form.disable();
    this.isLoading = true;
  }


  closeModal() {
    this.dialogRef.close();
  }
}
