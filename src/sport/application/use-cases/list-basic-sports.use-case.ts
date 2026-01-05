import { Injectable, Inject } from '@nestjs/common';
import { BasicListSportDto } from '../../dto/basic-list-sport.dto';
import { IListBasicSportsUseCase, LIST_BASIC_SPORTS_USE_CASE } from '../../ports/use-cases/list-basic-sports.use-case.port';
import { ISportRepository, SPORT_REPOSITORY } from '../../ports/repositories/sport.repository.port';

@Injectable()
export class ListBasicSportsUseCase implements IListBasicSportsUseCase {
  constructor(
    @Inject(SPORT_REPOSITORY)
    private readonly sportRepository: ISportRepository,
  ) {}

  async execute(): Promise<BasicListSportDto[]> {
    return this.sportRepository.findBasicList();
  }
}

