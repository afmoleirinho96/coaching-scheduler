import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany, JoinColumn,
} from 'typeorm';
import { Slot } from './slot.entity';
import { BaseEntity } from './base.entity';


@Entity()
export class Student extends BaseEntity{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100 })
	name: string;

	@Column({ length: 100 })
	email: string;

	@OneToMany(() => Slot, slot => slot.student)
	@JoinColumn({ name: 'student' })
	slots: Slot[];
}