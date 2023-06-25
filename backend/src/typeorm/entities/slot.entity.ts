import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coach } from './coach.entity';
import { Student } from './student.entity';
import { SlotStatus } from '../../interfaces/slot-status.enum';

@Entity()
export class Slot {

	@PrimaryGeneratedColumn()
	id: number;

	@Column('timestamp')
	startTime: Date;

	@Column('timestamp')
	endTime: Date;

	@Column({ type: 'enum', enum: SlotStatus, default: SlotStatus.Available })
	status: SlotStatus;

	@ManyToOne(() => Coach, coach => coach.slots)
	@JoinColumn({ name: 'coachId', referencedColumnName: 'id' })
	coach: Coach;

	@Column()
	coachId: number;

	@ManyToOne(() => Student, student => student.slots)
	@JoinColumn({ name: 'studentId', referencedColumnName: 'id' })
	student: Student;

	@Column({ nullable: true })
	studentId: number;
}