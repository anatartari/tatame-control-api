import { FindOneOptions } from 'typeorm';
import { Registration } from '../../domain/entities/registration.entity';

export const REGISTRATION_REPOSITORY = Symbol('REGISTRATION_REPOSITORY');

export interface IRegistrationRepository {
  find(): Promise<Registration[]>;
  findOne(options: FindOneOptions<Registration>): Promise<Registration | null>;
  findWithStudentAndSport(id: string): Promise<Registration | null>;
  findWithPayments(id: string): Promise<Registration | null>;
  findByIds(ids: string[]): Promise<Registration[]>;
  findByIdsWithSport(ids: string[]): Promise<Registration[]>;
  create(entity: Partial<Registration>): Registration;
  save(entity: Registration): Promise<Registration>;
  update(id: string, entity: Partial<Registration>): Promise<void>;
}

