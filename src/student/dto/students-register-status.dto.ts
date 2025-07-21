import { RegistrationStatusEnum } from '../../global/enums/registration-status.enum';

export class StudentsWithRegistrationStatusDto {
    id: string;
    name: string;
    sports: string[];
    phone: string;
    registrationStatus: RegistrationStatusEnum | 'no_registration';
    registrationDate: Date;
    lastPaymentDate: Date;
    sumRegistrationPrice: number;
}