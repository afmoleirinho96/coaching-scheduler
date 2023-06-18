import { Module } from '@nestjs/common';
import { CoachController } from './coach.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coach } from '../typeorm';
import { CoachService } from './coach.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coach]),],
  controllers: [CoachController],
  providers: [CoachService]
})
export class CoachModule {}
