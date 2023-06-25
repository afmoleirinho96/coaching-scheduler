import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Lesson } from '../typeorm/entities/lesson.entity';
import { CreatedLessonDto } from '../dtos/CreateLesson';
import { validate } from 'class-validator';
import { Coach, Slot, Student } from '../typeorm';
import { plainToClass } from 'class-transformer';
import { LessonDto, LessonGroupedByDateDto } from '../dtos/Lesson.dto';
import { SlotStatus } from '../interfaces/slot-status.enum';
import { UpdateLessonDto } from '../dtos/UpdateLessonDto';

@Injectable()
export class LessonService {
	constructor(
		@InjectRepository(Lesson)
		private readonly lessonRepository: Repository<Lesson>,
		@InjectRepository(Coach)
		private readonly coachRepository: Repository<Coach>,
		@InjectRepository(Student)
		private readonly studentRepository: Repository<Student>,
		@InjectRepository(Slot)
		private readonly slotRepository: Repository<Slot>,
	) {}

	async createLesson(createLessonDto: CreatedLessonDto): Promise<LessonDto> {
		await validate(CreatedLessonDto);

		const { slot: { studentId, coachId }, slot } = createLessonDto;
		const coach = await this.coachRepository.findOneBy({ id: coachId });

		if (!coach) {
			throw new NotFoundException(`Coach with id ${coachId} not found`);
		}

		const student = await this.coachRepository.findOneBy({ id: studentId });

		if (!student) {
			throw new NotFoundException(`Coach with id ${studentId} not found`);
		}

		slot.status = SlotStatus.Past;
		await this.slotRepository.save(slot);

		const createdLesson = await this.saveLesson(coach, student, slot);
		return plainToClass(LessonDto, createdLesson)
	}

	async getLessonsByCoachId(coachId: number): Promise<LessonGroupedByDateDto[]> {
		const lessons: Lesson[] = await this.lessonRepository.find({
			where: {
				coach: {
					id: coachId,
				},
			},
			relations: ['slot', 'coach', 'student'],
			order: { slot: { startTime: 'ASC' } },
		});

		return this.groupLessonsByDate(lessons);
	}

	async updateLesson(lessonId: number, updateLessonDto: UpdateLessonDto): Promise<LessonDto> {

		const lesson: Lesson = await this.lessonRepository.findOne({
			where: { id: lessonId },
			relations: ['slot', 'coach', 'student'],
		});


		if (!lesson) {
			throw new NotFoundException('Lesson not found');
		}

		const { satisfactionScore, coachNotes } = updateLessonDto;

		if (satisfactionScore != null && ( satisfactionScore < 1 || satisfactionScore > 5 )) {
			throw new BadRequestException('Satisfaction score must be a number between 1 and 5');
		}

		lesson.satisfactionScore = satisfactionScore ?? lesson.satisfactionScore;
		lesson.coachNotes = coachNotes ?? lesson.coachNotes;

		const updatedLesson = await this.lessonRepository.save(lesson);
		return plainToClass(LessonDto, updatedLesson);
	}

	private async saveLesson(coach: Coach, student: Coach, slot: Slot): Promise<Lesson> {
		const lesson = new Lesson();

		lesson.coach = coach;
		lesson.student = student;
		lesson.slot = slot;

		return await this.lessonRepository.save(lesson);
	}

	private groupLessonsByDate(lessons: Lesson[]): LessonGroupedByDateDto[] {
		const groupedLessons: LessonGroupedByDateDto[] = [];

		lessons.forEach((lesson) => {
			const dateDay = this.formatDateToDay(lesson.slot.startTime);
			let lessonGroup = groupedLessons.find((group) => group.dateDay === dateDay);

			if (!lessonGroup) {
				lessonGroup = { dateDay, lessons: [] };
				groupedLessons.push(lessonGroup);
			}

			const lessonDto = plainToClass(LessonDto, lesson);
			lessonGroup.lessons.push(lessonDto);
		});

		return groupedLessons;
	}

	private formatDateToDay(date: Date): string {
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};

		const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
		const [weekday, day] = formattedDate.split(', ');

		return `${weekday}, ${day}`;
	}
}