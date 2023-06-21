import { Coach } from './coach.model';

export interface ViewMode {
  icon: string;
  entity: EntityType;
  routerLink: string;
}

export enum EntityType {
  COACH = 'Coach',
  STUDENT = 'Student'
}

export interface EntityModalData {
  entity: EntityType,

  entityData: Coach | Student

  isCreateMode: boolean;
}


export interface Student {
  name: string;
  email: string;
}
