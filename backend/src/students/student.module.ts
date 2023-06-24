import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Student } from '../typeorm';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student]),],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
