import { IsArray, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStudentDto } from '../../student/dto/create-student.dto';

export class CreateRegistrationDto {
    
    @ValidateNested()
    @Type(() => CreateStudentDto)
    student: CreateStudentDto;

    @IsArray()
    @IsUUID('4', { each: true })
    sportIds: string[];
    
}
