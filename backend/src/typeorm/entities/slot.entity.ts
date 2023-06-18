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

	@ManyToOne(() => Coach, coach => coach.availableSlots)
	@JoinColumn({ name: 'coachId' })
	coachId: number;

	@ManyToOne(() => Student, { nullable: true })
	student: Student | null;
}