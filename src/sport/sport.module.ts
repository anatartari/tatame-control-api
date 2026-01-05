import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from './domain/entities/sport.entity';
import { SportController } from './adapters/web/sport.controller';
import { SportRepositoryAdapter } from './adapters/persistence/sport.repository.adapter';
import { SPORT_REPOSITORY } from './ports/repositories/sport.repository.port';
import { CreateSportUseCase } from './application/use-cases/create-sport.use-case';
import { FindSportUseCase } from './application/use-cases/find-sport.use-case';
import { ListSportsUseCase } from './application/use-cases/list-sports.use-case';
import { UpdateSportUseCase } from './application/use-cases/update-sport.use-case';
import { DeleteSportUseCase } from './application/use-cases/delete-sport.use-case';
import { ListSportsWithStudentsCountUseCase } from './application/use-cases/list-sports-with-students-count.use-case';
import { ListBasicSportsUseCase } from './application/use-cases/list-basic-sports.use-case';
import { CalculatePriceUseCase } from './application/use-cases/calculate-price.use-case';
import { CALCULATE_PRICE_USE_CASE } from './ports/use-cases/calculate-price.use-case.port';

@Module({
  imports: [TypeOrmModule.forFeature([Sport])],
  controllers: [SportController],
  providers: [
    // Use cases
    CreateSportUseCase,
    FindSportUseCase,
    ListSportsUseCase,
    UpdateSportUseCase,
    DeleteSportUseCase,
    ListSportsWithStudentsCountUseCase,
    ListBasicSportsUseCase,
    {provide: CALCULATE_PRICE_USE_CASE, useClass: CalculatePriceUseCase},
    // Repository adapter
    {
      provide: SPORT_REPOSITORY,
      useClass: SportRepositoryAdapter,
    },
  ],
  exports: [
    SPORT_REPOSITORY, 
    CALCULATE_PRICE_USE_CASE,
  ],
})
export class SportModule {}
