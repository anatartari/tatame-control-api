import { User } from '../../domain/entities/user.entity';

export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY');

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

