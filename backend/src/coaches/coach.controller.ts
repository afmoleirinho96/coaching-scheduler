import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Coach } from '../typeorm';
import { CoachService } from './coach.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoachDto } from '../dtos/Coach.dto';
import { CreateCoachDto } from '../dtos/CreateCoach.dto';

@ApiTags('Coaches')
@Controller('coaches')
export class CoachController {

	constructor(private readonly coachService: CoachService) {}

	@ApiOperation({ summary: 'Get all coaches' })
	@ApiOkResponse({ type: Coach, isArray: true })
	@Get()
	async getAllCoaches(): Promise<CoachDto[]> {
		return this.coachService.getAllCoaches();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a coach by id' })
	@ApiOkResponse({ description: 'Coach found', type: CoachDto })
	async getCoachById(@Param('id') id: number): Promise<CoachDto> {
		return this.coachService.getCoachById(id);
	}

	@Post()
	@ApiOperation({ summary: 'Create a coach' })
	@ApiCreatedResponse({ type: CoachDto })
	@ApiBadRequestResponse()
	@HttpCode(201)
	@UsePipes(new ValidationPipe({ transform: true }))
	async createCoach(@Body() createCoachDTO: CreateCoachDto): Promise<CoachDto> {
		return this.coachService.createCoach(createCoachDTO);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a coach' })
	@ApiOkResponse({ description: 'Coach has been deleted' })
	async deleteCoach(@Param('id') id: number): Promise<void> {
		await this.coachService.deleteCoach(id);
	}
}


