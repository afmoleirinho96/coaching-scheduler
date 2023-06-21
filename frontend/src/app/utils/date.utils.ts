export function extractDate(date: Date | string): string {
  if (typeof date === 'string') {
    return date.split('T')[0];
  } else {
    return date.toISOString().split('T')[0];
  }
}

export function slotToHour(slot: any): number {
  const [hour, minute] = slot.split(':').map(Number);
  return hour + minute / 60;
}

