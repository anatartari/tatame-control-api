import { SportDto } from '../../dto/sport.dto';

export const FIND_SPORT_USE_CASE = Symbol('FIND_SPORT_USE_CASE');

export interface IFindSportUseCase {
  execute(id: string): Promise<SportDto | null>;
}

