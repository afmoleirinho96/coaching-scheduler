import { ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SlotService } from './slot.service';
import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { SlotDto, SlotsDto } from '../dtos/Slot.dto';
import { UpdateSlotStatusDto } from '../dtos/UpdateSlotStatus.dto';

@ApiTags('Slots')
@Controller()
export class SlotController {
	constructor(private readonly slotsService: SlotService) {}

	@Patch('coaches/:id/available-slots')
	@ApiOperation({ summary: 'Mark a slot as available, by the coach' })
	@ApiOkResponse({ type: SlotDto })
	async markAsAvailable(@Param('id', ParseIntPipe) coachId: number,
						  @Body() slots: SlotsDto): Promise<SlotDto[]> {
		return this.slotsService.markAsAvailable(coachId, slots);
	}

	@Patch('students/:id/book-slots')
	@ApiOperation({ summary: 'Mark a slot as booked, by the student' })
	@ApiNoContentResponse({ description: 'Slots successfully marked as booked' })
	async markAsBooked(
		@Param('id', ParseIntPipe) studentId: number,
		@Body() updateSlotStatus: UpdateSlotStatusDto
	): Promise<void> {
		return this.slotsService.markAsBooked(studentId, updateSlotStatus);
	}

	@Patch('coaches/:id/schedule-slots')
	@ApiOperation({ summary: 'Mark a slot as scheduled, by the coach' })
	@ApiNoContentResponse({ description: 'Slots successfully marked as scheduled' })
	async markAsScheduled(
		@Param('id', ParseIntPipe) coachId: number,
		@Body() updateSlotStatus: UpdateSlotStatusDto
	): Promise<void> {
		return this.slotsService.markAsScheduled(coachId,updateSlotStatus);
	}
}