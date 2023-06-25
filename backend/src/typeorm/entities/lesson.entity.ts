import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coach } from './coach.entity';
import { Student } from './student.entity';
import { Slot } from './slot.entity';

@Entity()
export class Lesson {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Slot)
	@JoinColumn()
	slot: Slot;

	@ManyToOne(() => Coach, )
	@JoinColumn()
	coach: Coach;

	@ManyToOne(() => Student)
	@JoinColumn()
	student: Student;

	@Column({ nullable: true })
	satisfactionScore: number;

	@Column({ nullable: true })
	coachNotes: string;

}