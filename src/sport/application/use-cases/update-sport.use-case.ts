import { Injectable, Inject } from '@nestjs/common';
import { UpdateSportDto } from '../../dto/update-sport.dto';
import { SportDto } from '../../dto/sport.dto';
import { IUpdateSportUseCase, UPDATE_SPORT_USE_CASE } from '../../ports/use-cases/update-sport.use-case.port';
import { ISportRepository, SPORT_REPOSITORY } from '../../ports/repositories/sport.repository.port';
import { daysOfWeekArrayToString } from 'src/global/enums/dayOfWeek.enum';
import { Sport } from '../../domain/entities/sport.entity';

@Injectable()
export class UpdateSportUseCase implements IUpdateSportUseCase {
  constructor(
    @Inject(SPORT_REPOSITORY)
    private readonly sportRepository: ISportRepository,
  ) {}

  async execute(id: string, updateSportDto: UpdateSportDto): Promise<SportDto> {
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
}

