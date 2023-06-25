import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { SlotStatus } from '../interfaces/slot-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Coach, Slot } from '../typeorm';
import { In, Repository } from 'typeorm';
import { SlotDto, SlotsDto } from '../dtos/Slot.dto';
import { validate } from 'class-validator';
import { UpdateSlotStatusDto } from '../dtos/UpdateSlotStatus.dto';

@Injectable()
export class SlotService {

	constructor(
		@InjectRepository(Slot)
		private readonly slotRepository: Repository<Slot>,
		@InjectRepository(Coach)
		private readonly coachRepository: Repository<Coach>,
	) {}

	async markAsAvailable(coachId: number, slotsDto: SlotsDto): Promise<SlotDto[]> {
		await this.validateSlots(slotsDto);

		const coach: Coach = await this.coachRepository.findOne({
			where: { id: coachId },
			relations: ['slots'],
		});

		if (!coach) {
			throw new NotFoundException(`Coach with id ${coachId} not found`);
		}

		const slots: Slot[] = this.mapSlotsToEntities(slotsDto, coachId);

		await this.slotRepository.save(slots);

		return plainToInstance(SlotDto, slots);
	}

	async markAsBooked(studentId: number, updateSlotStatus: UpdateSlotStatusDto): Promise<void> {
		const foundSlots: Slot[] = await this.slotRepository.find({
			where: {
				id: In(updateSlotStatus.slotIds),
			},
		});

		if (foundSlots.length !== updateSlotStatus.slotIds.length) {
			throw new NotFoundException('One or more slots not found');
		}

		await this.slotRepository
			.createQueryBuilder('slot')
			.update().set({ status: SlotStatus.Booked, studentId })
			.whereInIds(foundSlots)
			.execute();

		return Promise.resolve();
	}

	async markAsScheduled(coachId: number, updateSlotStatus: UpdateSlotStatusDto): Promise<void> {
		const foundSlots: Slot[] = await this.slotRepository.find({
			where: {
				id: In(updateSlotStatus.slotIds),
				coachId: coachId,
			},
		});

		if (foundSlots.length !== updateSlotStatus.slotIds.length) {
			throw new NotFoundException('One or more slots not found');
		}

		await this.slotRepository
			.createQueryBuilder('slot')
			.update().set({ status: SlotStatus.Scheduled, coachId })
			.whereInIds(foundSlots)
			.execute();

		return Promise.resolve();
	}

	private mapSlotsToEntities(slotsDto: SlotsDto, coachId: number): Slot[] {
		return slotsDto.slots.map(slotDto => {
			const slot = plainToClass(Slot, slotDto)
			slot.coachId = coachId;
			return slot;
		});
	}

	private async validateSlots(slotsDto: SlotsDto) {
		const errors = await validate(slotsDto);

		if (errors.length > 0) {
			throw new BadRequestException(errors);
		}
	}

}