import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { Registration } from '../../domain/entities/registration.entity';
import { IUpdateRegistrationStatusUseCase, UPDATE_REGISTRATION_STATUS_USE_CASE } from '../../ports/use-cases/update-registration-status.use-case.port';
import { IRegistrationRepository, REGISTRATION_REPOSITORY } from '../../ports/repositories/registration.repository.port';
import { RegistrationStatusEnum } from '../../../global/enums/registrationStatus.enum';

@Injectable()
export class UpdateRegistrationStatusUseCase implements IUpdateRegistrationStatusUseCase {
  constructor(
    @Inject(REGISTRATION_REPOSITORY)
    private readonly registrationRepository: IRegistrationRepository,
  ) {}

  async execute(registrationId: string): Promise<Registration> {
    const registration = await this.registrationRepository.findWithPayments(registrationId);

    if (!registration) {
      throw new BadRequestException('Registration not found');
    }

    // Calcular todos os meses desde a criação da registration até agora
    const creationDate = new Date(registration.createdAt);
    const currentDate = new Date();
    
    const requiredMonths = this.getRequiredMonths(creationDate, currentDate);
    
    // Verificar se existe pagamento para cada mês requerido
    const paidMonths = registration.payments.map(payment => payment.referenceMonth);
    const hasAllPayments = requiredMonths.every(month => paidMonths.includes(month));
    
    // Atualizar status baseado na verificação
    const newStatus = hasAllPayments 
      ? RegistrationStatusEnum.ACTIVE 
      : RegistrationStatusEnum.PENDING;
    
    registration.status = newStatus;
    
    return this.registrationRepository.save(registration);
  }

  private getRequiredMonths(creationDate: Date, currentDate: Date): number[] {
    const months: number[] = [];
    const startDate = new Date(creationDate.getFullYear(), creationDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    let current = new Date(startDate);
    
    while (current <= endDate) {
      // Formato YYYYMM para referenceMonth
      const monthReference = current.getFullYear() * 100 + (current.getMonth() + 1);
      months.push(monthReference);
      
      // Avançar para o próximo mês
      current.setMonth(current.getMonth() + 1);
    }
    
    return months;
  }
}

