// src/coffee/dto/create-coffee.dto.ts
import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsArray()
  @ArrayNotEmpty()
  flavors: string[];
}
