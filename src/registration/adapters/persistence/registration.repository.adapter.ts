import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, FindOneOptions } from 'typeorm';
import { Registration } from '../../domain/entities/registration.entity';
import { IRegistrationRepository } from '../../ports/repositories/registration.repository.port';

@Injectable()
export class RegistrationRepositoryAdapter implements IRegistrationRepository {
    constructor(
        @InjectRepository(Registration)
        private readonly repository: Repository<Registration>,
    ) {}

    async find(): Promise<Registration[]> {
        return this.repository.find({ relations: ['student', 'sport'] });
    }

    async findOne(options: FindOneOptions<Registration>): Promise<Registration | null> {
        return this.repository.findOne(options);
    }

    async findWithStudentAndSport(id: string): Promise<Registration | null> {
        return this.repository.findOne({ 
            where: { id },
            relations: ['student', 'sport']
        });
    }

    async findWithPayments(id: string): Promise<Registration | null> {
        return this.repository.findOne({ 
            where: { id },
            relations: ['payments', 'student', 'sport']
        });
    }

    async findByIds(ids: string[]): Promise<Registration[]> {
        return this.repository.find({ 
            where: { id: In(ids) }
        });
    }

    async findByIdsWithSport(ids: string[]): Promise<Registration[]> {
        return this.repository.find({ 
            where: { id: In(ids) },
            relations: ['sport']
        });
    }

    create(entity: Partial<Registration>): Registration {
        return this.repository.create(entity);
    }

    async save(entity: Registration): Promise<Registration> {
        return this.repository.save(entity);
    }

    async update(id: string, entity: Partial<Registration>): Promise<void> {
        await this.repository.update(id, entity);
    }
}

