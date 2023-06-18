import { EntityType, ViewMode } from '../../core/models/dashboard.model';
import { CoachingSchedulerRoutes } from '../../utils/route.utils';

export const viewModes: ViewMode[] = [
  {
    icon: 'person',
    entity: EntityType.COACH,
    routerLink: CoachingSchedulerRoutes.COACHES
  },
  {
    icon: 'school',
    entity: EntityType.STUDENT,
    routerLink: CoachingSchedulerRoutes.STUDENTS
  },
];
