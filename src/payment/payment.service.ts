import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Registration } from 'src/registration/entities/registration.entity';
import { SportService } from 'src/sport/sport.service';

@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        @InjectRepository(Registration)
        private registrationRepository: Repository<Registration>,
        private sportService: SportService,
    ) {}

    async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const { registration_ids, ...paymentData } = createPaymentDto;

        const registrations = await this.registrationRepository.find({
            where: {id: In(registration_ids)},
            relations: ['sport']
        });

        if (registrations.length !== registration_ids.length) {
            throw new Error('Some registrations were not found');
        }

        // Extract sport IDs from registrations
        const sportIds = registrations.map(registration => registration.sport.id);
        
        // Calculate expected total price
        const expectedTotalPrice = await this.sportService.calculateTotalPrice(sportIds);
        
        // Verify payment amount matches expected total
        if (Number(paymentData.value) !== expectedTotalPrice) {
            throw new Error(
                `Payment amount (${paymentData.value}) does not match expected total (${expectedTotalPrice})`
            );
        }

        const payment = this.paymentRepository.create({
            ...paymentData,
            registrations
        });

        return this.paymentRepository.save(payment);
    }
} 