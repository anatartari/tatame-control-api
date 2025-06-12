import { CreateStudentDto } from 'src/student/dto/create-student.dto';

export class CreateRegistrationDto {
    
    student : CreateStudentDto;

    sportIds : string[];
    
}
