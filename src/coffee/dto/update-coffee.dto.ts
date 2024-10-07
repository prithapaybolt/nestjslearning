// src/coffee/dto/update-coffee.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';
import { IsOptional, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  flavors?: string[];
}
