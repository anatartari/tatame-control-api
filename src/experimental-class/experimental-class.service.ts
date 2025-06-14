import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ExperimentalClass } from './entities/experimental-class.entity';
import { CreateExperimentalClassDto } from './dto/create-experimental-class.dto';
import { Student } from '../student/entities/student.entity';
import { Sport } from '../sport/entities/sport.entity';

@Injectable()
export class ExperimentalClassService {
    constructor(
        @InjectRepository(ExperimentalClass)
        private experimentalClassRepository: Repository<ExperimentalClass>,
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
        @InjectRepository(Sport)
        private sportRepository: Repository<Sport>,
    ) {}

    async save(createDto: CreateExperimentalClassDto): Promise<ExperimentalClass[]> {
        
        // Verificar se todos os sports existem
        const sports = await this.sportRepository.find({
            where: { id: In(createDto.sport_ids) }
        });
    
        if (sports.length !== createDto.sport_ids.length) {
            throw new BadRequestException('One or more sports not found');
        }

        // Verificar se já existe um estudante com o mesmo email ou telefone
        const existingStudent = await this.studentRepository.findOne({
            where: [
                { email: createDto.email },
                { phone: createDto.phone }
            ]
        });

        await this.checkExistingStudentRelationships(existingStudent, createDto.sport_ids);

        let student = existingStudent;
        if (!student) {
            student = await this.saveNewStudent(createDto);
        }

        // Criar aulas experimentais para cada sport
        const experimentalClasses: ExperimentalClass[] = [];
        
        for (const sport of sports) {
            const experimentalClass = this.experimentalClassRepository.create({
                student,
                sport,
            });
            
            const savedExperimentalClass = await this.experimentalClassRepository.save(experimentalClass);
            experimentalClasses.push(savedExperimentalClass);
        }

        return experimentalClasses;
    }

    private async saveNewStudent(createDto: CreateExperimentalClassDto): Promise<Student> {
        const student = this.studentRepository.create({
            name: createDto.name,
            email: createDto.email,
            phone: createDto.phone,
            gender: createDto.gender,
            birthday: createDto.birthday,
            practiced_martial_arts: createDto.practiced_martial_arts,
            graduated_in_style: createDto.graduated_in_style,
        });

        await this.studentRepository.save(student);
        return student;
    }

    private async checkExistingStudentRelationships(existingStudent: Student | null, sport_ids: string[]) {
        if (existingStudent) {
            const existingExperimentalClasses = await this.experimentalClassRepository.find({
                where: {
                    student: { id: existingStudent.id },
                    sport: { id: In(sport_ids) }
                },
                relations: ['sport']
            });

            if (existingExperimentalClasses.length > 0) {
                const registeredSports = existingExperimentalClasses.map(ec => ec.sport.id);
                throw new BadRequestException(`Student is already registered in sport(s): ${registeredSports.join(', ')}`);
            }
        }
    }
}
