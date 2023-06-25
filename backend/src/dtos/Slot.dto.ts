import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SlotStatus } from '../interfaces/slot-status.enum';
import { Type } from 'class-transformer';

export class SlotDto {

	@IsOptional()
	@IsNumber()
	id: number;

	@ApiProperty({ type: Date, format: 'date-time' })
	@IsDateString({}, { message: 'startTime must be a valid date' })
	startTime: Date;

	@ApiProperty({ type: Date, format: 'date-time' })
	@IsDateString()
	endTime: Date;

	@ApiProperty({ type: 'string', enum: SlotStatus })
	@IsOptional()
	@IsEnum(SlotStatus)
	status: SlotStatus;

	@IsNumber()
	@IsOptional()
	studentId: number;

	@IsNumber()
	@IsOptional()
	coachId: number;

}

export class SlotsDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => SlotDto)
	slots: SlotDto[];
}