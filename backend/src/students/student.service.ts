import { Student } from '../typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { StudentDto } from '../dtos/Student.dto';
import { CreateStudentDto } from '../dtos/CreateStudent.dto';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(Student)
		private readonly studentRepository: Repository<Student>
	) {}

	async getAllStudents(): Promise<StudentDto[]> {
		const students = await this.studentRepository.find();
		return plainToInstance(StudentDto, students);
	}

	async getStudentById(studentId: number): Promise<StudentDto> {
		const student: Student = await this.studentRepository.findOne({
			where: { id: studentId },
			relations: ['slots'],
			order: { slots: { startTime: 'ASC' } },
		});

		if (!student) {
			throw new NotFoundException(`Student with id ${ studentId } not found`);
		}
		return plainToClass(StudentDto, student);
	}

	async createStudent(createStudentDto: CreateStudentDto): Promise<StudentDto> {
		const errors = await validate(createStudentDto);

		if (errors.length > 0) {
			throw new BadRequestException(errors);
		}

		const student = plainToClass(Student, createStudentDto);
		const createdStudent = await this.studentRepository.save(student);
		return plainToClass(StudentDto, createdStudent);
	}

	async deleteStudent(id: number): Promise<void> {
		const result = await this.studentRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`Student with ID '${ id }' not found`);
		}
	}

}