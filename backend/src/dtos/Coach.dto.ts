import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { SlotDto } from './SlotDto';


export class CoachDto {
	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	id: string;

	@ApiProperty()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({ type: [SlotDto] })
	availableSlots?: SlotDto[];
}