import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffee')
export class CoffeeController {
    constructor(private readonly coffeeService: CoffeeService){

    }

    @Get()
    async findAll(): Promise<Coffee[]> {
      return this.coffeeService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Coffee> {
      return this.coffeeService.findOne(id);
    }
  
    @Post()
    async create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
      return this.coffeeService.create(createCoffeeDto);
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCoffeeDto: UpdateCoffeeDto,
    ): Promise<Coffee> {
      return this.coffeeService.update(id, updateCoffeeDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.coffeeService.remove(id);
    }
  }
  

