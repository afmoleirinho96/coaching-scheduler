import { Pipe, PipeTransform } from '@angular/core';
import { Slot, SlotStatus } from '../core/models/slot.model';
import { groupBy, sortBy, toPairs}  from 'lodash-es';
import { extractDate } from '../utils/date.utils';

@Pipe({
  name: 'filterStatusGroupByDate',
})
export class FilterStatusGroupByDatePipe implements PipeTransform {
  transform(slots: Slot[], status: SlotStatus): { date: string, slots: Slot[] }[] {
    const filteredSlots = slots.filter(slot => slot.status === status);

    const groups = groupBy(filteredSlots, slot => extractDate(slot.startTime));
    const sortedGroups = sortBy(toPairs(groups), ([date]) => new Date(date));

    return sortedGroups.map(([date, slots]) => ({ date, slots }));
  }
}


