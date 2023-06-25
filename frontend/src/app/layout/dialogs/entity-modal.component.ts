import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EntityModalData, EntityType } from '../../core/models/dashboard.model';
import { CoachService } from '../../core/services/coach.service';
import { Coach, CreateCoachRequest } from '../../core/models/coach.model';
import { CacheService } from '../../core/services/cache.service';
import { StudentService } from '../../core/services/student.service';
import { CreateStudentRequest, Student } from '../../core/models/student.model';
import { MatChipInputEvent } from '@angular/material/chips';


@Component({
  selector: 'cs-entity-modal',
  templateUrl: './entity-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityModalComponent {

  EntityType = EntityType;

  expertises: string[] = [];

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EntityModalData,
    private dialogRef: MatDialogRef<any>,
    private coachService: CoachService,
    private studentService: StudentService,
    private cacheService: CacheService
  ) {}

  save(): void {
    const entities = {
      [EntityType.COACH]: () => this.handleCreateCoach(),
      [EntityType.STUDENT]: () => this.handleCreateStudent(),
    }

    return entities[this.data.entity]();

  }


  closeModal() {
    this.dialogRef.close();
  }

  private handleCreateCoach() {
    const { name, email } = this.form.value;

    const requestBody: CreateCoachRequest = {
      name,
      email,
      ...( this.expertises.length ) && { expertises: this.expertises }
    }
    this.coachService.createCoach(requestBody).subscribe((newCoach: Coach) => {
      this.closeModal();
      this.cacheService.updateCoaches(newCoach);
    });
  }

  private handleCreateStudent() {
    const { name, email } = this.form.value;

    const requestBody: CreateStudentRequest = { name, email }
    this.studentService.createStudent(requestBody).subscribe((newStudent: Student) => {
      this.closeModal();
      this.cacheService.updateStudents(newStudent);
    });
  }


  addChip(event: MatChipInputEvent): void {
    const value = event.value.trim();

    value && this.expertises.push(value);
    event.chipInput!.clear();
  }

  removeChip(chip: string): void {
    const index = this.expertises.indexOf(chip);
    if (index >= 0) {
      this.expertises.splice(index, 1);
    }
  }
}
