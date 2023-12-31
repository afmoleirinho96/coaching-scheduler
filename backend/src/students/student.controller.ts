import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Student } from '../typeorm';
import { StudentService } from './student.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentDto } from '../dtos/Student.dto';
import { CreateStudentDto } from '../dtos/CreateStudent.dto';

@ApiTags('Students')
@Controller('students')
export class StudentController {

	constructor(private readonly studentService: StudentService) {}

	@ApiOperation({ summary: 'Get all students' })
	@ApiOkResponse({ type: Student, isArray: true })
	@Get()
	async getAllStudents(): Promise<StudentDto[]> {
		return this.studentService.getAllStudents();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a student by id' })
	@ApiOkResponse({ description: 'Student found', type: StudentDto })
	async getStudentById(@Param('id') id: number): Promise<StudentDto> {
		return this.studentService.getStudentById(id);
	}

	@Post()
	@ApiOperation({ summary: 'Create a student' })
	@ApiBody({ type: CreateStudentDto })
	@ApiResponse({ status: 201, description: 'Student created successfully', type: StudentDto })
	@ApiResponse({ status: 400, description: 'Bad request, could not create student' })
	@UsePipes(new ValidationPipe({ transform: true }))
	async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<StudentDto> {
		return this.studentService.createStudent(createStudentDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a student' })
	@ApiOkResponse({ description: 'Student has been deleted' })
	async deleteStudent(@Param('id') id: number): Promise<void> {
		await this.studentService.deleteStudent(id);
	}
}
