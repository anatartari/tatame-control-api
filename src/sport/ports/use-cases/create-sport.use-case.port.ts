import { CreateSportDto } from '../../dto/create-sport.dto';
import { SportDto } from '../../dto/sport.dto';

export const CREATE_SPORT_USE_CASE = Symbol('CREATE_SPORT_USE_CASE');

export interface ICreateSportUseCase {
  execute(createSportDto: CreateSportDto): Promise<SportDto>;
}

