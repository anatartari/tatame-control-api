import { Injectable, Inject } from '@nestjs/common';
import { IDeleteSportUseCase, DELETE_SPORT_USE_CASE } from '../../ports/use-cases/delete-sport.use-case.port';
import { ISportRepository, SPORT_REPOSITORY } from '../../ports/repositories/sport.repository.port';

@Injectable()
export class DeleteSportUseCase implements IDeleteSportUseCase {
  constructor(
    @Inject(SPORT_REPOSITORY)
    private readonly sportRepository: ISportRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.sportRepository.delete(id);
  }
}

