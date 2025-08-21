import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource, QueryRunner } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { Student } from '../student/entities/student.entity';
import { Sport } from '../sport/entities/sport.entity';
import { Address } from '../address/entities/address.entity';
import { MedicalInfo } from '../medical-info/entities/medical-info.entity';
import { CreateRegistrationDto } from './dto/create-registration.dto';

import { RegistrationStatusEnum } from '../global/enums/registration-status.enum';
import { CreateExperimentalClassDto } from './dto/create-experimental-class.dto';

@Injectable()
export class RegistrationService {
  
  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private dataSource: DataSource,
  ) {}

  async createRegistration(createRegistrationDto: CreateRegistrationDto): Promise<Registration[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const { student: studentDto, sportIds } = createRegistrationDto;

      // Get sports by IDs first to validate
      const sports = await queryRunner.manager.find(Sport, {
        where: { id: In(sportIds) }
      });

      if (sports.length !== sportIds.length) {
        throw new BadRequestException('Some sports were not found');
      }

      // Save address
      const address = queryRunner.manager.create(Address, studentDto.address);
      const savedAddress = await queryRunner.manager.save(address);

      // Save medical info
      const medicalInfo = queryRunner.manager.create(MedicalInfo, studentDto.medicalInfo);
      const savedMedicalInfo = await queryRunner.manager.save(medicalInfo);

      // Save student
      const student = queryRunner.manager.create(Student, {
        ...studentDto,
        address: savedAddress,
        medicalInfo: savedMedicalInfo,
      });
      const savedStudent = await queryRunner.manager.save(student);

      const registrations: Registration[] = [];
      
      for (const sport of sports) {
        const registration = queryRunner.manager.create(Registration, {
          student: savedStudent,
          sport,
          status: RegistrationStatusEnum.ACTIVE,
        });
        const savedRegistration = await queryRunner.manager.save(registration);
        registrations.push(savedRegistration);
      }

      await queryRunner.commitTransaction();
      return registrations;
      
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Registration[]> {
    return this.registrationRepository.find({
      relations: ['student', 'sport'],
    });
  }

  async findOne(id: string): Promise<Registration> {
    const registration = await this.registrationRepository.findOne({
      where: { id },
      relations: ['student', 'sport'],
    });

    if (!registration) {
      throw new Error('Registration not found');
    }

    return registration;
  }

  async createExperimentalClass(createDto: CreateExperimentalClassDto): Promise<Registration[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const sports = await queryRunner.manager.find(Sport, {
          where: { id: In(createDto.sport_ids) }
      });

      if (sports.length !== createDto.sport_ids.length) {
        throw new BadRequestException('One or more sports not found');
      }

      const existingStudent = await queryRunner.manager.findOne(Student, {
          where: [
              { email: createDto.email },
              { phone: createDto.phone }
          ]
      });

      let student = existingStudent;
      if (!student) {
          student = await this.saveNewStudentByExperimentalClass(createDto, queryRunner);
      }

      // Criar aulas experimentais para cada sport
      const experimentalClasses: Registration[] = [];
      
      for (const sport of sports) {
          const experimentalClass = queryRunner.manager.create(Registration, {
              student,
              sport,
              status: RegistrationStatusEnum.EXPERIMENTAL,
          });
          
          const savedExperimentalClass = await queryRunner.manager.save(experimentalClass);
          experimentalClasses.push(savedExperimentalClass);
      }

      await queryRunner.commitTransaction();
      return experimentalClasses;
      
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async saveNewStudentByExperimentalClass(createDto: CreateExperimentalClassDto, queryRunner?: QueryRunner): Promise<Student> {
    const manager = queryRunner ? queryRunner.manager : this.studentRepository.manager;
    
    const student = manager.create(Student, {
        name: createDto.name,
        email: createDto.email,
        phone: createDto.phone,
        gender: createDto.gender,
        birthday: createDto.birthday,
        practiced_martial_arts: createDto.practiced_martial_arts,
        graduated_in_style: createDto.graduated_in_style,
    });

    await manager.save(student);
    return student;
  }

  async updateRegistrationStatus(registrationId: string, queryRunner?: QueryRunner): Promise<Registration> {
    const manager = queryRunner ? queryRunner.manager : this.registrationRepository.manager;
    
    const registration = await manager.findOne(Registration, {
      where: { id: registrationId },
      relations: ['payments', 'student', 'sport'],
    });

    if (!registration) {
      throw new BadRequestException('Registration not found');
    }

    // Calcular todos os meses desde a criação da registration até agora
    const creationDate = new Date(registration.createdAt);
    const currentDate = new Date();
    
    const requiredMonths = this.getRequiredMonths(creationDate, currentDate);
    
    // Verificar se existe pagamento para cada mês requerido
    const paidMonths = registration.payments.map(payment => payment.reference_month);
    const hasAllPayments = requiredMonths.every(month => paidMonths.includes(month));
    
    // Atualizar status baseado na verificação
    const newStatus = hasAllPayments 
      ? RegistrationStatusEnum.ACTIVE 
      : RegistrationStatusEnum.PENDING;
    
    registration.status = newStatus;
    
    return manager.save(registration);
  }

  private getRequiredMonths(creationDate: Date, currentDate: Date): number[] {
    const months: number[] = [];
    const startDate = new Date(creationDate.getFullYear(), creationDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    let current = new Date(startDate);
    
    while (current <= endDate) {
      // Formato YYYYMM para reference_month
      const monthReference = current.getFullYear() * 100 + (current.getMonth() + 1);
      months.push(monthReference);
      
      // Avançar para o próximo mês
      current.setMonth(current.getMonth() + 1);
    }
    
    return months;
  }
}
