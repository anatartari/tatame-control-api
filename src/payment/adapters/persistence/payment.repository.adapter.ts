import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Payment } from '../../domain/entities/payment.entity';
import { IPaymentRepository } from '../../ports/repositories/payment.repository.port';

@Injectable()
export class PaymentRepositoryAdapter implements IPaymentRepository {
    constructor(
        @InjectRepository(Payment)
        private readonly repository: Repository<Payment>,
    ) {}

    async find(): Promise<Payment[]> {
        return this.repository.find();
    }

    async findOne(options: FindOneOptions<Payment>): Promise<Payment | null> {
        return this.repository.findOne(options);
    }

    create(entity: Partial<Payment>): Payment {
        const result = this.repository.create(entity);
        // TypeORM's create can return array or single, ensure single
        return (Array.isArray(result) ? result[0] : result) as Payment;
    }

    async save(entity: Payment): Promise<Payment> {
        const result = await this.repository.save(entity);
        // TypeORM's save can return array or single, ensure single
        return (Array.isArray(result) ? result[0] : result) as Payment;
    }
}

