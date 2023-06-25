import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SlotDto } from './Slot.dto';
import { CoachDto } from './Coach.dto';
import { StudentDto } from './Student.dto';

export class LessonDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	id: string;

	@ApiProperty({ type: CoachDto })
	@IsNotEmpty()
	coach: CoachDto;

	@ApiProperty({ type: StudentDto })
	@IsNotEmpty()
	student: StudentDto;

	@ApiProperty({ type: SlotDto })
	@IsNotEmpty()
	slots: SlotDto;

	@IsString()
	@IsOptional()
	coachNotes?: string;

	@IsNumber()
	@IsOptional()
	satisfactionScore?: number;
}

export class LessonGroupedByDateDto {
	dateDay: string;
	lessons: LessonDto[];
}

