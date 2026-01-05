import { Body, Controller, Post } from '@nestjs/common';
import { Payment } from '../../domain/entities/payment.entity';
import { CreatePaymentDto } from '../../dto/create-payment.dto';
import { CreatePaymentUseCase } from '../../application/use-cases/create-payment.use-case';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
  ) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.createPaymentUseCase.execute(createPaymentDto);
  }
}

