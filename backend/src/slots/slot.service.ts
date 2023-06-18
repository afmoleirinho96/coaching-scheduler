import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { SlotStatus } from '../interfaces/slot-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Coach, Slot } from '../typeorm';
import { Repository } from 'typeorm';
import { SlotDto, SlotsDto } from '../dtos/Slot.dto';
import { validate } from 'class-validator';

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

		const coach = await this.coachRepository.findOne( {
			where: { id: coachId },
			relations: ['availableSlots'],
		});

		if (!coach) {
			throw new NotFoundException(`Coach with id ${coachId} not found`);
		}


		const slots: Slot[] = this.mapSlotsToEntities(slotsDto, coachId);

		await this.slotRepository.save(slots);

		return plainToInstance(SlotDto, slots);
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

	async markAsBooked(id: number): Promise<SlotDto> {
		const slot = await this.slotRepository.findOneBy({ id });

		if (!slot) {
			throw new NotFoundException(`Slot with ID "${id}" not found`);
		}

		slot.status = SlotStatus.Booked;
		const updatedSlot = await this.slotRepository.save(slot);

		return plainToClass(SlotDto, updatedSlot);
	}

	async markAsConfirmed(id: number): Promise<SlotDto> {
		const slot = await this.slotRepository.findOneBy({ id });

		if (!slot) {
			throw new NotFoundException(`Slot with ID "${id}" not found`);
		}

		slot.status = SlotStatus.Confirmed;
		const updatedSlot = await this.slotRepository.save(slot);

		return plainToClass(SlotDto, updatedSlot);
	}

}