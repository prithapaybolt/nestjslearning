import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoffeeModule } from './coffee/coffee.module'; // Only one import

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST') || 'localhost',
        port: parseInt(config.get<string>('DB_PORT')) || 5432,
        username: config.get<string>('DB_USERNAME') || 'coffee_user',
        password: config.get<string>('DB_PASSWORD') || 'securepassword',
        database: config.get<string>('DB_DATABASE') || 'coffee_db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    CoffeeModule,
  ],
})
export class AppModule {}

