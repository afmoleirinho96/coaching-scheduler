import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import entities from '../index';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
	imports: [ConfigModule],
	useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
		type: 'postgres',
		host: configService.get<string>('DB_HOST'),
		port: +configService.get<number>('DB_PORT'),
		username: configService.get<string>('DB_USERNAME'),
		password: configService.get<string>('DB_PASSWORD'),
		database: configService.get<string>('DB_NAME'),
		entities: entities,
		synchronize: true,

	}),
	inject: [ConfigService],
};
