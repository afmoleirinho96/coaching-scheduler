import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
} from 'typeorm';
import { Slot } from './slot.entity';

@Entity()
export class Student {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 500 })
	name: string;

	@OneToMany(() => Slot, availableSlot => availableSlot.student)
	bookedSlots: Slot[];
}