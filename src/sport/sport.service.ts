import { Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { SportDto } from './dto/sport.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sport } from './entities/sport.entity';
import { In, Repository } from 'typeorm';
import { daysOfWeekArrayToString } from 'src/global/enums/dayOfWeek.enum';
import { SportRepository } from './sport.repository';
import { SportWithStudentsCountDto } from './dto/sport-with-students-count.dto';
import { BasicListSportDto } from './dto/basic-list-sport.dto';

@Injectable()
export class SportService {
  constructor(
    private readonly sportRepository: SportRepository,
  ) { }

  async findAllWithStudentsCount(): Promise<SportWithStudentsCountDto[]> {
    return this.sportRepository.findWithStudentCount();
  }

  async listBasicList(): Promise<BasicListSportDto[]> {
    return this.sportRepository.findBasicList();
  }

  async create(createSportDto: CreateSportDto): Promise<SportDto> {
    const sport = this.sportRepository.create({
      ...createSportDto,
      dayOfWeek: daysOfWeekArrayToString(createSportDto.dayOfWeek),
    });
    const savedSport = await this.sportRepository.save(sport);
    return SportDto.convertToDto(savedSport);
  }

  async findAll(): Promise<SportDto[]> {
    const sports = await this.sportRepository.find();
    return sports.map(sport => SportDto.convertToDto(sport));
  }

  async findOne(id: string): Promise<SportDto | null> {
    const sport = await this.sportRepository.findOne({ where: { id } });
    return sport ? SportDto.convertToDto(sport) : null;
  }

  async update(id: string, updateSportDto: UpdateSportDto): Promise<SportDto> {
    const updateData = {
      ...updateSportDto,
      dayOfWeek: Array.isArray(updateSportDto.dayOfWeek)
        ? daysOfWeekArrayToString(updateSportDto.dayOfWeek)
        : updateSportDto.dayOfWeek,
    };
    await this.sportRepository.update(id, updateData);
    const updatedSport = await this.sportRepository.findOne({ where: { id } }) as Sport;
    return SportDto.convertToDto(updatedSport);
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
