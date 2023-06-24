import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { SlotDto } from './Slot.dto';

export class StudentDto {
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
	slots?: SlotDto[];
}