import { Injectable, Inject } from '@nestjs/common';
import { SportDto } from '../../dto/sport.dto';
import { IListSportsUseCase, LIST_SPORTS_USE_CASE } from '../../ports/use-cases/list-sports.use-case.port';
import { ISportRepository, SPORT_REPOSITORY } from '../../ports/repositories/sport.repository.port';

@Injectable()
export class ListSportsUseCase implements IListSportsUseCase {
  constructor(
    @Inject(SPORT_REPOSITORY)
    private readonly sportRepository: ISportRepository,
  ) {}

  async execute(): Promise<SportDto[]> {
    const sports = await this.sportRepository.find();
    return sports.map(sport => SportDto.convertToDto(sport));
  }
}

