import { Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sport } from './entities/sport.entity';
import { In, Repository } from 'typeorm';
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

  async findOne(id: string): Promise<Sport | null> {
    return this.sportRepository.findOne({ where: { id } });
  }

  async update(id: string, updateSportDto: UpdateSportDto): Promise<Sport> {
    const updateData = {
      ...updateSportDto,
      dayOfWeek: Array.isArray(updateSportDto.dayOfWeek)
        ? daysOfWeekArrayToString(updateSportDto.dayOfWeek)
        : updateSportDto.dayOfWeek,
    };
    await this.sportRepository.update(id, updateData);
    return this.sportRepository.findOne({ where: { id } }) as Promise<Sport>;
  }

  async remove(id: string): Promise<void> {
    await this.sportRepository.delete(id);
  }

  async calculateTotalPrice(sportIds: string[]): Promise<number> {
    const sports = await this.sportRepository.find({
      where: { id: In(sportIds) },
      select: ['price']
    });

    return sports.reduce((total, sport) => total + Number(sport.price), 0);
  }
}
