import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoachDto {

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Name is required' })
	name: string;


	@ApiProperty()
	@IsNotEmpty({ message: 'Email is required'})
	@IsEmail({}, { message: 'Invalid email format. Please provide a valid email address.'})
	email: string;
}