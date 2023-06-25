import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CoachModule } from './coaches/coach.module';
import { SlotModule } from './slots/slot.module';
import { typeOrmConfig } from './typeorm/config/database-config';
import { StudentModule } from './students/student.module';
import { LessonModule } from './lessons/lesson.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync(typeOrmConfig),
		CoachModule,
		SlotModule,
		StudentModule,
		LessonModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {
}