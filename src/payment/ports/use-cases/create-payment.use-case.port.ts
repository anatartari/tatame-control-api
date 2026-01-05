import { CreatePaymentDto } from '../../dto/create-payment.dto';
import { Payment } from '../../domain/entities/payment.entity';

export const CREATE_PAYMENT_USE_CASE = Symbol('CREATE_PAYMENT_USE_CASE');

export interface ICreatePaymentUseCase {
  execute(createPaymentDto: CreatePaymentDto): Promise<Payment>;
}

