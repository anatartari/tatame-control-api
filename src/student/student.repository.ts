import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Student } from "./entities/student.entity";
import { StudentsWithRegistrationStatusDto } from "./dto/students-register-status.dto";

@Injectable()
export class StudentRepository extends Repository<Student> {

    constructor(private dataSource: DataSource) {
        super(Student, dataSource.createEntityManager());
    }

    async findWithRegistrationStatus(): Promise<StudentsWithRegistrationStatusDto[]> {
        // Esta query busca todos os estudantes com suas informações de registro
        // Agora usando o campo created_at que foi adicionado à tabela registration
        const query = this.createQueryBuilder('student')
            .leftJoin('registration', 'registration', 'registration.student_id = student.id')
            .leftJoin('sport', 'sport', 'sport.id = registration.sport_id')
            .leftJoin('registration_payment', 'rp', 'rp.registration_id = registration.id')
            .leftJoin('payment', 'payment', 'payment.id = rp.payment_id')
            .select([
                'student.id as id',
                'student.name as name',
                'student.phone as phone',
                'STRING_AGG(DISTINCT sport.name, \',\') as sports',
                'COALESCE(MIN(registration.status), \'no_registration\') as registrationStatus',
                'MIN(registration.created_at) as registrationDate',
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