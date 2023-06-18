import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SlotService } from './slot.service';
import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { SlotDto, SlotsDto } from '../dtos/Slot.dto';

@ApiTags('Slots')
@Controller()
export class SlotController {
	constructor(private readonly slotsService: SlotService) {}

	@Patch('coaches/:id/available-slots')
	@ApiOperation({ summary: 'Mark a slot as available by the coach' })
	@ApiOkResponse({ type: SlotDto })
	async markAsAvailable(@Param('id', ParseIntPipe) coachId: number,
						  @Body() slots: SlotsDto): Promise<SlotDto[]> {
		return this.slotsService.markAsAvailable(coachId, slots);
	}

	@Patch('student/:studentId/book-slot/:slotId')
	@ApiOperation({ summary: 'Mark a slot as booked by the student' })
	@ApiOkResponse({ type: SlotDto })
	async markAsBooked(@Param('id', ParseIntPipe) id: number): Promise<SlotDto> {
		return this.slotsService.markAsBooked(id);
	}

	@Patch(':coach/:id/confirm-slot')
	@ApiOperation({ summary: 'Mark a slot as confirmed by the coach' })
	@ApiOkResponse({ type: SlotDto })
	async markAsConfirmed(@Param('id', ParseIntPipe) id: number): Promise<SlotDto> {
		return this.slotsService.markAsConfirmed(id);
	}
}