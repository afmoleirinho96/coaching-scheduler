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

export interface Coach {
  name: string;
  email: string;
  expertises: string[];
}

export interface Student {
  name: string;
  email: string;
}
