import { SportWithStudentsCountDto } from '../../dto/sport-with-students-count.dto';

export const LIST_SPORTS_WITH_STUDENTS_COUNT_USE_CASE = Symbol('LIST_SPORTS_WITH_STUDENTS_COUNT_USE_CASE');

export interface IListSportsWithStudentsCountUseCase {
  execute(): Promise<SportWithStudentsCountDto[]>;
}

