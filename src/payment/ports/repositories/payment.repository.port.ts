import { FindOneOptions } from 'typeorm';
import { Payment } from '../../domain/entities/payment.entity';

export const PAYMENT_REPOSITORY = Symbol('PAYMENT_REPOSITORY');

export interface IPaymentRepository {
  find(): Promise<Payment[]>;
  findOne(options: FindOneOptions<Payment>): Promise<Payment | null>;
  create(entity: Partial<Payment>): Payment;
  save(entity: Payment): Promise<Payment>;
}

