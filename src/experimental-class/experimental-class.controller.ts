import { Controller, Post, Body } from '@nestjs/common';
import { ExperimentalClassService } from './experimental-class.service';
import { CreateExperimentalClassDto } from './dto/create-experimental-class.dto';
import { ExperimentalClass } from './entities/experimental-class.entity';

@Controller('experimental-class')
export class ExperimentalClassController {
    constructor(private readonly experimentalClassService: ExperimentalClassService) {}

    @Post()
    async create(@Body() createDto: CreateExperimentalClassDto): Promise<ExperimentalClass[]> {
        return this.experimentalClassService.save(createDto);
    }
}
