import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { Registration } from 'src/registration/entities/registration.entity';
import { SportModule } from 'src/sport/sport.module';
import { PaymentController } from './payment.controller';
import { RegistrationModule } from 'src/registration/registration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Registration]),
    SportModule,
    RegistrationModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {} 