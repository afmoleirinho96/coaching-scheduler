import { IsArray } from 'class-validator';


export class UpdateSlotStatusDto {
	@IsArray()
	slotIds: number[];
}