import { UpdateSportDto } from '../../dto/update-sport.dto';
import { SportDto } from '../../dto/sport.dto';

export const UPDATE_SPORT_USE_CASE = Symbol('UPDATE_SPORT_USE_CASE');

export interface IUpdateSportUseCase {
  execute(id: string, updateSportDto: UpdateSportDto): Promise<SportDto>;
}

