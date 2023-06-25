import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { Coach, Lesson, Slot, Student } from '../typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([Lesson, Student, Coach, Slot])],
	controllers: [LessonController],
	providers: [LessonService]
})
export class LessonModule {
}
