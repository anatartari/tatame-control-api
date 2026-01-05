import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../domain/entities/student.entity';
import { IStudentRepository } from '../../ports/repositories/student.repository.port';
import { StudentsWithRegistrationStatusDto } from '../../dto/students-register-status.dto';

@Injectable()
export class StudentRepositoryAdapter implements IStudentRepository {
    constructor(
        @InjectRepository(Student)
        private readonly repository: Repository<Student>,
    ) {}

    async findWithRegistrationStatus(): Promise<StudentsWithRegistrationStatusDto[]> {
        const query = this.repository.createQueryBuilder('student')
            .leftJoin('registration', 'registration', 'registration.studentId = student.id')
            .leftJoin('sport', 'sport', 'sport.id = registration.sportId')
            .leftJoin('registrationPayment', 'rp', 'rp.registrationId = registration.id')
            .leftJoin('payment', 'payment', 'payment.id = rp.paymentId')
            .select([
                'student.id as id',
                'student.name as name',
                'student.phone as phone',
                'STRING_AGG(DISTINCT sport.name, \',\') as sports',
                'COALESCE(MIN(registration.status), \'no_registration\') as registrationStatus',
                'MIN(registration.createdAt) as registrationDate',
                'MAX(payment.date) as lastPaymentDate',
                'COALESCE(SUM(DISTINCT sport.price), 0) as sumRegistrationPrice'
            ])
            .groupBy('student.id')
            .addGroupBy('student.name')
            .addGroupBy('student.phone')
            .orderBy('student.name', 'ASC');

        const results = await query.getRawMany();
        
        return results.map(result => ({
            id: result.id,
            name: result.name,
            phone: result.phone,
            sports: result.sports ? result.sports.split(',') : [],
            registrationStatus: result.registrationStatus || 'no_registration',
            registrationDate: result.registrationDate,
            lastPaymentDate: result.lastPaymentDate,
            sumRegistrationPrice: parseFloat(result.sumRegistrationPrice) || 0
        }));
    }
}

