import { BasicListSportDto } from '../../dto/basic-list-sport.dto';

export const LIST_BASIC_SPORTS_USE_CASE = Symbol('LIST_BASIC_SPORTS_USE_CASE');

export interface IListBasicSportsUseCase {
  execute(): Promise<BasicListSportDto[]>;
}

