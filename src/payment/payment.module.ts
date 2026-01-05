import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './domain/entities/payment.entity';
import { Registration } from '../registration/domain/entities/registration.entity';
import { PaymentController } from './adapters/web/payment.controller';
import { PaymentRepositoryAdapter } from './adapters/persistence/payment.repository.adapter';
import { PAYMENT_REPOSITORY } from './ports/repositories/payment.repository.port';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { SportModule } from '../sport/sport.module';
import { RegistrationModule } from '../registration/registration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Registration]),
    SportModule,
    RegistrationModule,
  ],
  controllers: [PaymentController],
  providers: [
    CreatePaymentUseCase,
    {
      provide: PAYMENT_REPOSITORY,
      useClass: PaymentRepositoryAdapter,
    },
  ],
  exports: [PAYMENT_REPOSITORY],
})
export class PaymentModule {}
