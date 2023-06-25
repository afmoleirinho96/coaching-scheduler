import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Slot } from '../typeorm';
import { SlotDto } from './Slot.dto';

export class CreatedLessonDto {
	@ApiProperty()
	@ApiProperty({ type: SlotDto })
	@IsNotEmpty()
	slot: Slot;
}