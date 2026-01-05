import { SportDto } from '../../dto/sport.dto';

export const LIST_SPORTS_USE_CASE = Symbol('LIST_SPORTS_USE_CASE');

export interface IListSportsUseCase {
  execute(): Promise<SportDto[]>;
}

