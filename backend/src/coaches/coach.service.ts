import { Coach } from '../typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoachDto } from '../dtos/Coach.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { CreateCoachDto } from '../dtos/CreateCoach.dto';
import { validate } from 'class-validator';

@Injectable()
export class CoachService {
	constructor(
		@InjectRepository(Coach)
		private readonly coachRepository: Repository<Coach>
	) {}

	async getAllCoaches(): Promise<CoachDto[]> {
		const coaches = await this.coachRepository.find();
		return plainToInstance(CoachDto, coaches);
	}

	async getCoachById(coachId: number): Promise<CoachDto> {
		const coach: Coach = await this.coachRepository.findOne({
			where: { id: coachId },
			relations: ['slots'],
			order: { slots: { startTime: 'ASC' } },
		});

		if (!coach) {
			throw new NotFoundException(`Coach with id ${coachId} not found`);
		}
		return plainToClass(CoachDto, coach);
	}

	async createCoach(createCoachDTO: CreateCoachDto): Promise<CoachDto> {
		const errors = await validate(createCoachDTO);

		if (errors.length > 0) {
			throw new BadRequestException(errors);
		}

		const coach = plainToClass(Coach, createCoachDTO);
		const createdCoach = await this.coachRepository.save(coach);
		return plainToClass(CoachDto, createdCoach);
	}

	async deleteCoach(id: number): Promise<void> {
		const result = await this.coachRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`Coach with ID '${id}' not found`);
		}
	}

}