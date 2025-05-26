import { Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sport } from './entities/sport.entity';
import { Repository } from 'typeorm';
import { daysOfWeekArrayToString } from 'src/global/enums/dayOfWeek.enum';
import { SportRepository } from './sport.repository';
import { SportWithStudentsCountDto } from './dto/sport-with-students-count.dto';

@Injectable()
export class SportService {
  constructor(
    private readonly sportRepository: SportRepository,
  ) { }

  async findAllWithStudentsCount(): Promise<SportWithStudentsCountDto[]> {
    return this.sportRepository.findWithStudentCount();
  }

  create(createSportDto: CreateSportDto): Promise<Sport> {
    const sport = this.sportRepository.create({
      ...createSportDto,
      dayOfWeek: daysOfWeekArrayToString(createSportDto.dayOfWeek),
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
      dayOfWeek: Array.isArray(updateSportDto.dayOfWeek)
        ? daysOfWeekArrayToString(updateSportDto.dayOfWeek)
        : updateSportDto.dayOfWeek,
    };
    await this.sportRepository.update(id, updateData);
    return this.sportRepository.findOne({ where: { id } }) as Promise<Sport>;
  }

  async remove(id: number): Promise<void> {
    await this.sportRepository.delete(id);
  }
}
