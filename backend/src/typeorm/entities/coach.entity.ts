import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany, JoinColumn,
} from 'typeorm';
import { Slot } from './slot.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Coach extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 500 })
	name: string;

	@Column({ length: 500 })
	email: string;

	@OneToMany(() => Slot, slot => slot.coachId)
	@JoinColumn({ name: 'coachId' })
	slots: Slot[];
}