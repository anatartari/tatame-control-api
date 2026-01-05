import { Injectable, Inject } from '@nestjs/common';
import { ICalculatePriceUseCase, CALCULATE_PRICE_USE_CASE } from '../../ports/use-cases/calculate-price.use-case.port';
import { ISportRepository, SPORT_REPOSITORY } from '../../ports/repositories/sport.repository.port';

@Injectable()
export class CalculatePriceUseCase implements ICalculatePriceUseCase {
  constructor(
    @Inject(SPORT_REPOSITORY)
    private readonly sportRepository: ISportRepository,
  ) {}

  async execute(sportIds: string[]): Promise<number> {
    const sports = await this.sportRepository.findByIds(sportIds);
    return sports.reduce((total, sport) => total + Number(sport.price), 0);
  }
}

