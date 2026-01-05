import { Injectable, Inject } from '@nestjs/common';
import { SportWithStudentsCountDto } from '../../dto/sport-with-students-count.dto';
import { IListSportsWithStudentsCountUseCase } from '../../ports/use-cases/list-sports-with-students-count.use-case.port';
import { ISportRepository, SPORT_REPOSITORY } from '../../ports/repositories/sport.repository.port';

@Injectable()
export class ListSportsWithStudentsCountUseCase implements IListSportsWithStudentsCountUseCase {
  constructor(
    @Inject(SPORT_REPOSITORY)
    private readonly sportRepository: ISportRepository,
  ) {}

  async execute(): Promise<SportWithStudentsCountDto[]> {
    return this.sportRepository.findWithStudentCount();
  }
}

