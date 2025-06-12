import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { Student } from '../student/entities/student.entity';
import { Sport } from '../sport/entities/sport.entity';
import { Address } from '../address/entities/address.entity';
import { MedicalInfo } from '../medical-info/entities/medical-info.entity';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Sport)
    private sportRepository: Repository<Sport>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(MedicalInfo)
    private medicalInfoRepository: Repository<MedicalInfo>,
  ) {}

  async create(createRegistrationDto: CreateRegistrationDto): Promise<Registration[]> {
    const { student: studentDto, sportIds } = createRegistrationDto;

    // Save address
    const address = this.addressRepository.create(studentDto.address);
    const savedAddress = await this.addressRepository.save(address);

    // Save medical info
    const medicalInfo = this.medicalInfoRepository.create(studentDto.medicalInfo);
    const savedMedicalInfo = await this.medicalInfoRepository.save(medicalInfo);

    // Save student
    const student = this.studentRepository.create({
      ...studentDto,
      address: savedAddress,
      medicalInfo: savedMedicalInfo,
    });
    const savedStudent = await this.studentRepository.save(student);

    // Get sports by IDs
    const sports = await this.sportRepository.find({
      where: { id: In(sportIds) }
    });

    if (sports.length !== sportIds.length) {
      throw new Error('Some sports were not found');
    }

    // Create registrations for each sport
    const registrations: Registration[] = [];
    for (const sport of sports) {
      const registration = this.registrationRepository.create({
        student: savedStudent,
        sport,
        status: 'ACTIVE',
      });
      const savedRegistration = await this.registrationRepository.save(registration);
      registrations.push(savedRegistration);
    }

    return registrations;
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
}
