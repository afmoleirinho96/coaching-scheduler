import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLessonDto {
	@IsOptional()
	@IsNumber()
	satisfactionScore?: number;

	@IsOptional()
	@IsString()
	coachNotes?: string;
}
