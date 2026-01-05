import { FindOneOptions } from 'typeorm';
import { Sport } from '../../domain/entities/sport.entity';
import { SportWithStudentsCountDto } from '../../dto/sport-with-students-count.dto';
import { BasicListSportDto } from '../../dto/basic-list-sport.dto';

export const SPORT_REPOSITORY = Symbol('SPORT_REPOSITORY');

export interface ISportRepository {
  find(): Promise<Sport[]>;
  findOne(options: FindOneOptions<Sport>): Promise<Sport | null>;
  create(entity: Partial<Sport>): Sport;
  save(entity: Sport): Promise<Sport>;
  update(id: string, entity: Partial<Sport>): Promise<void>;
  delete(id: string): Promise<void>;
  findWithStudentCount(): Promise<SportWithStudentsCountDto[]>;
  findBasicList(): Promise<BasicListSportDto[]>;
  findByIds(ids: string[]): Promise<Sport[]>;
}

