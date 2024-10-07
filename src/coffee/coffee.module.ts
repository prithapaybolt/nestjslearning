import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeService } from './coffee.service'; // Ensure this is declared only once
import { CoffeeController } from './coffee.controller';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  providers: [CoffeeService], // Ensure `CoffeeService` is only listed once here
  controllers: [CoffeeController],
})
export class CoffeeModule {}

