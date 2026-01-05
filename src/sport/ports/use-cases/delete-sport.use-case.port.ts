export const DELETE_SPORT_USE_CASE = Symbol('DELETE_SPORT_USE_CASE');

export interface IDeleteSportUseCase {
  execute(id: string): Promise<void>;
}

