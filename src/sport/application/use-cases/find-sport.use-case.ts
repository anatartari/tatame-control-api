import { Injectable, Inject } from '@nestjs/common';
import { SportDto } from '../../dto/sport.dto';
import { IFindSportUseCase } from '../../ports/use-cases/find-sport.use-case.port';
import { ISportRepository, SPORT_REPOSITORY } from '../../ports/repositories/sport.repository.port';

@Injectable()
export class FindSportUseCase implements IFindSportUseCase {
  constructor(
    @Inject(SPORT_REPOSITORY)
    private readonly sportRepository: ISportRepository,
  ) {}

  async execute(id: string): Promise<SportDto | null> {
    const sport = await this.sportRepository.findOne({ where: { id } });
    return sport ? SportDto.convertToDto(sport) : null;
  }
}

