import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coach, Slot } from '../typeorm';
import { SlotService } from './slot.service';
import { SlotController } from './slot.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Slot, Coach])],
	controllers: [SlotController],
	providers: [SlotService]
})
export class SlotModule {
}
