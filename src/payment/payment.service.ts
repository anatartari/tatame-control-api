import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, DataSource } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Registration } from '../registration/entities/registration.entity';
import { SportService } from '../sport/sport.service';
import { RegistrationService } from 'src/registration/registration.service';

@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        @InjectRepository(Registration)
        private registrationRepository: Repository<Registration>,
        private sportService: SportService,
        private registrationService: RegistrationService,
        private dataSource: DataSource,
    ) {}

    async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const queryRunner = this.dataSource.createQueryRunner();
        
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        try {
            const { registration_ids, ...paymentData } = createPaymentDto;

            const registrations = await queryRunner.manager.find(Registration, {
                where: {id: In(registration_ids)},
                relations: ['sport']
            });

            if (registrations.length !== registration_ids.length) {
                throw new Error('Some registrations were not found');
            }

            const sportIds = registrations.map(registration => registration.sport.id);
            
            const expectedTotalPrice = await this.sportService.calculateTotalPrice(sportIds);
            
            const payment = queryRunner.manager.create(Payment, {
                value: expectedTotalPrice,
                ...paymentData,
                registrations
            });

            const savedPayment = await queryRunner.manager.save(payment);

            // Update registration status for each registration using the RegistrationService
            for(const registration of registrations) {
                await this.registrationService.updateRegistrationStatus(registration.id, queryRunner);
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