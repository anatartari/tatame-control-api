import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreatePaymentDto } from '../../dto/create-payment.dto';
import { Payment } from '../../domain/entities/payment.entity';
import { ICreatePaymentUseCase, CREATE_PAYMENT_USE_CASE } from '../../ports/use-cases/create-payment.use-case.port';
import { IRegistrationRepository, REGISTRATION_REPOSITORY } from '../../../registration/ports/repositories/registration.repository.port';
import { IPaymentRepository, PAYMENT_REPOSITORY } from '../../ports/repositories/payment.repository.port';
import { ICalculatePriceUseCase, CALCULATE_PRICE_USE_CASE } from '../../../sport/ports/use-cases/calculate-price.use-case.port';
import { IUpdateRegistrationStatusUseCase, UPDATE_REGISTRATION_STATUS_USE_CASE } from '../../../registration/ports/use-cases/update-registration-status.use-case.port';

@Injectable()
export class CreatePaymentUseCase implements ICreatePaymentUseCase {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(REGISTRATION_REPOSITORY)
    private readonly registrationRepository: IRegistrationRepository,
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
    @Inject(CALCULATE_PRICE_USE_CASE)
    private readonly calculatePriceUseCase: ICalculatePriceUseCase,
    @Inject(UPDATE_REGISTRATION_STATUS_USE_CASE)
    private readonly updateRegistrationStatusUseCase: IUpdateRegistrationStatusUseCase,
  ) {}

  async execute(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const { registrationIds, ...paymentData } = createPaymentDto;

      // Use repository method - adapter handles relations internally
      const registrations = await this.registrationRepository.findByIdsWithSport(registrationIds);

      if (registrations.length !== registrationIds.length) {
        throw new Error('Some registrations were not found');
      }

      const sportIds = registrations.map(registration => registration.sport.id);
      
      const expectedTotalPrice = await this.calculatePriceUseCase.execute(sportIds);
      
      const payment = this.paymentRepository.create({
        value: expectedTotalPrice,
        ...paymentData,
        registrations
      });

      // Use queryRunner manager for transaction, but create through repository
      const savedPayment = await queryRunner.manager.save(payment);

      // Update registration status for each registration
      for(const registration of registrations) {
        await this.updateRegistrationStatusUseCase.execute(registration.id);
      }

      await queryRunner.commitTransaction();
      return savedPayment;
      
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

