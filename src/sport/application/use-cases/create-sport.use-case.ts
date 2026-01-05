import { Injectable, Inject } from '@nestjs/common';
import { CreateSportDto } from '../../dto/create-sport.dto';
import { SportDto } from '../../dto/sport.dto';
import { ICreateSportUseCase, CREATE_SPORT_USE_CASE } from '../../ports/use-cases/create-sport.use-case.port';
import { ISportRepository, SPORT_REPOSITORY } from '../../ports/repositories/sport.repository.port';
import { daysOfWeekArrayToString } from 'src/global/enums/dayOfWeek.enum';

@Injectable()
export class CreateSportUseCase implements ICreateSportUseCase {
  constructor(
    @Inject(SPORT_REPOSITORY)
    private readonly sportRepository: ISportRepository,
  ) {}

  async execute(createSportDto: CreateSportDto): Promise<SportDto> {
    const sport = this.sportRepository.create({
      ...createSportDto,
      dayOfWeek: daysOfWeekArrayToString(createSportDto.dayOfWeek),
    });
    const savedSport = await this.sportRepository.save(sport);
    return SportDto.convertToDto(savedSport);
  }
}

