import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoachModule } from './coaches/coach.module';
import { SlotModule } from './slots/slot.module';
import { typeOrmConfig } from './typeorm/config/database-config';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync(typeOrmConfig),
		CoachModule,
		SlotModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}