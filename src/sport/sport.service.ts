import { Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sport } from './entities/sport.entity';
import { Repository } from 'typeorm';
import { daysOfWeekArrayToString } from 'src/global/enums/dayOfWeek.enum';

@Injectable()
export class SportService {
  constructor(
    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,
  ) { }

  create(createSportDto: CreateSportDto): Promise<Sport> {
    const sport = this.sportRepository.create({
      ...createSportDto,
      day_of_week: daysOfWeekArrayToString(createSportDto.day_of_week),
    });
    return this.sportRepository.save(sport);
  }

  async findAll(): Promise<Sport[]> {
    return this.sportRepository.find();
  }

  //TODO: CREATE EXCEPTION HANDLER
  async findOne(id: number): Promise<Sport | null> {
    return this.sportRepository.findOne({ where: { id } });
  }

  async update(id: number, updateSportDto: UpdateSportDto): Promise<Sport> {
    const updateData = {
      ...updateSportDto,
      day_of_week: Array.isArray(updateSportDto.day_of_week)
        ? daysOfWeekArrayToString(updateSportDto.day_of_week)
        : updateSportDto.day_of_week,
    };
    await this.sportRepository.update(id, updateData);
    return this.sportRepository.findOne({ where: { id } }) as Promise<Sport>;
  }

  async remove(id: number): Promise<void> {
    await this.sportRepository.delete(id);
  }
}
