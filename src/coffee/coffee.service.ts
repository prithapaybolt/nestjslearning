// src/coffee/coffee.service.ts
// src/coffee/coffee.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  async findAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find({ relations: ['flavors'] });
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const { flavors, ...coffeeData } = createCoffeeDto;

    const flavorEntities = await Promise.all(
      flavors.map(async (name) => {
        const existingFlavor = await this.flavorRepository.findOne({ where: { name } });
        if (existingFlavor) return existingFlavor;
        const newFlavor = this.flavorRepository.create({ name });
        return this.flavorRepository.save(newFlavor);
      }),
    );

    const coffee = this.coffeeRepository.create({
      ...coffeeData,
      flavors: flavorEntities,
    });

    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    const coffee = await this.findOne(id);
    const { flavors, ...coffeeData } = updateCoffeeDto;

    if (flavors) {
      const flavorEntities = await Promise.all(
        flavors.map(async (name) => {
          const existingFlavor = await this.flavorRepository.findOne({ where: { name } });
          if (existingFlavor) return existingFlavor;
          const newFlavor = this.flavorRepository.create({ name });
          return this.flavorRepository.save(newFlavor);
        }),
      );
      coffee.flavors = flavorEntities;
    }

    Object.assign(coffee, coffeeData);
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number): Promise<void> {
    const result = await this.coffeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
  }
}
