import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCoachDto {

	@IsString()
	@IsNotEmpty({ message: 'Name is required' })
	name: string;


	@IsNotEmpty({ message: 'Email is required' })
	@IsEmail({}, { message: 'Invalid email format. Please provide a valid email address.' })
	email: string;

	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	expertises: [];
}