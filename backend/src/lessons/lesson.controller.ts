import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreatedLessonDto } from '../dtos/CreateLesson';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LessonDto, LessonGroupedByDateDto } from '../dtos/Lesson.dto';
import { UpdateLessonDto } from '../dtos/UpdateLessonDto';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonController {
	constructor(private readonly lessonService: LessonService) {}

	@Post()
	@ApiOperation({ summary: 'Create a new lesson' })
	@ApiBody({ type: CreatedLessonDto })
	@ApiResponse({ status: 201, description: 'Lesson created successfully' })
	@ApiResponse({ status: 400, description: 'Bad request, could not create lesson' })
	async createLesson(@Body() createLessonDto: CreatedLessonDto): Promise<LessonDto> {
		return await this.lessonService.createLesson(createLessonDto);
	}

	@Get('coaches/:id/history')
	@ApiOperation({ summary: 'Get lessons by coach ID' })
	@ApiResponse({ status: 200, description: 'Returns an array of lessons' })
	@ApiResponse({ status: 400, description: 'Bad request, could not retrieve lessons' })
	getLessonsByCoachId(@Param('id') coachId: number): Promise<LessonGroupedByDateDto[]> {
		return this.lessonService.getLessonsByCoachId(coachId);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update lesson satisfaction score and coach notes' })
	@ApiResponse({ status: 200, description: 'Lesson updated successfully' })
	@ApiResponse({ status: 400, description: 'Bad request, could not update lesson' })
	async updateLesson(
		@Param('id') lessonId: number,
		@Body() updateLessonDto: UpdateLessonDto,
	): Promise<LessonDto> {
		return await this.lessonService.updateLesson(lessonId, updateLessonDto);
	}
}